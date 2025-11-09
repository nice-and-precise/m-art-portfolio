# API Routes

<!-- Status: ✅ LIVE | Last updated: 2025-11-09 -->

## What IS
Next.js API routes for auth, pottery CRUD, contact forms, and image uploads.

## Endpoints

### Authentication
**POST /api/auth/login**
- Body: `{ password: string }`
- Returns: `{ token: string }` (JWT)
- Sets HTTP-only cookie

### Pottery CRUD
**GET /api/pieces**
- Query: `?collection=vases&featured=true`
- Returns: `Pottery[]`

**POST /api/pieces**
- Body: `{ title, description, collection, images[], featured }`
- Auth: Required
- Returns: `{ id, ...piece }`

**PUT /api/pieces/[id]**
- Body: Partial pottery object
- Auth: Required
- Returns: Updated piece

**DELETE /api/pieces/[id]**
- Auth: Required
- Returns: `{ success: boolean }`

### Image Upload
**POST /api/upload**
- Body: FormData with image file
- Auth: Required
- Uploads to Cloudinary
- Returns: `{ url: string, publicId: string }`

### Contact Form (Public)
**POST /api/contact**
- Body: `{ name, email, phone?, inquiryType, message }`
- Auth: None (public endpoint)
- Validation: Server-side validation matching client-side
- Returns: `{ success: true, message: string }`
- Stores in Supabase `contact_submissions` table

### Contact Submissions Management (Admin)
**GET /api/admin/submissions**
- Auth: Required
- Returns: `ContactSubmission[]` (sorted by created_at desc)

**PATCH /api/admin/submissions/[id]**
- Body: `{ status: 'new' | 'read' | 'responded' | 'archived' }`
- Auth: Required
- Returns: Updated `ContactSubmission`

**DELETE /api/admin/submissions/[id]**
- Auth: Required
- Returns: `{ success: true }`

## Data Storage
- **Database**: Supabase Postgres (REST API via @supabase/supabase-js)
- **Tables**:
  - `pottery` - All pottery pieces with images and metadata
  - `contact_submissions` - Contact form submissions with status tracking
- **Serverless-optimized**: REST API calls instead of persistent connections
- **Connection**: Environment variables for Supabase URL and anon key

## Error Handling
- 401: Unauthorized (missing/invalid token)
- 400: Bad request (validation failed)
- 500: Server error (catch all)
- Return JSON: `{ error: string }`

## Cloudinary Integration
- Upload via cloudinary SDK
- Auto-optimization: quality, format
- Transformations: w_1200, c_limit
- Store public_id for deletion
