-- 1. Courses Table (with Stripe fields added)
CREATE TABLE public.courses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    course_title text NOT NULL,
    slug text NOT NULL UNIQUE,
    course_kind text,
    track text,
    delivery_mode text,
    short_summary text,
    full_description text,
    duration_value integer,
    duration_unit text,
    schedule_notes text,
    sessions_per_week integer,
    session_hours numeric,
    total_hours numeric,
    cohort_required boolean DEFAULT false,
    cohort_name text,
    start_date date,
    end_date date,
    seats_total integer,
    price_total numeric,
    currency text DEFAULT 'AUD',
    payment_options jsonb,
    deposit_required numeric,
    application_fee numeric,
    refund_policy text,
    internship_included boolean DEFAULT false,
    internship_details text,
    what_you_learn text,
    curriculum_outline text,
    assessment_notes text,
    category_tags jsonb,
    hero_media_url text,
    gallery_media_urls jsonb,
    is_published boolean DEFAULT false,
    notes_for_admin text,
    
    -- Stripe Integration
    stripe_product_id text,
    stripe_price_id text,
    
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- 2. Students Table (The "plethora of information" & future LMS base)
CREATE TABLE public.students (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id uuid REFERENCES auth.users(id), -- Will link to Supabase Auth when LMS is ready
    
    -- Basic Details
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL UNIQUE,
    phone text,
    date_of_birth date,
    gender text,
    
    -- Address
    address_line1 text,
    address_line2 text,
    city text,
    state text,
    postal_code text,
    country text,
    
    -- Emergency Contact
    emergency_contact_name text,
    emergency_contact_phone text,
    emergency_contact_relation text,
    
    -- Additional Info
    highest_education text,
    current_occupation text,
    goals_and_expectations text,
    
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- 3. Enrollments/Applications Table (Links Student to Course + Stripe Session)
CREATE TABLE public.enrollments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id uuid REFERENCES public.students(id) NOT NULL,
    course_id uuid REFERENCES public.courses(id) NOT NULL,
    
    status text DEFAULT 'pending', -- pending, paid, active, cancelled
    
    -- Stripe Checkout Data
    stripe_checkout_session_id text UNIQUE,
    stripe_payment_intent_id text UNIQUE,
    amount_paid numeric DEFAULT 0,
    currency text DEFAULT 'AUD',
    
    enrolled_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- =========================================================================
-- INDEXES FOR PERFORMANCE
-- =========================================================================
CREATE INDEX idx_courses_slug ON public.courses(slug);
CREATE INDEX idx_courses_is_published ON public.courses(is_published);
CREATE INDEX idx_students_email ON public.students(email);
CREATE INDEX idx_enrollments_student_id ON public.enrollments(student_id);
CREATE INDEX idx_enrollments_course_id ON public.enrollments(course_id);
CREATE INDEX idx_enrollments_stripe_session ON public.enrollments(stripe_checkout_session_id);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Courses: Anyone can read published courses
CREATE POLICY "Public read published courses" ON public.courses
    FOR SELECT USING (is_published = true);

-- Students:
-- Before they have an auth account (e.g. anonymous form submission):
CREATE POLICY "Allow anonymous insert of student info" ON public.students
    FOR INSERT WITH CHECK (true);

-- When LMS is added, they can view their own profile
CREATE POLICY "Students can view true profile" ON public.students
    FOR SELECT USING (auth_user_id = auth.uid());

-- Enrollments:
CREATE POLICY "Allow anonymous insert of enrollments" ON public.enrollments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Students can view own enrollments" ON public.enrollments
    FOR SELECT USING (
        student_id IN (SELECT id FROM public.students WHERE auth_user_id = auth.uid())
    );

-- Note: Admin operations (updating courses, viewing all students/enrollments) 
-- will bypass RLS if you use the Service Role Key in your backend/Edge Functions.
