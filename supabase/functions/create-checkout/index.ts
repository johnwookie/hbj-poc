import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@13.6.0?target=deno'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, course_slug, priceType, returnUrl } = await req.json()

    if (!email || !course_slug) {
      return new Response(JSON.stringify({ error: 'Missing email or course_slug' }), { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://ktakcsiwaxvrcfitsgmi.supabase.co';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseKey) {
      return new Response(JSON.stringify({ error: 'Server configuration error' }), { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

    // 1. Find the Course
    const { data: course, error: courseError } = await supabaseAdmin
      .from('courses')
      .select('id, course_title, stripe_course_price_id, stripe_application_price_id')
      .eq('slug', course_slug)
      .single()

    if (courseError || !course) {
      return new Response(JSON.stringify({ error: 'Course not found' }), { 
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const lineItems = [];
    
    if (priceType === 'application') {
      if (!course.stripe_application_price_id) {
        return new Response(JSON.stringify({ error: 'This course does not have an application fee configured.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      lineItems.push({ price: course.stripe_application_price_id, quantity: 1 });
    } else {
      if (!course.stripe_course_price_id) {
        return new Response(JSON.stringify({ error: 'This course is not configured for online payments.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      lineItems.push({ price: course.stripe_course_price_id, quantity: 1 });
      
      // Also add application fee if it exists
      if (course.stripe_application_price_id) {
        lineItems.push({ price: course.stripe_application_price_id, quantity: 1 });
      }
    }

    // 2. Check if student exists and is enrolled
    const { data: student } = await supabaseAdmin
      .from('students')
      .select('id')
      .eq('email', email)
      .single()

    if (student) {
      const { data: enrollment } = await supabaseAdmin
        .from('enrollments')
        .select('id')
        .eq('student_id', student.id)
        .eq('course_id', course.id)
        .single()

      if (enrollment) {
        return new Response(JSON.stringify({ error: 'This email is already registered for this course. Please log in to your dashboard to access it.' }), { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }
    }

    // 3. Create Stripe Checkout Session
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      return new Response(JSON.stringify({ error: 'Stripe configuration missing' }), { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email, // Pre-fill their email in checkout
      line_items: lineItems,
      mode: 'payment',
      success_url: `${returnUrl || 'http://localhost:5173'}/dashboard?success=true`,
      cancel_url: `${returnUrl || 'http://localhost:5173'}/courses/${course_slug}?canceled=true`,
      payment_intent_data: {
         // optional: add metadata to the payment intent
      }
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Error creating checkout:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
