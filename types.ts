
export interface Skill {
  title: string;
  description: string;
  imageUrl: string;
}

export interface SocialImage {
  id: number;
  imageUrl: string;
  category: 'student' | 'result' | 'interior';
}

export type CourseTrack = 'professional' | 'casual';
export type DeliveryMode = 'online' | 'hybrid' | 'in-person';
export type CourseKind = 'certification' | 'diploma' | 'workshop' | 'masterclass' | 'module';

export interface Course {
  id: string;
  title: string;
  slug: string;
  short_summary: string | null;
  full_description?: string | null;
  hero_media_url: string | null;
  track: CourseTrack;
  course_kind: CourseKind;
  delivery_mode: DeliveryMode;
  duration_weeks: number | null;
  duration_hours: number | null;
  price_amount: number | null; // Keep for legacy, though we use price_total now
  price_total?: number | null;
  currency?: string;
  payment_options?: string | null;
  deposit_required?: number | null;
  application_fee?: number | null;
  refund_policy_text?: string | null;
  internship_details?: string | null;
  interview_required?: boolean;
  is_published: boolean;
  deleted_at: string | null;
  has_active_cohort: boolean;
  category_tags: string[];
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  order_index: number;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  // Note: content_url is intentionally omitted from the public type 
  // to ensure it isn't accidentally leaked to unenrolled users.
}

export interface Cohort {
  id: string;
  course_id: string;
  name: string;
  start_date: string;
  end_date: string;
  seats_total: number;
  seats_filled: number;
}

export interface CourseFilterState {
  track: CourseTrack;
  course_kind: CourseKind | 'all';
  delivery_mode: DeliveryMode | 'all';
  category: string | 'all';
}
