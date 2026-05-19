import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogOut, BookOpen } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const checkSessionAndFetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }
      
      setSession(session);

      try {
        // Fetch student profile
        const { data: profileData, error: profileError } = await supabase
          .from('students')
          .select('*')
          .eq('auth_user_id', session.user.id)
          .single();

        if (!profileError && profileData) {
          setProfile(profileData);
        }

        // Fetch enrollments with linked course details
        const { data: enrollmentsData, error: enrollmentsError } = await supabase
          .from('enrollments')
          .select(`
            id,
            status,
            created_at,
            course:courses (
              id,
              course_title,
              slug,
              hero_media_url,
              course_kind,
              delivery_mode
            )
          `)
          .order('created_at', { ascending: false });

        if (!enrollmentsError && enrollmentsData) {
          setEnrollments(enrollmentsData);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    checkSessionAndFetchData();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-sand pt-32 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-charcoal"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-sand pt-32 pb-24">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-brand-charcoal mb-2">
              Welcome back, <span className="italic font-light">{profile?.first_name || 'Student'}</span>
            </h1>
            <p className="text-[10px] tracking-[0.4em] uppercase text-brand-charcoal/60">
              Student Dashboard
            </p>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase font-bold text-brand-charcoal/60 hover:text-brand-pink transition-colors"
          >
            <LogOut size={14} />
            Log Out
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-serif text-brand-charcoal mb-6 border-b border-brand-charcoal/10 pb-4">
            Your Courses
          </h2>
          
          {enrollments.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-[20px] shadow-sm">
              <BookOpen size={48} className="mx-auto text-brand-charcoal/20 mb-4" />
              <h3 className="text-xl font-serif text-brand-charcoal mb-2">No courses yet</h3>
              <p className="text-sm text-brand-charcoal/60 mb-6 max-w-md mx-auto">
                You haven't enrolled in any courses yet. Browse our catalog to find the perfect program for your career.
              </p>
              <Link 
                to="/courses"
                className="inline-block px-8 py-4 bg-brand-pink text-brand-charcoal text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-brand-charcoal hover:text-white transition-all duration-300"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {enrollments.map((enrollment, index) => {
                const course = enrollment.course;
                if (!course) return null; // Defensive check
                
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    key={enrollment.id}
                    className="group bg-white flex flex-col h-full hover:shadow-xl transition-all duration-500 overflow-hidden"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-brand-charcoal/5">
                      {course.hero_media_url ? (
                        <img 
                          src={course.hero_media_url} 
                          alt={course.course_title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-brand-charcoal/20 bg-brand-charcoal/5">
                          <BookOpen size={32} />
                        </div>
                      )}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <span className="bg-brand-pink text-brand-charcoal text-[10px] tracking-widest uppercase px-3 py-1 font-bold">
                          {enrollment.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-brand-charcoal/50 text-[10px] tracking-widest uppercase">
                          {course.course_kind || 'Course'}
                        </span>
                        {course.delivery_mode && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-brand-charcoal/20" />
                            <span className="text-brand-charcoal/50 text-[10px] tracking-widest uppercase">
                              {course.delivery_mode}
                            </span>
                          </>
                        )}
                      </div>
                      
                      <h3 className="font-serif text-2xl text-brand-charcoal mb-8 group-hover:text-brand-pink transition-colors">
                        {course.course_title}
                      </h3>
                      
                      <div className="mt-auto">
                        <Link 
                          to={`/courses/${course.slug}`}
                          className="inline-block w-full text-center py-4 border border-brand-charcoal text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-brand-charcoal hover:text-white transition-all duration-300"
                        >
                          View Course Details
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
