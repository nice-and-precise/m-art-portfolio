# Gallery Page

<!-- Status: ✅ LIVE | Last updated: 2025-11-08 -->

## What IS
Masonry grid gallery with filtering, sorting, and lightbox viewer.

## Components
- `MasonryGrid`: Pinterest-style layout for pottery images
- `FilterBar`: Dropdown filters (collection, color, technique)
- `SortControls`: Sort by date/title/featured
- `Lightbox`: Full-screen image viewer with prev/next

## Design
- **Grid**: Masonry (varying heights), 1/2/3 columns responsive
- **Filters**: Horizontal bar, dropdown buttons
- **Lightbox**: Dark overlay, centered image, close/nav buttons

## Route
- `/gallery` - Main gallery page
- Query params: `?collection=vases&sort=date`

## Data Needs
- All pottery pieces from data/pottery.json
- Collections list (unique values)
- Image URLs from Cloudinary

## Interactions
- Click card → Open lightbox
- Filter/sort → Update URL query params
- Arrow keys → Navigate lightbox
- ESC → Close lightbox

## Mobile Behavior
- Grid: 1 column on mobile
- Filters: Collapsible on mobile
- Lightbox: Full screen, swipe navigation
