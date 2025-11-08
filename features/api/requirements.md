# API Routes

<!-- Status: Building | Last updated: 2025-11-08 -->

## What IS
Next.js API routes for auth, pottery CRUD, and image uploads.

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

## Data Storage
- File: `data/pottery.json`
- Structure: `{ pieces: Pottery[] }`
- Atomic writes (read → modify → write)
- No database needed for MVP

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
