# Contact Form

<!-- Status: ✅ LIVE | Last updated: 2025-11-09 -->

## What IS
Professional contact form for commission inquiries, purchases, and general inquiries with submission tracking.

## Components
- `ContactForm`: Client-side form with real-time validation
- `ContactPage`: Contact form page with professional UI

## Design
- **Layout**: Single-column form, centered, max-width container
- **Colors**: Clay palette with sage green accents
- **Typography**: Clear labels, helpful error messages
- **Validation**: Real-time client-side + server-side validation
- **Feedback**: Success/error messages after submission

## Route
- `/contact` - Contact form page (public)

## Form Fields
**Required:**
- Name (min 2 characters)
- Email (valid email format)
- Inquiry Type (dropdown: Commission, Purchase, Collaboration, Exhibition, General)
- Message (min 10 characters, max 1000 characters)

**Optional:**
- Phone (validated format if provided)

## Validation Rules
**Client-side (UX):**
- Real-time error display as user types
- Character counter for message field
- Email format validation
- Phone format validation (if provided)
- Clear error messages

**Server-side (Security):**
- All required fields present
- Email format validation
- Phone format validation (if provided)
- Message length constraints
- Trim and sanitize all inputs
- Lowercase email addresses

## Inquiry Types
1. **Commission** - Custom piece requests
2. **Purchase** - Buy existing work
3. **Collaboration** - Artist collaborations
4. **Exhibition** - Gallery/exhibition opportunities
5. **General** - Other inquiries

## Data Flow
1. User fills out form
2. Client-side validation runs on blur/change
3. Submit → POST /api/contact
4. Server validates all fields
5. Create submission in Supabase with status='new'
6. Return success message
7. Admin views in /admin/submissions

## Database Schema
**Table**: `contact_submissions`
**Fields**:
- id (VARCHAR PRIMARY KEY)
- name (VARCHAR NOT NULL)
- email (VARCHAR NOT NULL)
- phone (VARCHAR NULLABLE)
- inquiry_type (VARCHAR CHECK constraint)
- message (TEXT NOT NULL)
- status (VARCHAR DEFAULT 'new', CHECK constraint)
- created_at (TIMESTAMP WITH TIME ZONE)
- updated_at (TIMESTAMP WITH TIME ZONE)

**Indexes**:
- created_at (for sorting)
- status (for filtering)

## Status Workflow
New submissions start with `status='new'` and progress through:
- new → read → responded → archived

Admin manages statuses via `/admin/submissions` interface.

## Error Handling
- Network errors: Display friendly message, allow retry
- Validation errors: Show specific field errors
- Server errors: Generic error message
- Success: Clear form, show success message
