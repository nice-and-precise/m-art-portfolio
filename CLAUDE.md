# M_ART Ceramics Portfolio

<!-- Last updated: 2025-11-08 - Initial ceramics portfolio setup -->

## Purpose
Beautiful, mobile-first portfolio for an 18-year-old ceramic artist to showcase pottery and upload new work from her phone. Surprise gift project.

## Current State
**Status**: 🟢 LIVE AND DEPLOYED
**Live URL**: https://m-art-portfolio.vercel.app
**Stack**: Next.js 14, TypeScript, Tailwind, Cloudinary, Vercel
**Deployment**: https://vercel.com/jordans-projects-4bff4baa/m-art-portfolio
**GitHub**: https://github.com/nice-and-precise/m-art-portfolio

## Architecture

### Tech Stack (What IS)
- **Framework**: Next.js 14.2.0 (App Router, Server Components)
- **Styling**: Tailwind CSS with pottery color palette (clay/glaze colors)
- **Images**: Cloudinary (dfrzq3gvh) - auto-optimization, CDN delivery
- **Auth**: Simple password (JWT) - admin panel access only
- **Database**: JSON file storage (data/pottery.json) - no external DB
- **Deploy**: Vercel serverless functions + static generation

### Pottery Color Palette (Tailwind)
```typescript
clay: { 50-900 } // Cream → Terracotta → Dark Earth
glaze: { celadon, sage, honey, matte }
```

### Key Design Decisions
1. **Mobile-first upload**: Artist uses phone camera → instant upload
2. **No authentication for public**: Anyone can view, only artist uploads
3. **Masonry grid**: Better for pottery (varied aspect ratios)
4. **Cloudinary**: Handles all image optimization automatically
5. **Simple password**: No user accounts, just one admin password

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
│   ├── app/                     # Next.js pages (App Router)
│   ├── components/              # React components
│   ├── lib/                     # Utilities (cloudinary, auth, db)
│   └── types/                   # TypeScript types
└── data/
    └── pottery.json             # Pottery pieces storage
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

### API Routes
- POST /api/auth/login - Admin authentication
- GET /api/pieces - List all pottery
- POST /api/pieces - Create new piece
- PUT /api/pieces/[id] - Update piece
- DELETE /api/pieces/[id] - Delete piece
- POST /api/upload - Upload image to Cloudinary

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
