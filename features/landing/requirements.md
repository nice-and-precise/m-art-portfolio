# Landing Page

<!-- Status: ✅ LIVE | Last updated: 2025-11-08 -->

## What IS
Full-screen hero landing page with featured pottery gallery.

## Components
- `Hero`: Full viewport height, pottery background image, artist name, tagline
- `FeaturedGallery`: Grid of 6 featured pieces (responsive: 2/3/3 cols)
- `About`: Artist bio section with photo
- `Navigation`: Sticky header with logo + links

## Design
- **Hero**: Background image with dark overlay, centered white text
- **Colors**: clay-500 (terracotta) accents, clay-50 background
- **Typography**: Large serif for artist name, sans-serif body
- **Animations**: Fade-in on scroll, smooth transitions

## Route
- `/` - Landing page (src/app/page.tsx)

## Data Needs
- Featured pottery pieces (filter where `featured: true`)
- Artist bio text
- Hero background image URL

## Mobile Behavior
- Hero: Full screen on mobile
- Gallery: 1 column on mobile, 2 on tablet, 3 on desktop
- Navigation: Hamburger menu on mobile
