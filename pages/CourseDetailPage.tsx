import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Clock, Calendar, CheckCircle2 } from 'lucide-react';

const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // Checkout Modal State
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const [pendingPriceType, setPendingPriceType] = useState<'course' | 'application' | null>(null);

  const handleCheckout = async (priceType: 'course' | 'application') => {
    setPendingPriceType(priceType);
    
    // Check if logged in
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user?.email) {
      // User is logged in, use their email directly
      proceedToCheckout(session.user.email, priceType);
    } else {
      // Prompt for email
      setShowEmailModal(true);
    }
  };

  const proceedToCheckout = async (email: string, priceType: 'course' | 'application') => {
    setIsRedirecting(true);
    setCheckoutError('');
    
    try {
      const response = await supabase.functions.invoke('create-checkout', {
        body: {
          email,
          course_slug: slug,
          priceType,
          returnUrl: window.location.origin
        }
      });
      
      const { data, error } = response;
      
      if (error) throw new Error(error.message);
      if (data.error) throw new Error(data.error);
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      console.error(err);
      setCheckoutError(err.message || 'An error occurred during checkout');
      setIsRedirecting(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchCourse = async () => {
      if (!slug) return;
      
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('slug', slug)
          .single();
          
        if (error) throw error;
        setCourse(data);
      } catch (err) {
        console.error('Error fetching course:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex justify-center items-center bg-brand-sand">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-charcoal"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center bg-brand-sand">
        <h2 className="text-3xl font-serif text-brand-charcoal mb-4">Course not found</h2>
        <Link to="/courses" className="text-sm uppercase tracking-widest border-b border-brand-charcoal pb-1 hover:text-brand-pink hover:border-brand-pink transition-all">
          Back to all courses
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-sand min-h-[100vh]">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 lg:px-12 bg-white selection:bg-brand-pink selection:text-white">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-24 items-center">
          <div className="flex-1 w-full">
            <Link to="/courses" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-charcoal/50 hover:text-brand-pink transition-colors mb-8">
              <ArrowLeft size={14} /> Back to Courses
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="text-brand-pink text-[10px] tracking-[0.2em] uppercase font-bold bg-brand-pink/10 px-3 py-1 rounded-sm">
                {course.course_kind || 'Course'}
              </span>
              {(course.delivery_mode || course.track) && (
                <span className="text-[10px] tracking-[0.2em] uppercase text-brand-charcoal/50">
                  {course.delivery_mode} {course.track && `• ${course.track}`}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-charcoal mb-6 leading-tight">
              {course.course_title}
            </h1>
            
            <p className="text-lg text-brand-charcoal/70 mb-10 max-w-xl">
              {course.short_summary}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-brand-charcoal/50">
                  <Clock size={12} /> Duration
                </span>
                <span className="font-medium text-brand-charcoal">{course.duration_value} {course.duration_unit}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-brand-charcoal/50">
                  <Calendar size={12} /> Next Intake
                </span>
                <span className="font-medium text-brand-charcoal">{course.start_date ? new Date(course.start_date).toLocaleDateString() : 'TBA'}</span>
              </div>
              <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-brand-charcoal/50">
                  <CheckCircle2 size={12} /> Investment
                </span>
                <span className="font-medium text-brand-charcoal">
                  {course.price_total ? new Intl.NumberFormat('en-AU', { style: 'currency', currency: course.currency || 'AUD' }).format(course.price_total) : 'Enquire'}
                </span>
              </div>
            </div>

            <button 
              onClick={() => handleCheckout('course')}
              disabled={isRedirecting}
              className="inline-block px-10 py-4 bg-brand-charcoal text-white text-xs tracking-widest uppercase hover:bg-brand-pink hover:text-brand-charcoal transition-colors font-medium w-full md:w-auto text-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isRedirecting ? 'Redirecting...' : 'Enroll Now'}
            </button>
          </div>
          
          <div className="flex-1 w-full max-w-xl">
            <div className="aspect-[4/5] bg-brand-charcoal/5 relative overflow-hidden shadow-2xl">
               {course.hero_media_url ? (
                  <img src={course.hero_media_url} alt={course.course_title} className="w-full h-full object-cover" />
               ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-charcoal/20 font-serif text-xl">
                    HBJ Academy
                  </div>
               )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-serif text-brand-charcoal mb-8 border-b border-brand-charcoal/10 pb-4">Course Overview</h2>
            <div className="prose prose-lg prose-headings:font-serif prose-headings:text-brand-charcoal prose-p:text-brand-charcoal/80 prose-a:text-brand-pink max-w-none mb-16 whitespace-pre-line">
              {course.full_description || 'Detailed description coming soon.'}
            </div>

            {course.what_you_learn && (
               <>
                <h3 className="text-2xl font-serif text-brand-charcoal mb-6">What You Will Learn</h3>
                <div className="bg-white p-8 md:p-12 shadow-sm mb-16 whitespace-pre-line text-brand-charcoal/80">
                  {course.what_you_learn}
                </div>
               </>
            )}

            {course.curriculum_outline && (
              <>
                <h3 className="text-2xl font-serif text-brand-charcoal mb-6">Curriculum Outline</h3>
                <div className="whitespace-pre-line text-brand-charcoal/80 mb-16">
                  {course.curriculum_outline}
                </div>
              </>
            )}
          </div>

          <div className="space-y-8">
             <div className="bg-white p-8 border border-brand-charcoal/5 shadow-xl">
                <h3 className="font-serif text-2xl text-brand-charcoal mb-6">Enrollment Details</h3>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-brand-charcoal/10 pb-4">
                    <span className="text-xs uppercase tracking-widest text-brand-charcoal/50">Total Price</span>
                    <span className="font-medium text-lg">
                      {course.price_total ? new Intl.NumberFormat('en-AU', { style: 'currency', currency: course.currency || 'AUD' }).format(course.price_total) : 'Enquire'}
                    </span>
                  </div>
                  
                  {course.deposit_required && (
                    <div className="flex justify-between items-center border-b border-brand-charcoal/10 pb-4">
                      <span className="text-xs uppercase tracking-widest text-brand-charcoal/50">Deposit</span>
                      <span className="font-medium">
                        {new Intl.NumberFormat('en-AU', { style: 'currency', currency: course.currency || 'AUD' }).format(course.deposit_required)}
                      </span>
                    </div>
                  )}

                  {course.sessions_per_week && (
                     <div className="flex justify-between items-center border-b border-brand-charcoal/10 pb-4">
                      <span className="text-xs uppercase tracking-widest text-brand-charcoal/50">Weekly Sessions</span>
                      <span className="font-medium">{course.sessions_per_week}</span>
                    </div>
                  )}

                   {course.seats_total && (
                     <div className="flex justify-between items-center border-b border-brand-charcoal/10 pb-4">
                      <span className="text-xs uppercase tracking-widest text-brand-charcoal/50">Total Seats</span>
                      <span className="font-medium">{course.seats_total}</span>
                    </div>
                  )}

                  <button 
                    onClick={() => handleCheckout('application')}
                    disabled={isRedirecting}
                    className="block w-full py-4 bg-brand-pink text-white text-center text-xs tracking-widest uppercase hover:bg-brand-charcoal transition-colors font-medium mt-8 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isRedirecting ? 'Redirecting...' : 'Secure Your Spot'}
                  </button>
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* Checkout Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white max-w-md w-full rounded-[20px] p-8 shadow-2xl">
            <h3 className="font-serif text-2xl text-brand-charcoal mb-2">Checkout</h3>
            <p className="text-sm text-brand-charcoal/70 mb-6">Enter your email address to continue to secure checkout.</p>
            
            {checkoutError && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl mb-6 border border-red-100 text-center font-medium">
                {checkoutError}
              </div>
            )}
            
            <form onSubmit={(e) => {
              e.preventDefault();
              proceedToCheckout(checkoutEmail, pendingPriceType!);
            }}>
              <input 
                type="email" 
                required 
                placeholder="Your email address" 
                value={checkoutEmail}
                onChange={(e) => setCheckoutEmail(e.target.value)}
                className="w-full border border-brand-charcoal/20 px-4 py-3 focus:outline-none focus:border-brand-pink transition-colors mb-6 font-light"
              />
              <div className="flex gap-4">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowEmailModal(false);
                    setCheckoutError('');
                  }}
                  className="flex-1 py-3 border border-brand-charcoal text-[10px] tracking-widest uppercase font-bold text-brand-charcoal hover:bg-brand-charcoal/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isRedirecting}
                  className="flex-1 py-3 bg-brand-pink text-white text-[10px] tracking-widest uppercase font-bold hover:bg-brand-charcoal transition-colors disabled:opacity-50"
                >
                  {isRedirecting ? 'Wait...' : 'Continue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
