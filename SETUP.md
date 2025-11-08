# Setup Guide - M_ART

Complete setup guide for M_ART art portfolio and gallery website.

## Quick Start (5 minutes)

```bash
# 1. Navigate to project
cd C:\Users\Owner\Desktop\M_ART

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env.local
# Edit .env.local with your values

# 4. Run development server
npm run dev

# 5. Open browser
# Navigate to http://localhost:3000
```

## Full Setup (20-30 minutes)

### 1. Prerequisites

**Required:**
- Node.js 18+ and npm 9+
- Git
- Text editor (VS Code recommended)

**Optional:**
- Vercel account (for deployment)
- GitHub account (for version control and MCP)
- Image editing software

### 2. Install Dependencies

```bash
# Navigate to project directory
cd C:\Users\Owner\Desktop\M_ART

# Install Node.js dependencies
npm install

# Set up git hooks (if using Husky)
npm run prepare
```

### 3. Environment Configuration

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local file
# Required variables:
# - NEXT_PUBLIC_SITE_NAME=M_ART
# - NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional (for future features):
# - NEXT_PUBLIC_GA_ID (Google Analytics)
# - Contact form API keys
# - CMS integration keys
```

**Important:** Next.js uses `.env.local` for local development (gitignored).

### 4. Add Your Artwork

```bash
# 1. Add images to public/images/
# Recommended structure:
# public/
#   images/
#     gallery/
#       artwork-1.jpg
#       artwork-2.jpg
#     thumbnails/
#       artwork-1-thumb.jpg
#       artwork-2-thumb.jpg

# 2. Create artwork data file (we'll set this up later)
# src/lib/artworks.ts
```

### 5. Verify Installation

```bash
# Run development server
npm run dev

# Should output:
# ▲ Next.js 14.x.x
# - Local:        http://localhost:3000
# - Ready in Xs

# In another terminal, run checks:
npm run lint       # Check linting
npm run type-check # Check TypeScript
npm test           # Run tests (when added)
```

## Development Workflow

### Daily Development

```bash
# Start development server (with hot reload)
npm run dev

# Run tests in watch mode (when tests are added)
npm run test:watch

# Check code quality
npm run lint

# Format code
npm run format
```

### Before Committing

```bash
# Validate everything
npm run validate

# Or let git hooks do it automatically
git add .
git commit -m "Your message"
# Pre-commit hooks run automatically
```

### Running Tests

```bash
# All tests (when configured)
npm test

# With coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Building for Production

```bash
# Create production build
npm run build

# Test production build locally
npm start

# Should output:
# ▲ Next.js 14.x.x
# - Local:        http://localhost:3000
# - Production build
```

## Adding Artwork

### Image Preparation

**Recommended specifications:**
- **Format:** WebP or AVIF (with JPG fallback)
- **Max dimensions:** 2000x2000px for detail views
- **Thumbnail size:** 400x400px
- **File size:** < 500KB for full size, < 100KB for thumbnails
- **Color profile:** sRGB
- **Resolution:** 72 DPI for web

**Optimization tools:**
- [Squoosh](https://squoosh.app/) - Free online image optimizer
- [ImageOptim](https://imageoptim.com/) - Mac app
- [TinyPNG](https://tinypng.com/) - Online PNG/JPG compressor

### Image Organization

```
public/images/
├── gallery/           # Full-size images
│   ├── painting-1.jpg
│   ├── painting-2.jpg
│   └── sculpture-1.jpg
├── thumbnails/        # Thumbnail images
│   ├── painting-1.jpg
│   ├── painting-2.jpg
│   └── sculpture-1.jpg
└── profile/           # Artist profile images
    └── artist.jpg
```

## Customization

### Update Site Information

Edit `.env.local`:
```bash
NEXT_PUBLIC_SITE_NAME=Your Artist Name
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

### Customize Colors

Edit `tailwind.config.ts` (when created):
```typescript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
      accent: '#your-color',
    }
  }
}
```

### Update Metadata

Edit `src/app/layout.tsx`:
```typescript
export const metadata = {
  title: 'Your Name - Artist',
  description: 'Your art description',
  // ... more metadata
}
```

## Deployment

### Vercel (Recommended)

**Automatic deployment:**
1. Push code to GitHub
2. Import repository in Vercel
3. Configure environment variables
4. Deploy automatically

```bash
# Using Vercel CLI
npm install -g vercel
vercel login
vercel

# Follow prompts for deployment
```

### Other Platforms

**Netlify:**
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 18+

**Custom Server:**
- Build: `npm run build`
- Start: `npm start`
- Port: 3000 (configurable)
- Requires Node.js 18+

## IDE Setup (VS Code)

### Recommended Extensions

Create `.vscode/extensions.json`:
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "oderwat.indent-rainbow",
    "christian-kohler.path-intellisense"
  ]
}
```

### VS Code Settings

Create `.vscode/settings.json`:
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## Troubleshooting

### npm install fails

```bash
# Clear cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Port 3000 already in use

```bash
# Find process using port 3000
# Windows:
netstat -ano | findstr :3000

# Kill process (replace PID)
taskkill /PID <PID> /F

# Or use different port
PORT=3001 npm run dev
```

### Images not loading

1. Check image path (should be relative to `public/`)
   - ✅ Correct: `/images/artwork.jpg`
   - ❌ Wrong: `public/images/artwork.jpg`
2. Verify image exists in `public/images/`
3. Check Next/Image component syntax
4. Ensure proper width/height or fill prop

### Build errors

```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build

# Check for TypeScript errors
npm run type-check

# Check for lint errors
npm run lint
```

### Git hooks not working

```bash
# Reinstall husky (if configured)
npm run prepare

# Make scripts executable (Unix/Mac)
chmod +x .husky/*
```

## Next Steps

### 1. Create Your First Gallery

```bash
# Create gallery data file
# src/lib/artworks.ts

# Add artwork images to public/images/gallery/

# Update gallery page
# src/app/gallery/page.tsx
```

### 2. Customize the Design

- Update colors in Tailwind config
- Customize layout components
- Add your branding/logo
- Adjust typography

### 3. Add Features

Consider adding:
- [ ] Contact form
- [ ] About page with bio
- [ ] Individual artwork detail pages
- [ ] Gallery filtering/categories
- [ ] Lightbox viewer
- [ ] Social media integration
- [ ] Newsletter signup
- [ ] Online shop integration

### 4. Optimize for SEO

- [ ] Add metadata to all pages
- [ ] Create sitemap
- [ ] Add robots.txt
- [ ] Implement structured data
- [ ] Add Open Graph images
- [ ] Configure analytics

### 5. Deploy to Production

- [ ] Push code to GitHub
- [ ] Deploy to Vercel/Netlify
- [ ] Configure custom domain
- [ ] Set up analytics
- [ ] Test on multiple devices

## Useful Commands Reference

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Run production build

# Code Quality
npm run lint         # Check linting
npm run lint:fix     # Fix lint issues
npm run format       # Format code
npm run type-check   # TypeScript check

# Testing (when configured)
npm test             # Run tests
npm run test:watch   # Watch mode
npm run test:coverage # With coverage

# Validation
npm run validate     # Run all checks
```

## Support Resources

**Documentation:**
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [CLAUDE.md](CLAUDE.md) - Project context
- [STANDARDS.md](STANDARDS.md) - Code standards

**Community:**
- [Next.js Discord](https://nextjs.org/discord)
- [Vercel Community](https://github.com/vercel/next.js/discussions)

## Getting Help

**Have questions?**
- Check documentation in `docs/`
- Review [CLAUDE.md](CLAUDE.md) for project context
- Ask Claude (with full project context)

**Found a bug?**
- Create detailed bug report
- Include steps to reproduce
- Share error messages

**Need a feature?**
- Define requirements in `features/[name]/requirements.md`
- Ask Claude to implement

---

**You're ready to build your art portfolio!** 🎨

Start by adding your artwork to `public/images/gallery/` and running `npm run dev`.
