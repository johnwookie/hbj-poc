import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@13.6.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

const cryptoProvider = Stripe.createSubtleCryptoProvider()

console.log("Stripe Webhook function initialized.")

serve(async (req) => {
  const signature = req.headers.get('Stripe-Signature')

  try {
    if (!signature) {
      return new Response('No signature provided', { status: 400 })
    }
    
    // Read the raw body text for crypto verification
    const bodyText = await req.text()
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') as string
    
    let event;
    try {
      event = await stripe.webhooks.constructEventAsync(
        bodyText,
        signature,
        webhookSecret,
        undefined,
        cryptoProvider
      )
    } catch (err) {
      console.error(`Webhook signature verification failed. ${err.message}`)
      return new Response(`Webhook Error: ${err.message}`, { status: 400 })
    }

    console.log(`Received verified Stripe event: ${event.type}`)

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any

      // 1. Extract Checkout details
      const customerEmail = session.customer_details?.email
      const customerName = session.customer_details?.name
      const paymentLinkId = session.payment_link
      
      if (!customerEmail || !paymentLinkId) {
        console.error("Missing email or payment link ID in session.")
        return new Response("Missing required session data", { status: 200 })
      }

      console.log(`Processing enrollment for ${customerEmail} via Payment Link ${paymentLinkId}`)

      // Initialize Supabase Admin Client
      const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://ktakcsiwaxvrcfitsgmi.supabase.co';
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

      if (!supabaseKey) {
        console.error("FATAL: SUPABASE_SERVICE_ROLE_KEY is missing from environment variables.");
        return new Response("Server configuration error", { status: 500 })
      }

      const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

      // 2. Resolve Payment Link ID to the actual URL stored in your database
      let paymentLinkUrl = "";
      try {
        const fetchedPaymentLink = await stripe.paymentLinks.retrieve(paymentLinkId);
        paymentLinkUrl = fetchedPaymentLink.url;
      } catch (e) {
        console.error("Failed to retrieve Payment Link from Stripe API:", e)
        return new Response("Could not fetch link", { status: 200 })
      }

      // 3. Find the course in the database matching that Payment Link URL
      // (Using direct .eq matches instead of .or strings to completely avoid Postgres URL parsing errors!)
      const { data: coursesLink, error: err1 } = await supabaseAdmin
        .from('courses')
        .select('id, course_title')
        .eq('course_payment_link', paymentLinkUrl)
        .limit(1)

      const { data: applicationLink, error: err2 } = await supabaseAdmin
        .from('courses')
        .select('id, course_title')
        .eq('application_payment_link', paymentLinkUrl)
        .limit(1)

      let matchError = err1 || err2;
      let matchedCourses = [...(coursesLink || []), ...(applicationLink || [])];

      if (matchError || matchedCourses.length === 0) {
        // Fallback: Check if they pasted a trailing slash by mistake
        const strippedUrl = paymentLinkUrl.replace(/\/$/, '');
        
        const { data: fallbackCoursesLink } = await supabaseAdmin
          .from('courses')
          .select('id, course_title')
          .filter('course_payment_link', 'ilike', `%${strippedUrl}%`)
          .limit(1)

        const { data: fallbackAppLink } = await supabaseAdmin
          .from('courses')
          .select('id, course_title')
          .filter('application_payment_link', 'ilike', `%${strippedUrl}%`)
          .limit(1)

        matchedCourses = [...(fallbackCoursesLink || []), ...(fallbackAppLink || [])];

        if (matchedCourses.length === 0) {
          console.error(`Course not found for mapped payment link: ${paymentLinkUrl}. Check trailing spaces or slashes in your Supabase database!`);
          return new Response("Course not found in DB", { status: 200 });
        }
      }
      const course = matchedCourses[0];
      console.log(`Matched course: ${course.course_title} (${course.id})`)

      // 4. Provision User Account
      let userId = "";
      
      // Auto-generate a secure random password since they are buying without an account
      const generatedPassword = crypto.randomUUID() + "xA@1";
      
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: customerEmail,
        password: generatedPassword,
        email_confirm: true,
        user_metadata: { full_name: customerName }
      });

      if (authError) {
        if (authError.message.includes("already exist")) {
          console.log(`User ${customerEmail} already exists. Finding their user ID...`)
          // In an Edge Function, finding an existing user's ID by email via Admin API requires listUsers
          // We fetch all users (assuming reasonable size) or rely on profiles table
          const { data: listData } = await supabaseAdmin.auth.admin.listUsers();
          const existingUser = listData?.users.find(u => u.email === customerEmail);
          
          if (!existingUser) {
             console.error("Could not resolve existing user ID from auth.users");
             return new Response("User resolution failed", { status: 200 });
          }
          userId = existingUser.id;
        } else {
          console.error("Failed to provision new user account:", authError);
          return new Response("User creation failed", { status: 200 });
        }
      } else if (authData?.user) {
        userId = authData.user.id;
        console.log(`Created new student account for ${customerEmail} (ID: ${userId})`)
        
        // Wait a small moment for Supabase triggers (if any) to catch up, 
        // then UPSERT directly into the 'students' table to guarantee they exist!
        await new Promise(r => setTimeout(r, 1000));
        
        const { error: studentUpsertError } = await supabaseAdmin
          .from('students')
          .upsert({
             id: userId,
             email: customerEmail,
             first_name: customerName?.split(' ')[0] || '',
             last_name: customerName?.split(' ').slice(1).join(' ') || ''
          })

        if (studentUpsertError) {
          console.error("FATAL: Failed to insert user into public.students table:", studentUpsertError);
          return new Response("Failed to build student profile", { status: 200 });
        }
      }

      // 5. Create the Enrollment Record
      const { error: enrollmentError } = await supabaseAdmin
        .from('enrollments')
        .insert({
          student_id: userId,
          course_id: course.id,
          status: 'active'
        })

      if (enrollmentError) {
        console.error("Failed to insert enrollment record:", enrollmentError);
        return new Response("Enrollment insertion failed", { status: 200 });
      }
      
      console.log(`SUCCESS: Enrolled ${customerEmail} into ${course.course_title}`)
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } })
    }

    // Acknowledge other event types from Stripe gracefully
    return new Response(JSON.stringify({ received: true }), { status: 200, headers: { "Content-Type": "application/json" } })
  } catch (err) {
    console.error("Fatal Webhook Error:", err)
    return new Response(err.message, { status: 400 })
  }
})
