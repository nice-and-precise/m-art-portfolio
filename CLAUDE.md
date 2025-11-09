# M_ART Ceramics Portfolio

<!-- Last updated: 2025-11-09 - Contact form implemented with Supabase storage -->

## Purpose
Professional, museum-quality portfolio for an 18-year-old ceramic artist. Mobile-first with phone camera upload. Inspired by best ceramics portfolios (Format, professional artist websites).

## Current State
**Status**: ✅ LIVE WITH SUPABASE DATABASE (REST API)
**Live URL**: https://m-art-portfolio.vercel.app
**Stack**: Next.js 14, TypeScript, Tailwind, Cloudinary, Supabase Postgres
**Deployment**: https://vercel.com/jordans-projects-4bff4baa/m-art-portfolio
**GitHub**: https://github.com/nice-and-precise/m-art-portfolio
**Design**: Professional ceramics portfolio with sage green accents
**Database**: Supabase Postgres via REST API (8 pottery pieces loaded)

## Architecture

### Tech Stack (What IS)
- **Framework**: Next.js 14.2.0 (App Router, Server Components)
- **Styling**: Tailwind CSS with professional pottery color palette
- **Images**: Cloudinary (dfrzq3gvh) + Unsplash placeholders - auto-optimization, CDN
- **Auth**: Simple password (JWT) - admin panel access only
- **Database**: **Supabase Postgres** via @supabase/supabase-js (REST API, serverless-optimized)
- **Deploy**: Vercel serverless functions + static generation

### Professional Color Palette
```typescript
clay: { 50-900 }     // Cream → Terracotta → Dark Earth
glaze: {
  sage: '#8B9D83',   // Accent color (inspired by top portfolios)
  celadon: '#7FA5A3', // Secondary accents
  honey: '#D4A574',
  matte: '#F0EBE3'
}
```

### Key Design Principles
1. **Mobile-first upload**: Phone camera → instant upload with large touch targets
2. **Professional UI**: Inspired by Format ceramics portfolios
3. **Varied grid layouts**: Dynamic sizing (large featured pieces)
4. **Sage green accents**: Professional artist website standard
5. **Sophisticated typography**: Large headings, uppercase labels, generous spacing
6. **Parallax hero**: Multi-layer scrolling effect with pottery images
7. **Masonry grids**: Pinterest-style for varied pottery dimensions

## File Structure
```
M_ART/
├── CLAUDE.md                    # This file
├── features/
│   ├── landing/
│   │   └── requirements.md      # Hero + featured gallery
│   ├── gallery/
│   │   └── requirements.md      # Masonry grid + filters
│   ├── admin/
│   │   └── requirements.md      # Upload interface
│   └── api/
│       └── requirements.md      # Backend routes
├── src/
│   ├── app/
│   │   ├── contact/page.tsx     # Contact form page
│   │   └── api/contact/route.ts # Contact submission endpoint
│   ├── components/
│   │   └── contact/ContactForm.tsx  # Contact form component
│   ├── lib/
│   │   └── db.ts                # Database utilities (pottery + contact)
│   └── types/
│       ├── pottery.ts           # Pottery types
│       └── contact.ts           # Contact form types
└── supabase/
    └── migrations/
        └── 002_create_contact_submissions.sql  # Contact table schema
```

## Active Features

### Landing Page
- Full-screen hero with pottery background
- Featured gallery grid (6 pieces)
- About section with artist bio
- Smooth scroll animations

### Gallery
- Masonry grid layout (responsive: 1/2/3 cols)
- Filter by collection (Vases, Bowls, Sculptural, etc.)
- Sort by date/featured
- Lightbox viewer
- Lazy loading

### Admin Panel (/admin)
- Password-protected (default: "admin123")
- Mobile-optimized upload UI
- Multi-photo upload to Cloudinary
- Add title, description, collection
- Mark pieces as featured
- Edit/delete existing pieces

### Contact Form (/contact) ✅
- Commission inquiry form with validation
- Fields: name, email, phone (optional), inquiry type, message
- Client-side validation (email format, required fields, min length)
- Server-side validation in API route
- Submissions stored in Supabase `contact_submissions` table
- Professional UI matching pottery color palette
- Success/error feedback messages
- 5 inquiry types: Commission, Purchase, Collaboration, Exhibition, General

### API Routes
- POST /api/auth/login - Admin authentication
- GET /api/pieces - List all pottery
- POST /api/pieces - Create new piece
- PUT /api/pieces/[id] - Update piece
- DELETE /api/pieces/[id] - Delete piece
- POST /api/upload - Upload image to Cloudinary
- POST /api/contact - Submit contact form (stores in contact_submissions table)

## Environment Variables
```bash
CLOUDINARY_CLOUD_NAME=dfrzq3gvh
CLOUDINARY_API_KEY=313578916364477
CLOUDINARY_API_SECRET=[set]
JWT_SECRET=[generated]
ADMIN_PASSWORD_HASH=[bcrypt hash of "admin123"]
```

## Development Workflow
```bash
npm run dev      # localhost:3000
npm run build    # Production build
vercel --prod    # Deploy to production
```

## Common Patterns

### Adding a New Feature
1. Create `features/[name]/requirements.md`
2. Build components in `src/components/[name]/`
3. Add API routes if needed in `src/app/api/`
4. Update this file with what changed

### Updating Documentation
After every significant change, update:
- This CLAUDE.md (what IS now)
- Relevant `features/*/requirements.md`
- Keep it concise (token budget)

### Image Upload Flow
1. User selects photos (phone/desktop)
2. POST to /api/upload → Cloudinary
3. Returns optimized URLs
4. POST to /api/pieces with metadata
5. Saved to data/pottery.json
6. Instantly visible in gallery

## Constraints
- No user accounts (only one admin)
- No database (JSON file storage)
- No complex CMS (simple CRUD)
- Mobile-first (artist is primary user)
- Fast (static generation where possible)

## Production URLs
- **Live Site**: https://m-art-portfolio.vercel.app
- **Admin Login**: https://m-art-portfolio.vercel.app/admin/login (password: admin123)
- **Gallery**: https://m-art-portfolio.vercel.app/gallery
- **Vercel Dashboard**: https://vercel.com/jordans-projects-4bff4baa/m-art-portfolio
- **GitHub**: https://github.com/nice-and-precise/m-art-portfolio

## Making Changes
```bash
# Edit code in C:\Users\Owner\Desktop\M_ART
git add -A
git commit -m "describe changes"
git push
# Vercel auto-deploys in 2-3 minutes
```

## Quick Reference
- **Admin Password**: admin123 (change after first use)
- **Sample Data**: 6 placeholder pieces (delete via dashboard)
- **Auto-Deploy**: Enabled (push to GitHub → Vercel deploys)
- **Cloudinary**: dfrzq3gvh (auto image optimization)

---

**Note**: This is a living document. Update atomically with code changes. Keep concise.
