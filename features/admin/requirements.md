# Admin Panel

<!-- Status: ✅ LIVE | Last updated: 2025-11-09 -->

## What IS
Mobile-optimized admin interface for uploading and managing pottery, plus contact submission management.

## Components
- `LoginForm`: Password input, submit button
- `Dashboard`: List of all pieces, edit/delete actions, navigation to submissions
- `UploadForm`: Multi-file upload, metadata inputs
- `PieceEditor`: Edit existing piece details
- `SubmissionsViewer`: Two-panel interface for viewing/managing contact form submissions

## Design
- **Login**: Centered card, simple password field
- **Upload**: Large dropzone, image previews, form fields
- **Dashboard**: Grid view, action buttons, sage green accents
- **Submissions**: Two-panel layout (list + detail), status filters, color-coded badges
- **Colors**: clay palette, sage green accents, status-specific colors

## Routes
- `/admin/login` - Login page
- `/admin/dashboard` - Pottery dashboard (protected)
- `/admin/submissions` - Contact submissions viewer (protected)

## Upload Flow
1. Select photos (camera/gallery on mobile)
2. Preview thumbnails
3. Fill metadata (title, description, collection)
4. Submit → Upload to Cloudinary → Save to Supabase
5. Instantly visible in gallery

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

## Contact Submissions Management
**Features:**
- Statistics dashboard (count by status: new, read, responded, archived)
- Filter submissions by status
- Two-panel layout: list on left, detail view on right
- Click submission to view full details
- One-click status updates
- Delete with confirmation
- Display all submission fields (name, email, phone, inquiry type, message, timestamps)

**Status Workflow:**
- new → read → responded → archived

**Color Coding:**
- New: Blue badge
- Read: Gray badge
- Responded: Green badge
- Archived: Slate badge
