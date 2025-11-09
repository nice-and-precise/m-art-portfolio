# M_ART Testing Checklist

**Date**: 2025-11-09
**Purpose**: Comprehensive manual testing checklist for all website features

## 🏠 Homepage Tests (https://m-art-portfolio.vercel.app)

### Visual Elements
- [ ] Hero section loads with parallax background
- [ ] Hero background images display correctly (pottery images)
- [ ] Site title "M_ART" is visible
- [ ] "View Gallery" button is visible
- [ ] Featured gallery section displays 6 pottery images
- [ ] Images have hover effects (zoom/border)
- [ ] About section with artist statement displays
- [ ] Specialties cards display correctly

### Interactive Elements
- [ ] "View Gallery" button navigates to `/gallery`
- [ ] "Explore My Work" button navigates to `/gallery`
- [ ] Parallax scrolling works smoothly
- [ ] Featured gallery images are clickable

### Mobile Tests (< 768px)
- [ ] Hero adapts to mobile viewport
- [ ] Featured gallery stacks vertically
- [ ] All text is readable
- [ ] Touch targets are large enough

---

## 🖼️ Gallery Page Tests (https://m-art-portfolio.vercel.app/gallery)

### Visual Elements
- [ ] Page title "Gallery" displays
- [ ] Piece count displays (e.g., "8 pieces of handcrafted ceramics")
- [ ] Filter controls visible (Filter by, Sort by)
- [ ] All 8 pottery images load correctly
- [ ] Masonry grid layout works
- [ ] Hover effects show piece titles

### Filters & Sorting
- [ ] "Filter by Collection" dropdown works
  - [ ] All Collections
  - [ ] Vases
  - [ ] Bowls
  - [ ] Sculptural
  - [ ] Functional
  - [ ] Decorative
  - [ ] Experimental
- [ ] "Sort by" dropdown works
  - [ ] Newest First
  - [ ] Title (A-Z)
  - [ ] Collection
- [ ] Piece count updates when filtered
- [ ] Grid updates immediately after filter change

### Lightbox
- [ ] Clicking image opens lightbox
- [ ] Lightbox shows full-size image
- [ ] Close button (×) works
- [ ] Clicking outside lightbox closes it
- [ ] Navigation arrows work (if multiple images)
- [ ] ESC key closes lightbox

### Mobile Tests
- [ ] Gallery grid adapts (1 column on mobile, 2-3 on tablet)
- [ ] Filters stack vertically
- [ ] Lightbox works on touch devices

---

## 🔐 Admin Login Tests (https://m-art-portfolio.vercel.app/admin/login)

### Login Page
- [ ] Page displays "Admin Login" title
- [ ] Password input field visible
- [ ] "Login" button visible
- [ ] Default password hint shows "admin123"

### Authentication
- [ ] **CORRECT PASSWORD TEST**: Enter `admin123`
  - [ ] Redirects to `/admin/dashboard`
  - [ ] No error messages
  - [ ] Dashboard loads successfully

- [ ] **INCORRECT PASSWORD TEST**: Enter `wrongpassword`
  - [ ] Shows error message (red background)
  - [ ] Error: "Invalid password"
  - [ ] Stays on login page

### Mobile Tests
- [ ] Login form works on mobile
- [ ] Password input has proper type
- [ ] Touch targets are accessible

---

## 📊 Admin Dashboard Tests (https://m-art-portfolio.vercel.app/admin/dashboard)

**Prerequisites**: Must be logged in first

### Dashboard Display
- [ ] Page title "Admin Dashboard" displays
- [ ] "New Piece" button visible
- [ ] Grid of existing pieces loads
- [ ] Each piece shows:
  - [ ] Image
  - [ ] Title
  - [ ] Collection name
  - [ ] "Delete" button
  - [ ] "Featured" badge (if featured)

### Upload New Piece
- [ ] Click "New Piece" button
- [ ] Upload form appears
- [ ] Form has all fields:
  - [ ] Image file input
  - [ ] Title input
  - [ ] Description textarea
  - [ ] Collection dropdown
  - [ ] Featured checkbox
- [ ] File input accepts images
- [ ] **Mobile**: File input shows camera option
- [ ] Submit button shows "Upload Piece"

### Upload Functionality
- [ ] Select an image file
- [ ] Fill in title (e.g., "Test Vase")
- [ ] Fill in description (optional)
- [ ] Select collection
- [ ] Check/uncheck featured
- [ ] Click "Upload Piece"
- [ ] Loading state shows "Uploading..."
- [ ] Upload completes successfully
- [ ] New piece appears in grid
- [ ] Form closes automatically

### Delete Functionality
- [ ] Click "Delete" on any piece
- [ ] Confirmation dialog appears
- [ ] Click "OK" in confirmation
- [ ] Piece is removed from grid
- [ ] No error messages

### Error Handling
- [ ] Try uploading without image → shows error
- [ ] Try uploading without title → shows error
- [ ] Network errors show clear messages

---

## 🔍 Image Loading Tests

### Unsplash Images
All pages should load images from Unsplash:
- [ ] Homepage hero background
- [ ] Homepage featured gallery (6 images)
- [ ] Gallery page (8 images)
- [ ] Admin dashboard (all uploaded pieces)

### Image Error Checks
Open Chrome DevTools (F12) → Console:
- [ ] No 404 errors for images
- [ ] No CORS errors
- [ ] No "Failed to load resource" errors

### Image Optimization
Check Network tab in DevTools:
- [ ] Images use Next.js optimization
- [ ] Images load in WebP/AVIF format
- [ ] Appropriate image sizes served (not loading 4K on mobile)

---

## 🔗 Navigation Tests

### Header/Navigation (if exists)
- [ ] Logo/site name links to homepage
- [ ] Navigation menu works
- [ ] All links navigate correctly

### Footer (if exists)
- [ ] Social media links work
- [ ] Contact information displays
- [ ] All footer links navigate correctly

### Cross-Page Navigation
- [ ] Homepage → Gallery works
- [ ] Gallery → Homepage works
- [ ] Any page → Admin login works
- [ ] Browser back button works
- [ ] Browser forward button works

---

## 📱 Mobile Responsiveness Tests

Test on actual mobile device or Chrome DevTools (F12) → Device Toolbar:

### iPhone 13 (390x844)
- [ ] Homepage looks good
- [ ] Gallery works
- [ ] Admin dashboard is usable
- [ ] No horizontal scrolling
- [ ] All text is readable
- [ ] Buttons are tappable

### iPad (810x1080)
- [ ] Homepage adapts to tablet
- [ ] Gallery shows 2-3 columns
- [ ] Admin dashboard is efficient

### Desktop (1920x1080)
- [ ] Homepage uses full width appropriately
- [ ] Gallery shows 3-4 columns
- [ ] No wasted space

---

## ⚡ Performance Tests

### Page Load Speed
- [ ] Homepage loads in < 3 seconds
- [ ] Gallery loads in < 3 seconds
- [ ] Admin dashboard loads in < 3 seconds
- [ ] Images load progressively (blur → sharp)

### Lighthouse Scores (Chrome DevTools → Lighthouse)
Run on homepage:
- [ ] Performance: > 80
- [ ] Accessibility: > 90
- [ ] Best Practices: > 90
- [ ] SEO: > 90

---

## 🛡️ Security Tests

### Authentication
- [ ] Cannot access `/admin/dashboard` without login
- [ ] Redirects to login if not authenticated
- [ ] Session persists after page refresh
- [ ] Logout works (if logout button exists)

### API Security
Open DevTools → Network → try these URLs directly:
- [ ] `/api/pieces` - Should work (public)
- [ ] `/api/pieces` POST - Should require auth (401)
- [ ] `/api/pieces/[id]` DELETE - Should require auth (401)
- [ ] `/api/upload` POST - Should require auth (401)

---

## ❌ Known Issues to Check

### Critical (Must Fix)
- [ ] ~~Gallery 404 error~~ (check if fixed)
- [ ] ~~Image errors in console~~ (check if fixed)
- [ ] ~~Delete functionality failing~~ (check if fixed)

### Minor (Nice to Fix)
- [ ] Lightbox close button sometimes hard to click
- [ ] Mobile upload button might be small
- [ ] Featured pieces might not stand out enough

---

## 📋 Test Results Summary

**Date Tested**: __________
**Tester**: __________
**Browser**: __________
**Device**: __________

**Total Tests**: ~80
**Passed**: ____ / 80
**Failed**: ____ / 80
**Skipped**: ____ / 80

### Critical Issues Found:
1.
2.
3.

### Minor Issues Found:
1.
2.
3.

### Notes:


---

## 🚀 Quick Test (5 minutes)

If you only have 5 minutes, test these critical paths:

1. **Homepage Loads**
   - Visit https://m-art-portfolio.vercel.app
   - Images load? ✓ / ✗
   - Parallax works? ✓ / ✗

2. **Gallery Works**
   - Click "View Gallery"
   - All images load? ✓ / ✗
   - Filters work? ✓ / ✗

3. **Admin Login**
   - Visit /admin/login
   - Login with `admin123` ✓ / ✗
   - Dashboard shows pieces? ✓ / ✗

4. **Delete Piece**
   - Click delete on any piece ✓ / ✗
   - Piece disappears? ✓ / ✗

If all 4 critical paths pass, the site is working!
