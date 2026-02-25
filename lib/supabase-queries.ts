/**
 * This file contains example Supabase queries and an explanation
 * for the Course List page filtering logic, as well as mock fetchers
 * for the dynamic Detail Page schemas.
 * 
 * --- FILTERING LOGIC EXPLANATION ---
 * 
 * 1. Base Constraints (Must always apply):
 *    - `is_published = true`: We should never display draft or archived courses
 *      to the public on the listing page.
 *    - `deleted_at IS NULL`: Supabase might use soft-deleting. Ensure we only
 *      fetch active records.
 * 
 * 2. Track Toggle (Global Filter):
 *    - The UI is split sharply into "Professional" vs "Casual" tracks.
 *    - This is the primary driver of the UI state and filtering.
 *    - Query constraint: `.eq('track', currentTrack)`
 * 
 * 3. Dynamic Sub-Filters (User Interactive):
 *    - These are applied only if the user actively selects a specific option
 *      (i.e., not 'all').
 *    - `course_kind`: Differs based on track. E.g., `.eq('course_kind', 'certification')`
 *    - `delivery_mode`: e.g., `.eq('delivery_mode', 'hybrid')`
 * 
 * 4. Client-Safe vs Server-Side Filtering:
 *    - Since the total number of courses for HBJ Academy might be small to medium 
 *      (e.g., < 100), we could optionally fetch all published/undeleted courses 
 *      up-front on load, and do the track and sub-filtering entirely in React state (client-side).
 *    - However, doing it Server-Side via Supabase (as shown below) is naturally 
 *      safer long-term, faster on initial load for scaling, and leverages DB indexes.
 * 
 * --- DATABASE INDEXES (Recommended) ---
 * - Index on `(track, is_published, deleted_at)` to optimize the main load.
 */

import { CourseFilterState, Course, Cohort, Module, Lesson } from '../types';

// Mock Supabase client type definitions for demonstration
type SupabaseClient = any;

/**
 * Example function to fetch and filter courses from Supabase.
 * 
 * @param supabase - The initialized Supabase client instance
 * @param filters - The current filter state from our React components
 */
// === EXISTING COURSE LIST QUERY EXPLANATION (MOCK UI FETCH BELOW) ===
export async function fetchCourses(supabase: SupabaseClient, filters: CourseFilterState) {
    // Start the query with the core constraints
    let query = supabase
        .from('courses')
        .select(`
      id,
      title,
      slug,
      short_summary,
      hero_media_url,
      track,
      course_kind,
      delivery_mode,
      duration_weeks,
      duration_hours,
      price_amount,
      has_active_cohort,
      category_tags
    `)
        // Base constraints
        .eq('is_published', true)
        .is('deleted_at', null)
        // Primary Global Toggle constraint
        .eq('track', filters.track);

    // Apply conditional filters if the user has selected a specific option
    if (filters.course_kind !== 'all') {
        query = query.eq('course_kind', filters.course_kind);
    }

    if (filters.delivery_mode !== 'all') {
        query = query.eq('delivery_mode', filters.delivery_mode);
    }

    // Note: For array-like category filtering (e.g. if category_tags is a Postgres Array)
    // we would use the .contains() filter
    if (filters.category !== 'all') {
        query = query.contains('category_tags', [filters.category]);
    }

    // Optimize ordering (e.g., show courses with active cohorts first)
    query = query.order('has_active_cohort', { ascending: false }).order('title', { ascending: true });

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching filtered courses:', error);
        throw error;
    }

    // Original query building logic remains unchanged for reference...
    return data;
}


// === MOCK DATA FETCHERS FOR DETAIL PAGE (UUIDs compressed for brevity) ===

export async function fetchCourseBySlug(supabase: SupabaseClient | null, slug: string): Promise<{
    course: Course | null,
    cohorts: Cohort[],
    modules: Module[],
    lessons: Lesson[]
}> {

    // MOCK: Simulate network latency
    await new Promise(res => setTimeout(res, 400));

    if (slug === 'advanced-aesthetic-injectables') {
        return {
            course: {
                id: '1',
                title: 'Advanced Aesthetic Injectables',
                slug: 'advanced-aesthetic-injectables',
                short_summary: 'Master the art of dermal fillers and advanced neurotoxin applications for full-face rejuvenation.',
                full_description: "- Master advanced clinical protocols safely.\n- Understand the science behind top-tier efficacy with HA structures.\n- Integrate Korean aesthetic principles into daily practice for natural, lifted results.\n- Hands-on cadaver lab experience equivalent.",
                hero_media_url: 'https://images.unsplash.com/photo-1614859324967-bdf8f2df5360?auto=format&fit=crop&q=80',
                track: 'professional',
                course_kind: 'certification',
                delivery_mode: 'hybrid',
                duration_weeks: 12,
                duration_hours: null,
                price_amount: 4500,
                price_total: 4500,
                currency: '$',
                payment_options: 'Pay in full or $1,500/month over 3 months.',
                deposit_required: 500,
                application_fee: 150,
                refund_policy_text: 'Deposits and application fees are non-refundable. Tuition is 50% refundable up to 14 days prior to cohort start.',
                internship_details: 'Top graduates will be invited to a 2-week clinical immersion at our partner facilties in Gangnam, Seoul, shadowing lead physicians.',
                interview_required: true,
                is_published: true,
                deleted_at: null,
                has_active_cohort: true,
                category_tags: ['Injectables', 'Anti-Aging', 'Hands-on']
            } as any, // Cast due to internal mocks omitting optional db fields
            cohorts: [
                {
                    id: 'c1', course_id: '1', name: 'Winter 2026', start_date: '2026-11-15T09:00:00Z', end_date: '2027-02-15T17:00:00Z', seats_total: 20, seats_filled: 14
                }
            ],
            modules: [
                { id: 'm1', course_id: '1', title: 'Anatomy and Danger Zones', order_index: 1 },
                { id: 'm2', course_id: '1', title: 'Rheology of Fillers', order_index: 2 }
            ],
            lessons: [
                { id: 'l1', module_id: 'm1', title: 'Vascular Mapping of the Mid-Face' },
                { id: 'l2', module_id: 'm1', title: 'Managing Occlusions' },
                { id: 'l3', module_id: 'm2', title: 'G Prime and Cohesivity Explained' }
            ]
        };
    }

    if (slug === 'gua-sha-fundamentals') {
        return {
            course: {
                id: '3',
                title: 'Gua Sha Fundamentals',
                slug: 'gua-sha-fundamentals',
                short_summary: 'Learn traditional Eastern facial massage techniques to lift, tone, and depuff at home.',
                full_description: "- Map the lymphatic system of the face.\n- Select the correct gemstone for your skin concern.\n- Prevent bruising and over-stimulation.",
                hero_media_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80',
                track: 'casual',
                course_kind: 'workshop',
                delivery_mode: 'online',
                duration_weeks: null,
                duration_hours: 2,
                price_amount: 49,
                price_total: 49,
                currency: '$',
                payment_options: null,
                deposit_required: null,
                application_fee: null,
                refund_policy_text: 'Digital products are 100% money-back guaranteed within 7 days of purchase if less than 20% completed.',
                internship_details: null,
                interview_required: false,
                is_published: true,
                deleted_at: null,
                has_active_cohort: false,
                category_tags: ['Holistic', 'At-Home']
            } as any,
            cohorts: [],
            modules: [
                { id: 'm3', course_id: '3', title: 'Preparation & Tools', order_index: 1 },
                { id: 'm4', course_id: '3', title: 'The Lift Protocol', order_index: 2 }
            ],
            lessons: [
                { id: 'l4', module_id: 'm3', title: 'Choosing Your Oil' },
                { id: 'l5', module_id: 'm4', title: 'Jawline Sculpting' },
                { id: 'l6', module_id: 'm4', title: 'Eye De-puffing Strokes' }
            ]
        };
    }

    // Return empty if slug not found
    return { course: null, cohorts: [], modules: [], lessons: [] };
}
