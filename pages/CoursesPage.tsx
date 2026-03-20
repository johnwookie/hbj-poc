import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setCourses(data || []);
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="pt-32 pb-24 bg-brand-sand min-h-screen">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-brand-charcoal mb-6">Our <span className="italic font-light">Courses</span></h1>
          <p className="text-brand-charcoal/70 max-w-2xl mx-auto uppercase tracking-widest text-xs">
            Elevate your skills with our industry-leading beauty and aesthetics programs.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-charcoal"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-24 text-brand-charcoal/60">
            <p>No published courses available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Link 
                to={`/courses/${course.slug}`} 
                key={course.id}
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
                    <div className="w-full h-full flex items-center justify-center text-brand-charcoal/20">
                      No Image Available
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-[10px] tracking-widest uppercase px-3 py-1 font-medium">
                      {course.delivery_mode || 'In-Person'}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-brand-pink text-[10px] tracking-widest uppercase font-bold">
                      {course.course_kind || 'Course'}
                    </span>
                    {course.track && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-brand-charcoal/20" />
                        <span className="text-brand-charcoal/50 text-[10px] tracking-widest uppercase">
                          {course.track}
                        </span>
                      </>
                    )}
                  </div>
                  
                  <h3 className="font-serif text-2xl text-brand-charcoal mb-4 group-hover:text-brand-pink transition-colors">
                    {course.course_title}
                  </h3>
                  
                  <p className="text-sm text-brand-charcoal/70 line-clamp-3 mb-8 flex-grow">
                    {course.short_summary || course.full_description?.substring(0, 120) + '...'}
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-brand-charcoal/10">
                    <div className="flex gap-6">
                      {course.duration_value && (
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-widest text-brand-charcoal/50">Duration</span>
                          <span className="text-sm font-medium text-brand-charcoal">
                            {course.duration_value} {course.duration_unit}
                          </span>
                        </div>
                      )}
                      
                      {course.price_total && (
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-widest text-brand-charcoal/50">Tuition</span>
                          <span className="text-sm font-medium text-brand-charcoal">
                            {new Intl.NumberFormat('en-AU', { style: 'currency', currency: course.currency || 'AUD', maximumFractionDigits: 0 }).format(course.price_total)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs tracking-widest uppercase font-medium border-b border-brand-charcoal pb-1 shrink-0 group-hover:border-brand-pink group-hover:text-brand-pink transition-colors">
                      View Details
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
