# M_ART Deployment Guide

<!-- Last updated: 2025-11-08 -->

## Status
✅ **Build Complete** - Production build successful
⏸️ **Deployment Pending** - Waiting for Vercel login

## Quick Deploy

### Option 1: Vercel CLI (Recommended)
```bash
# Login to Vercel (first time only)
vercel login

# Deploy to production
vercel --prod
```

### Option 2: GitHub Integration (Easiest)
1. Push code to GitHub repository
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Vercel will auto-deploy on every push

## Environment Variables

Set these in Vercel Dashboard (Settings → Environment Variables):

```bash
CLOUDINARY_CLOUD_NAME=dfrzq3gvh
CLOUDINARY_API_KEY=313578916364477
CLOUDINARY_API_SECRET=ExrzMytQSER_i135n4MMCnD1O5w
JWT_SECRET=mhluSGqZExegozKoRmkeF23D46jGfqcwNZpwx2euq/E=
ADMIN_PASSWORD_HASH=$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LfKmQYqj6pZV6pVaG
NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
NEXT_PUBLIC_SITE_NAME=M_ART Ceramics
NEXT_PUBLIC_ARTIST_NAME=M_ART
```

## Build Configuration

Vercel auto-detects Next.js projects. Default settings:
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node Version**: 18.x

## Post-Deployment

1. **Test the site**: Visit your Vercel URL
2. **Admin login**: `/admin/login` (password: admin123)
3. **Upload test piece**: `/admin/dashboard`
4. **View gallery**: `/gallery`

## Production URL

After deployment, your site will be available at:
- `https://m-art-[random].vercel.app`
- Custom domain can be added in Vercel settings

## Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Ensure all dependencies are in package.json
- Review build logs in Vercel dashboard

### Images Not Loading
- Verify Cloudinary credentials
- Check CORS settings if needed
- Ensure image URLs are accessible

### Admin Can't Login
- Verify JWT_SECRET is set
- Check ADMIN_PASSWORD_HASH matches
- Test locally first: `npm run dev`
