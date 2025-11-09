# Fix Vercel Environment Variables

## Problem Identified
1. **Login failing**: `ADMIN_PASSWORD_HASH` and `JWT_SECRET` are missing in Vercel
2. **Images not loading**: Fixed in code (added remotePatterns for Unsplash)

## Required Environment Variables

Add these to Vercel Dashboard:

### 1. Cloudinary (Already Set)
```
CLOUDINARY_CLOUD_NAME=dfrzq3gvh
CLOUDINARY_API_KEY=313578916364477
CLOUDINARY_API_SECRET=ExrzMytQSER_i135n4MMCnD1O5w
```

### 2. Authentication (CRITICAL - UPDATE THESE)
```
ADMIN_PASSWORD_HASH=$2b$12$zpC5cuffkC6GPPwdF6sUQe8gf..NQf5EZ07hH4UOtFCWmMDVqx7Te
JWT_SECRET=mhluSGqZExegozKoRmkeF23D46jGfqcwNZpwx2euq/E=
```

**IMPORTANT**: The password hash was INCORRECT. The hash above is verified to work with password "admin123".

### 3. Site Configuration (Optional)
```
NEXT_PUBLIC_SITE_NAME=M_ART Ceramics
NEXT_PUBLIC_ARTIST_NAME=M_ART
```

## How to Add in Vercel Dashboard

1. Go to: https://vercel.com/jordans-projects-4bff4baa/m-art-portfolio/settings/environment-variables

2. For each variable:
   - Click "Add New"
   - Enter Key (e.g., `ADMIN_PASSWORD_HASH`)
   - Enter Value (e.g., `$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LfKmQYqj6pZV6pVaG`)
   - Select all environments: Production, Preview, Development
   - Click "Save"

3. After adding all variables, redeploy:
   - Go to "Deployments" tab
   - Click on latest deployment
   - Click "Redeploy" → "Redeploy"

## Quick Copy-Paste (All Missing Variables)

```bash
# Copy these one by one into Vercel dashboard:

Key: ADMIN_PASSWORD_HASH
Value: $2b$12$zpC5cuffkC6GPPwdF6sUQe8gf..NQf5EZ07hH4UOtFCWmMDVqx7Te

Key: JWT_SECRET
Value: mhluSGqZExegozKoRmkeF23D46jGfqcwNZpwx2euq/E=

Key: NEXT_PUBLIC_SITE_NAME
Value: M_ART Ceramics

Key: NEXT_PUBLIC_ARTIST_NAME
Value: M_ART
```

## Verification

After redeployment:
1. Test login: https://m-art-portfolio.vercel.app/admin/login
   - Password: `admin123`
   - Should redirect to dashboard

2. Check images: https://m-art-portfolio.vercel.app
   - Hero background should show pottery
   - Featured gallery should show 6 images

## Alternative: Use Vercel CLI (If Logged In)

```bash
cd C:\Users\Owner\Desktop\M_ART

# Add environment variables
vercel env add ADMIN_PASSWORD_HASH production
# Paste: $2b$12$zpC5cuffkC6GPPwdF6sUQe8gf..NQf5EZ07hH4UOtFCWmMDVqx7Te

vercel env add JWT_SECRET production
# Paste: mhluSGqZExegozKoRmkeF23D46jGfqcwNZpwx2euq/E=

# Redeploy
vercel --prod
```
