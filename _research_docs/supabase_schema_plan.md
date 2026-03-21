# Deliverable 2: ERD & Supabase Schema Plan
# Healing By J Academy - Unified Course Architecture

## Core Philosophy
We will use a **single unified `courses` table** utilizing the `course_kind` and `track` ENUMs to differentiate large programs, short workshops, and single specialty modules. 

**Why Modules/Lessons vs Parent Course ID:** 
We will use a `modules` and `lessons` relational structure linked to the `courses` table rather than arbitrary `parent_course_id` self-referencing. 
*Reasoning*: Self-referencing tables often lead to complex recursive SQL queries and UI logic nightmares. By keeping `courses` as the sellable product, and `modules` -> `lessons` as the consumable content, we cleanly separate marketing/sales from LMS delivery. If a "Single Course" like "Baby Massage" is sold, it is simply a `Course` with 1 `Module` and 1 `Lesson`. If an "Advanced Program" is sold, it has 12 `Modules` and 36 `Lessons`. This makes progress tracking universally standardized.

---

## 1. Tables & Primary/Foreign Keys

### `users` (Managed by Supabase Auth)
- `id` (uuid, PK)

### `profiles`
- `id` (uuid, PK, FK -> `users.id`)
- `role` (enum: `admin`, `student`, `instructor`)
- `first_name`, `last_name`, `phone` (text)
- `stripe_customer_id` (text, unique, nullable initially)

### `courses` (Unified Catalog)
- `id` (uuid, PK)
- `title` (text), `slug` (text, unique)
- `course_kind` (enum: `program`, `short_course`, `online_course`, `single_course`, `specialty_module`)
- `track` (enum: `professional`, `casual`)
- `delivery_mode` (enum: `in_person`, `online`, `hybrid`)
- `price_total` (numeric), `currency` (text)
- `payment_options` (text) - e.g. "upfront, weekly_installments"
- `deposit_required` (boolean), `application_fee` (numeric)
- `refund_policy_text` (text)
- `internship_details` (text)
- `interview_required` (boolean)
- `is_published` (boolean)
- `deleted_at` (timestamp, nullable for soft deletes)

### `cohorts` (Optional Dates & Seat tracking for Professional programs)
- `id` (uuid, PK)
- `course_id` (uuid, FK -> `courses.id`)
- `name` (text)
- `start_date`, `end_date` (date)
- `seats_total` (integer), `seats_filled` (integer)

### `modules`
- `id` (uuid, PK)
- `course_id` (uuid, FK -> `courses.id`)
- `title` (text)
- `order_index` (integer)

### `lessons`
- `id` (uuid, PK)
- `module_id` (uuid, FK -> `modules.id`)
- `title`, `content_url` (text)

### `applications` (Professional track admissions pipeline)
- `id` (uuid, PK)
- `student_id` (uuid, FK -> `profiles.id`)
- `course_id` (uuid, FK -> `courses.id`)
- `cohort_id` (uuid, nullable, FK -> `cohorts.id`)
- `status` (enum: `pending`, `interview_scheduled`, `deposit_paid`, `approved`, `rejected`)
- `application_data` (jsonb) - motivation, experience level

### `enrollments` (Access Table - Source of Truth for LMS)
- `id` (uuid, PK)
- `student_id` (uuid, FK -> `profiles.id`)
- `course_id` (uuid, FK -> `courses.id`)
- `cohort_id` (uuid, nullable, FK -> `cohorts.id`)
- `status` (enum: `active`, `completed`, `suspended`, `cancelled`)
- `created_at` (timestamp)

### `payments` (Stripe Ledger Table)
- `id` (uuid, PK)
- `student_id` (uuid, FK -> `profiles.id`)
- `enrollment_id` (uuid, nullable, FK -> `enrollments.id`)
- `application_id` (uuid, nullable, FK -> `applications.id`)
- `stripe_payment_intent_id` (text, unique, nullable)
- `stripe_checkout_session_id` (text, unique, nullable)
- `stripe_subscription_id` (text, nullable)
- `stripe_invoice_id` (text, nullable)
- `stripe_charge_id` (text, nullable)
- `amount_total` (numeric)
- `currency` (text)
- `status` (enum: `pending`, `requires_action`, `succeeded`, `failed`, `refunded`, `partially_refunded`)
- `payment_type` (enum: `application_fee`, `deposit`, `tuition`, `installment`)
- `metadata_json` (jsonb)
- `created_at` (timestamp)

### `subscriptions` (For Recurring Installment Plans)
- `id` (uuid, PK)
- `student_id` (uuid, FK -> `profiles.id`)
- `course_id` (uuid, FK -> `courses.id`)
- `stripe_subscription_id` (text, unique)
- `status` (text) - e.g. "active", "past_due", "canceled"
- `current_period_start` (timestamp)
- `current_period_end` (timestamp)
- `cancel_at_period_end` (boolean)

### `stripe_events` (Webhook Idempotency & Safety)
- `id` (uuid, PK)
- `stripe_event_id` (text, unique)
- `event_type` (text)
- `processed_at` (timestamp, default now())

### `lesson_progress` (Relational tracking, not JSON)
- `id` (uuid, PK)
- `enrollment_id` (uuid, FK -> `enrollments.id`)
- `lesson_id` (uuid, FK -> `lessons.id`)
- `status` (enum: `not_started`, `in_progress`, `completed`)
- `last_accessed` (timestamp)

### `certifications`
- `id` (uuid, PK)
- `enrollment_id` (uuid, unique, FK -> `enrollments.id`)
- `certificate_hash` (text, unique)
- `issued_at` (timestamp)

### `reviews`
- `id` (uuid, PK)
- `course_id` (uuid, FK -> `courses.id`)
- `student_id` (uuid, FK -> `profiles.id`)
- `rating` (integer), `comment` (text)
- `is_approved` (boolean)

---

## 2. Updated ERD (Schema Relationships)

```text
[ profiles ]
  |-- stripe_customer_id (UNIQUE)
  ||--o{ applications
  ||--o{ enrollments
  ||--o{ payments
  ||--o{ subscriptions

[ courses ]
  ||--o{ modules
  ||--o{ cohorts

[ modules ]
  ||--o{ lessons

[ applications ]
  |o--|| profiles 
  |o--|| courses
  |o--o{ payments (deposit/app fee)
  status (Enum: pending, interview_scheduled, deposit_paid, approved, rejected)
  
[ enrollments ] (The final source of truth for access)
  |o--|| profiles 
  |o--|| courses
  |o--o{ payments (tuition/installments)
  status (Enum: active, completed, suspended, cancelled)

[ payments ]
  stripe_payment_intent_id (UNIQUE)
  stripe_checkout_session_id (UNIQUE)
  stripe_subscription_id
  amount_total, status (succeeded, refunded, etc.)

[ subscriptions ]
  stripe_subscription_id (UNIQUE)
  |o--|| profiles
  |o--|| courses

[ stripe_events ]
  stripe_event_id (UNIQUE)
```

---

## 3. Webhook Strategy & Idempotency

### Event Mapping & Database Actions
| Stripe Event | Backend Action | Target Table |
| :--- | :--- | :--- |
| `checkout.session.completed` | Validates session metadata. If Casual Course -> Creates `enrollments` (active). If Pro App -> Creates an `applications` record, or updates status of existing to `deposit_paid`. | `payments`, `enrollments`, `applications` |
| `payment_intent.succeeded` | Locates by `stripe_payment_intent_id`. Sets payment `status` = 'succeeded'. | `payments` |
| `invoice.paid` | Locates the associated `stripe_subscription_id`. Logs installment success. If it's the final invoice, marks subscription full. | `payments`, `subscriptions` |
| `customer.subscription.updated` | Updates internal `subscriptions` table statuses (`past_due`, `canceled`). If canceled via non-payment, updates `enrollments.status` to `suspended`. | `subscriptions`, `enrollments` |
| `charge.refunded` | Updates `payments.status` to `refunded` or `partially_refunded`. If full refund, updates `enrollments.status` to `cancelled`. | `payments`, `enrollments` |

### Idempotency & Safety Requirements
- **`stripe_events` Table Mapping:** Before processing any webhook payload, the Edge Function must attempt to `INSERT INTO stripe_events (stripe_event_id, event_type)`. If the `stripe_event_id` violates the `UNIQUE` constraint, the function immediately terminates with a 200 OK (Event was already processed).
- **Hard Constraints:** The constraints on `stripe_payment_intent_id` and `stripe_checkout_session_id` act as failsafes to absolutely prevent identical payments from being recorded twice, regardless of network race conditions in the webhook handler.
- **Client Restrictions:** A client can **never** directly `INSERT INTO enrollments`. Enrollments and Payment statuses must strictly be handled by the backend webhook listener with a Supabase Service Role Key.

---

## 4. Refund Handling & Status Rollbacks
- A payment row transitions to `refunded`. If the `metadata_json` or logic determines this was the primary payment for a casual course, the trigger or webhook logic transitions the linked `enrollments.status` from `active` -> `cancelled`.
- For installments, if an installment fails (`invoice.payment_failed`) leading to subscription termination, the `enrollments.status` transitions from `active` -> `suspended`.

---

## 5. Security & RLS Updates
### Stripe Integration Access Security
- Webhook Handlers: Will run securely via Supabase Edge Functions / Next.js API Routes using the **Supabase Service Role Key** (bypassing RLS entirely).
- Client Applications: Cannot `INSERT` or `UPDATE` the `payments`, `enrollments`, or `applications.status` explicitly.

### Row Level Security (RLS)
- `payments`: `SELECT` allowed for `student_id = auth.uid()`. No insert/update/delete.
- `subscriptions`: `SELECT` allowed for `student_id = auth.uid()`. No insert/update/delete.
- `enrollments`: `SELECT` allowed for `student_id = auth.uid()`. (Write blocked entirely for authenticated users; write-only by backend).

---

## 6. Performance & Reporting Indexes
To prevent full table scans when looking up Stripe relationships during high-traffic webhook bursts, we require the following indexes:
- `CREATE INDEX idx_profiles_stripe_customer_id ON profiles(stripe_customer_id);`
- `CREATE INDEX idx_payments_payment_intent_id ON payments(stripe_payment_intent_id);`
- `CREATE INDEX idx_payments_checkout_session_id ON payments(stripe_checkout_session_id);`
- `CREATE INDEX idx_subscriptions_stripe_sub_id ON subscriptions(stripe_subscription_id);`

---

## 7. Checklists

### Stripe Integration Checklist
- [ ] Connect Stripe account and configure test mode keys in Supabase/Vercel ENV.
- [ ] Define Products/Prices in Stripe dashboard (Mapping to `courses` UUIDs as metadata).
- [ ] Create Stripe Checkout Session endpoint that passes `student_id` and `course_id` through `metadata`.
- [ ] Set up the `/api/webhook/stripe` route in the backend.
- [ ] Implement `stripe-node` library and secure `constructEvent` payload verification using the Stripe Webhook Secret.
- [ ] Add the idempotent query check against `stripe_events` for incoming hooks.

### Database Security Checklist
- [ ] Double-check all RLS policies to ensure no API endpoints allow rogue POSTs to `enrollments`.
- [ ] Confirm `stripe_events.stripe_event_id` has a Unique constraint.
- [ ] Make sure `stripe_customer_id` is automatically linked to new `profiles` creations.
- [ ] Expose an `admin_dashboard_view` function bypassing RLS to allow the stakeholders to track financial metrics securely.
