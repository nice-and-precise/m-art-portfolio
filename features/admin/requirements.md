# Admin Panel

<!-- Status: Building | Last updated: 2025-11-08 -->

## What IS
Mobile-optimized admin interface for uploading and managing pottery.

## Components
- `LoginForm`: Password input, submit button
- `Dashboard`: List of all pieces, edit/delete actions
- `UploadForm`: Multi-file upload, metadata inputs
- `PieceEditor`: Edit existing piece details

## Design
- **Login**: Centered card, simple password field
- **Upload**: Large dropzone, image previews, form fields
- **Dashboard**: Table/grid view, action buttons
- **Colors**: clay palette, clear CTAs

## Routes
- `/admin/login` - Login page
- `/admin` - Dashboard (protected)
- `/admin/upload` - Upload interface (protected)

## Upload Flow
1. Select photos (camera/gallery on mobile)
2. Preview thumbnails
3. Fill metadata (title, description, collection)
4. Submit → Upload to Cloudinary → Save to JSON
5. Redirect to dashboard

## Metadata Fields
- Title (required)
- Description (optional)
- Collection (dropdown: Vases, Bowls, Sculptural, etc.)
- Featured (checkbox)
- Date (auto-set to today)

## Auth
- Simple password check (bcrypt)
- JWT token in cookie
- Middleware protects /admin routes
- No user accounts, just one password

## Mobile Optimization
- Large touch targets (min 44px)
- Native file picker
- Camera access for direct capture
- Simplified single-column form
