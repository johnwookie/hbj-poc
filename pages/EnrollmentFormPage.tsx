import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft, Save, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const SECTIONS = [
  "Student Details",
  "Language & Needs",
  "Education & Goals",
  "Contacts & Marketing",
  "Declarations"
];

const REASONS_FOR_STUDY = [
  "To get a job or better job",
  "To develop my existing business",
  "To start my own business",
  "I want extra skills for my job",
  "It was a requirement of my job",
  "To try for a different career",
  "For personal interest or self-development",
  "Other"
];

const EnrollmentFormPage: React.FC = () => {
  const { enrollmentId } = useParams<{ enrollmentId: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formId, setFormId] = useState<string | null>(null);
  const [status, setStatus] = useState<'draft' | 'submitted' | 'incomplete'>('draft');
  const [courseTitle, setCourseTitle] = useState('');
  
  const [formData, setFormData] = useState({
    // Section 1: Student Details
    gender: '',
    preferred_pronouns: '',
    date_of_birth: '',
    first_name: '',
    last_name: '',
    mobile: '',
    email: '',
    address: '',
    preferred_contact: 'email',
    
    // Section 3: Language
    speaks_other_language: 'No',
    other_language: '',
    
    // Section 4: Individual Needs
    has_needs: 'No',
    needs_details: '',
    
    // Section 5: Prior Education
    highest_education: '',
    
    // Section 6: Reason for Study
    reason_for_study: [] as string[],
    other_reason: '',
    
    // Section 7: Emergency Contact
    emergency_name: '',
    emergency_relation: '',
    emergency_email: '',
    emergency_mobile: '',
    
    // Section 8: Marketing & Images
    how_did_you_hear: '',
    opt_out_marketing: false,
    photo_consent: false,
    
    // Section 9: Declarations
    declaration_agreed: false,
    student_signature: '',
    student_signature_date: '',
    parent_signature: '',
    parent_signature_date: ''
  });

  useEffect(() => {
    fetchEnrollmentAndForm();
  }, [enrollmentId]);

  const fetchEnrollmentAndForm = async () => {
    if (!enrollmentId) return;
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }
      
      const studentRes = await supabase.from('students').select('*').eq('auth_user_id', session.user.id).single();
      if (studentRes.error || !studentRes.data) throw new Error("Student record not found");
      const student = studentRes.data;

      const enrollmentRes = await supabase
        .from('enrollments')
        .select(`id, course:courses(course_title)`)
        .eq('id', enrollmentId)
        .single();
        
      if (enrollmentRes.error || !enrollmentRes.data) {
        navigate('/dashboard');
        return;
      }
      
      setCourseTitle(enrollmentRes.data.course?.course_title || '');

      const formRes = await supabase
        .from('enrollment_forms')
        .select('*')
        .eq('enrollment_id', enrollmentId)
        .maybeSingle();

      if (formRes.data) {
        setFormId(formRes.data.id);
        setStatus(formRes.data.status || 'draft');
        
        // Merge DB data with defaults
        if (formRes.data.form_data) {
          setFormData(prev => ({
            ...prev,
            ...formRes.data.form_data
          }));
        }
      } else {
        // Pre-fill from student profile if new
        setFormData(prev => ({
          ...prev,
          first_name: student.first_name || '',
          last_name: student.last_name || '',
          email: student.email || '',
          mobile: student.phone || '',
          date_of_birth: student.date_of_birth || '',
          gender: student.gender || '',
          address: student.address_line1 ? `${student.address_line1} ${student.city || ''} ${student.state || ''}` : '',
          highest_education: student.highest_education || '',
          emergency_name: student.emergency_contact_name || '',
          emergency_mobile: student.emergency_contact_phone || '',
          emergency_relation: student.emergency_contact_relation || ''
        }));
      }
      
    } catch (err) {
      console.error("Error fetching form:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData(prev => {
      const arr = [...prev.reason_for_study];
      if (arr.includes(value)) {
        return { ...prev, reason_for_study: arr.filter(v => v !== value) };
      } else {
        return { ...prev, reason_for_study: [...arr, value] };
      }
    });
  };

  const saveForm = async (newStatus: 'draft' | 'submitted' = 'draft') => {
    setSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session");
      
      const studentRes = await supabase.from('students').select('id').eq('auth_user_id', session.user.id).single();
      const studentId = studentRes.data?.id;

      if (!studentId) throw new Error("Student ID missing");

      const payload = {
        enrollment_id: enrollmentId,
        student_id: studentId,
        form_data: formData,
        status: newStatus
      };

      if (formId) {
        await supabase.from('enrollment_forms').update(payload).eq('id', formId);
      } else {
        const { data } = await supabase.from('enrollment_forms').insert(payload).select('id').single();
        if (data) setFormId(data.id);
      }
      
      setStatus(newStatus);
      if (newStatus === 'submitted') {
        alert("Your enrollment application has been successfully submitted!");
        navigate('/dashboard');
      } else {
        // Auto-save silently or show brief toast
      }
    } catch (err) {
      console.error("Error saving form:", err);
      alert("There was an error saving your progress. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-sand flex items-center justify-center">
        <Loader className="animate-spin text-brand-pink mb-4" size={32} />
      </div>
    );
  }

  if (status === 'submitted') {
    return (
      <div className="min-h-screen bg-brand-sand flex items-center justify-center p-6">
        <div className="bg-white max-w-md w-full p-12 text-center rounded-[20px] shadow-sm">
          <CheckCircle size={48} className="mx-auto text-green-500 mb-6" />
          <h2 className="text-2xl font-serif text-brand-charcoal mb-4">Application Submitted</h2>
          <p className="text-brand-charcoal/60 mb-8 text-sm">
            Thank you! Your enrollment application for <strong>{courseTitle}</strong> has been received and is under review.
          </p>
          <button onClick={() => navigate('/dashboard')} className="px-8 py-3 bg-brand-charcoal text-white text-[10px] tracking-widest uppercase hover:bg-brand-pink transition-colors">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const renderSection = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h3 className="text-xl font-serif text-brand-charcoal border-b border-brand-charcoal/10 pb-2 mb-6">Student Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-2">Given Names</label>
                <input type="text" value={formData.first_name} onChange={e => handleInputChange('first_name', e.target.value)} className="w-full border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-pink outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-2">Surname</label>
                <input type="text" value={formData.last_name} onChange={e => handleInputChange('last_name', e.target.value)} className="w-full border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-pink outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-2">Email</label>
                <input type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className="w-full border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-pink outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-2">Mobile</label>
                <input type="tel" value={formData.mobile} onChange={e => handleInputChange('mobile', e.target.value)} className="w-full border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-pink outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-2">Date of Birth</label>
                <input type="date" value={formData.date_of_birth} onChange={e => handleInputChange('date_of_birth', e.target.value)} className="w-full border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-pink outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-2">Gender</label>
                <select value={formData.gender} onChange={e => handleInputChange('gender', e.target.value)} className="w-full border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-pink outline-none transition-colors bg-white">
                  <option value="">Select Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-Binary">Non-Binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-2">Full Address</label>
                <textarea value={formData.address} onChange={e => handleInputChange('address', e.target.value)} rows={2} className="w-full border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-pink outline-none transition-colors" />
              </div>
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div>
              <h3 className="text-xl font-serif text-brand-charcoal border-b border-brand-charcoal/10 pb-2 mb-6">Language</h3>
              <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-4">Do you speak a language other than English at home?</label>
              <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2 text-sm"><input type="radio" name="lang" value="Yes" checked={formData.speaks_other_language === 'Yes'} onChange={() => handleInputChange('speaks_other_language', 'Yes')} /> Yes</label>
                <label className="flex items-center gap-2 text-sm"><input type="radio" name="lang" value="No" checked={formData.speaks_other_language === 'No'} onChange={() => handleInputChange('speaks_other_language', 'No')} /> No</label>
              </div>
              {formData.speaks_other_language === 'Yes' && (
                <input type="text" placeholder="Please specify language" value={formData.other_language} onChange={e => handleInputChange('other_language', e.target.value)} className="w-full border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-pink outline-none transition-colors" />
              )}
            </div>

            <div>
              <h3 className="text-xl font-serif text-brand-charcoal border-b border-brand-charcoal/10 pb-2 mb-6">Individual Learning Needs</h3>
              <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-4">Do you have a disability or any individual learning needs?</label>
              <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2 text-sm"><input type="radio" name="needs" value="Yes" checked={formData.has_needs === 'Yes'} onChange={() => handleInputChange('has_needs', 'Yes')} /> Yes</label>
                <label className="flex items-center gap-2 text-sm"><input type="radio" name="needs" value="No" checked={formData.has_needs === 'No'} onChange={() => handleInputChange('has_needs', 'No')} /> No</label>
              </div>
              {formData.has_needs === 'Yes' && (
                <textarea placeholder="Please provide details of support required" value={formData.needs_details} onChange={e => handleInputChange('needs_details', e.target.value)} rows={3} className="w-full border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-pink outline-none transition-colors" />
              )}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div>
              <h3 className="text-xl font-serif text-brand-charcoal border-b border-brand-charcoal/10 pb-2 mb-6">Prior Education</h3>
              <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-2">Highest level of school completed</label>
              <input type="text" placeholder="e.g. Year 12, Bachelor's Degree" value={formData.highest_education} onChange={e => handleInputChange('highest_education', e.target.value)} className="w-full border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-pink outline-none transition-colors" />
            </div>

            <div>
              <h3 className="text-xl font-serif text-brand-charcoal border-b border-brand-charcoal/10 pb-2 mb-6">Reason for Study</h3>
              <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-4">Select all that apply:</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {REASONS_FOR_STUDY.map(reason => (
                  <label key={reason} className="flex items-center gap-3 text-sm p-3 border border-brand-charcoal/10 cursor-pointer hover:bg-brand-charcoal/5 transition-colors">
                    <input type="checkbox" checked={formData.reason_for_study.includes(reason)} onChange={() => handleCheckboxChange('reason_for_study', reason)} className="accent-brand-pink" />
                    {reason}
                  </label>
                ))}
              </div>
              {formData.reason_for_study.includes("Other") && (
                <input type="text" placeholder="Please specify other reason" value={formData.other_reason} onChange={e => handleInputChange('other_reason', e.target.value)} className="w-full border border-brand-charcoal/20 px-4 py-3 text-sm mt-3 focus:border-brand-pink outline-none transition-colors" />
              )}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div>
              <h3 className="text-xl font-serif text-brand-charcoal border-b border-brand-charcoal/10 pb-2 mb-6">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-2">Full Name</label>
                  <input type="text" value={formData.emergency_name} onChange={e => handleInputChange('emergency_name', e.target.value)} className="w-full border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-pink outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-2">Relationship</label>
                  <input type="text" value={formData.emergency_relation} onChange={e => handleInputChange('emergency_relation', e.target.value)} className="w-full border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-pink outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-2">Mobile</label>
                  <input type="tel" value={formData.emergency_mobile} onChange={e => handleInputChange('emergency_mobile', e.target.value)} className="w-full border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-pink outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-2">Email</label>
                  <input type="email" value={formData.emergency_email} onChange={e => handleInputChange('emergency_email', e.target.value)} className="w-full border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-pink outline-none transition-colors" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-serif text-brand-charcoal border-b border-brand-charcoal/10 pb-2 mb-6">Marketing & Images</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-2">How did you hear about us?</label>
                  <select value={formData.how_did_you_hear} onChange={e => handleInputChange('how_did_you_hear', e.target.value)} className="w-full border border-brand-charcoal/20 px-4 py-3 text-sm focus:border-brand-pink outline-none transition-colors bg-white">
                    <option value="">Select an option</option>
                    <option value="Internet Search">Internet Search</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Friend/Family">Friend/Family</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <label className="flex items-center gap-3 text-sm p-3 border border-brand-charcoal/10 cursor-pointer">
                  <input type="checkbox" checked={formData.opt_out_marketing} onChange={e => handleInputChange('opt_out_marketing', e.target.checked)} className="accent-brand-pink" />
                  I do not wish to be contacted regarding future training opportunities
                </label>
                <label className="flex items-center gap-3 text-sm p-3 border border-brand-charcoal/10 cursor-pointer">
                  <input type="checkbox" checked={formData.photo_consent} onChange={e => handleInputChange('photo_consent', e.target.checked)} className="accent-brand-pink" />
                  I consent to the use of photos/videos taken during training for marketing purposes
                </label>
              </div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div>
              <h3 className="text-xl font-serif text-brand-charcoal border-b border-brand-charcoal/10 pb-2 mb-6">Student Declaration</h3>
              
              <div className="bg-brand-charcoal/5 p-6 text-xs text-brand-charcoal/80 space-y-4 mb-6 leading-relaxed max-h-60 overflow-y-auto border border-brand-charcoal/10">
                <p>By signing this document, I confirm that:</p>
                <ul className="list-disc pl-4 space-y-2">
                  <li>I agree to the enrolment terms, fees, refund conditions, and payment obligations.</li>
                  <li>I acknowledge the Refund Policy: 100% refundable 6 weeks before start date, 70% refundable 4 weeks before start date.</li>
                  <li>All information provided in this form is true and accurate to the best of my knowledge.</li>
                  <li>I consent to the collection, use, and disclosure of my personal information in accordance with the Academy's privacy policy.</li>
                </ul>
              </div>

              <label className="flex items-start gap-3 text-sm p-4 border border-brand-charcoal/20 cursor-pointer hover:border-brand-pink transition-colors bg-white mb-8 shadow-sm">
                <input type="checkbox" checked={formData.declaration_agreed} onChange={e => handleInputChange('declaration_agreed', e.target.checked)} className="accent-brand-pink mt-1" />
                <span className="font-medium">I have read, understood, and agree to the declarations and refund policies above.</span>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 border border-brand-charcoal/10">
                <div className="md:col-span-2 text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-2 font-bold border-b border-brand-charcoal/10 pb-2">Student Digital Signature</div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-2">Type your full name to sign</label>
                  <input type="text" placeholder="John Doe" value={formData.student_signature} onChange={e => handleInputChange('student_signature', e.target.value)} className="w-full border-b-2 border-brand-charcoal/20 px-2 py-2 text-lg font-serif focus:border-brand-pink outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-2">Date</label>
                  <input type="date" value={formData.student_signature_date} onChange={e => handleInputChange('student_signature_date', e.target.value)} className="w-full border-b-2 border-brand-charcoal/20 px-2 py-2 text-lg focus:border-brand-pink outline-none transition-colors" />
                </div>
                
                <div className="md:col-span-2 text-[10px] uppercase tracking-widest text-brand-charcoal/50 mt-6 mb-2 font-bold border-b border-brand-charcoal/10 pb-2">Parent/Guardian Signature (If under 18)</div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-2">Type full name to sign</label>
                  <input type="text" value={formData.parent_signature} onChange={e => handleInputChange('parent_signature', e.target.value)} className="w-full border-b-2 border-brand-charcoal/20 px-2 py-2 text-lg font-serif focus:border-brand-pink outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-2">Date</label>
                  <input type="date" value={formData.parent_signature_date} onChange={e => handleInputChange('parent_signature_date', e.target.value)} className="w-full border-b-2 border-brand-charcoal/20 px-2 py-2 text-lg focus:border-brand-pink outline-none transition-colors" />
                </div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-brand-sand pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-brand-charcoal mb-2">
              Enrollment <span className="italic font-light">Application</span>
            </h1>
            <p className="text-sm text-brand-charcoal/60">
              For: <span className="font-semibold">{courseTitle}</span>
            </p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2 border border-brand-charcoal/20 text-brand-charcoal text-[10px] tracking-widest uppercase hover:bg-brand-charcoal/5 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => saveForm('draft')}
              disabled={saving}
              className="px-6 py-2 bg-brand-charcoal text-white flex items-center gap-2 text-[10px] tracking-widest uppercase hover:bg-brand-pink hover:text-brand-charcoal transition-colors disabled:opacity-50"
            >
              {saving ? <Loader size={14} className="animate-spin" /> : <Save size={14} />}
              Save Draft
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="sticky top-32 space-y-2">
              {SECTIONS.map((section, idx) => (
                <button
                  key={section}
                  onClick={() => setCurrentStep(idx)}
                  className={`w-full text-left px-4 py-3 text-sm transition-all duration-300 border-l-2 ${
                    currentStep === idx 
                      ? 'border-brand-pink text-brand-pink font-medium bg-white shadow-sm' 
                      : 'border-transparent text-brand-charcoal/50 hover:text-brand-charcoal hover:bg-white/50'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>

          {/* Form Area */}
          <div className="lg:w-3/4">
            <div className="bg-white p-8 md:p-12 shadow-sm border border-brand-charcoal/5">
              
              {renderSection()}

              {/* Navigation Footer */}
              <div className="mt-12 pt-8 border-t border-brand-charcoal/10 flex justify-between">
                <button
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  className={`flex items-center gap-2 text-sm text-brand-charcoal/60 hover:text-brand-charcoal transition-colors ${currentStep === 0 ? 'invisible' : ''}`}
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                
                {currentStep < SECTIONS.length - 1 ? (
                  <button
                    onClick={() => {
                      saveForm('draft'); // Auto save on next
                      setCurrentStep(prev => Math.min(SECTIONS.length - 1, prev + 1));
                    }}
                    className="flex items-center gap-2 text-sm font-medium text-brand-pink hover:text-brand-charcoal transition-colors"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (!formData.declaration_agreed || !formData.student_signature) {
                        alert("Please agree to the declarations and provide your signature before submitting.");
                        return;
                      }
                      saveForm('submitted');
                    }}
                    disabled={saving}
                    className="px-8 py-3 bg-brand-pink text-white text-[10px] tracking-widest uppercase font-bold hover:bg-brand-charcoal transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Submitting...' : 'Submit Application'}
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EnrollmentFormPage;
