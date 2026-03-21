# Deliverable 3: UI Design Plan for Course Listing & Detail (2026 Conversion Standard)

## 1. Course Listing Page Layout
The listing page serves as the entry point and must immediately segment the user to reduce cognitive load, acting as a guided funnel rather than a static directory.

### Section Order & UI Components
1. **Dynamic Hero Section:**
   * **Headline:** "Master Your Craft at HBJ Academy"
   * **Subheadline:** "Elevate your beauty career with industry-leading training, hands-on experience, and guaranteed excellence."
   * **Global Toggle (The Segmenter):** Large, prominent toggle switch: `[ Professional Career Tracks ]` vs `[ Casual Modules & Workshops ]`.

2. **Filter Navigation (Sticky Ribbon):**
   * *If Professional is active:* Tags for `[All]` `[Beginner]` `[Intermediate]` `[Advanced]` `[Single Focus]`.
   * *If Casual is active:* Tags for `[All]` `[Short Courses]` `[Online Theory]`.

3. **Active Cohort Banner (Conditional):**
   * Just below the filter, if any professional program is enrolling soon: "🚨 *Winter 2026 Cohorts Enrolling Now! Limited Seats Available.*"

4. **Course Grid (The Catalog):**
   * Responsive CSS Grid (1 col mobile, 2 col tablet, 3-4 col desktop).

5. **Trust Authority Section:**
   * "Why HBJ Academy?" featuring 3 columns: Expert Instructors, Real Clinic Experience, Career Pathways.
   * Alumni Success Logos or Testimonial Carousel.

### Course Card Design (Data Mapping)
| UI Element | Data Source (`courses` table) | Styling / Behavior |
| :--- | :--- | :--- |
| **Hero Image** | `hero_media_url` | 16:9 Aspect Ratio. Subtle zoom on card hover. |
| **Track/Level Badge** | `track`, `category_tags` | Top left corner pill (e.g., "Intermediate Pro"). |
| **Delivery Badge** | `delivery_mode` | Top right corner icon (e.g., "Hybrid" or "100% Online"). |
| **Course Title** | `title` | Bold H3, truncated to 2 lines max. |
| **Short Summary** | `short_summary` | Muted gray text, max 3 lines. |
| **Duration + Details** | `duration_value/unit`, `total_hours` | Icon row. e.g., "⏱ 12 Weeks • 📚 216 Hours" |
| **Pricing Context** | `price_total`, `payment_options` | "From $X/week" or full price based on track context. |
| **Primary CTA** | N/A (Dynamic based on kind) | Pro: "View Program" • Casual: "View Details" |

---

## 2. Course Detail Page Layout

The detail page is a direct-response landing page. Its structure changes dynamically based on the `course_kind` and `track`.

### Standard Layout Hierarchy
1. **Split Hero (Above the Fold):**
   * **Left:** Title, Summary, Trust Badges (e.g., "Australian Certified"), and the Primary CTA button.
   * **Right:** High-production promotional video or gallery (`gallery_media_urls`).

2. **Social Proof (Immediate Validation):**
   * "Join 500+ successful graduates."
   * 3 featured video testimonials mapped via `reviews` table.

3. **Transformation / What You'll Learn:**
   * `what_you_learn` mapped to a 2-column checklist layout with green checkmarks.

4. **The Curriculum (Accordion):**
   * `modules` and `lessons` dynamically rendered. Users can expand a module to see lesson titles, but the content URL remains behind the enrollment wall.

5. **Internship / Job Outcomes (Pro Only):**
   * Rendered only if `internship_included = true`. Pulls `internship_details`. Crucial for high-ticket career conversion.

6. **Instructor Bio:**
   * Focus on real-world clinical experience and mastery.

7. **Pricing, Financing, & Guarantee:**
   * Pricing cards built from `price_total`, `deposit_required`, and `payment_options`.
   * Clear display of the `refund_policy_text` to remove risk objections.

8. **FAQs & Final CTA:**
   * Addressing common objections.
   * Final sticky CTA button at the bottom of the screen on mobile devices.

### UI Variability by `course_kind` & `track`

#### A. Programs (Professional Track)
* **Objective:** Lead generation & Admissions qualification.
* **Pricing View:** Emphasis on weekly/monthly installment plans (e.g., "Only $150/week").
* **Urgency:** If `cohort_required` = true, display the `cohorts` data (Start Date, Seats Left). E.g., "Only 3 Seats Left for September Intake".
* **CTA Button:** **"Apply Now"**
* **Funnel:** Clicking applies redirects to the multi-step `applications` form (Capturing experience level, motivation, enforcing interview booking if `interview_required` is true).

#### B. Short Courses / Single / Specialty (Casual Track)
* **Objective:** Instant impulse purchase.
* **Pricing View:** Emphasis on the total upfront cost (e.g., "$500").
* **Scarcity:** "Next Workshop Date: [Date]"
* **CTA Button:** **"Enroll Now"**
* **Funnel:** Skips application. Directs to a single-step Stripe Checkout session. Immediately creates an `enrollments` record upon payment success webhook.

#### C. Online Courses (Theory/Foundation)
* **Objective:** Passive income, scalable self-paced enrollment.
* **Pricing View:** Upfront cost. Emphasize "Lifetime Access" or whatever the policy dictates.
* **Trust factor:** Explicitly display the "Digital Product Refund Policy" as online courses uniquely lack physical overhead but face higher chargeback risks.
* **CTA Button:** **"Start Learning Now"**
* **Funnel:** Single-step checkout. Instant access granted to the LMS dashboard. No dates or cohorts shown.
