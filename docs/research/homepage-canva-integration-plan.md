# Homepage Canva Integration Plan

**Date**: 2025-11-09
**Goal**: Replace generic Unsplash images with Molly Anne's actual Canva portfolio slides

## Current State Analysis

### Hero Section
- **Main Background**: Generic Unsplash pottery image
- **Floating Element 1** (top-left): Generic Unsplash pottery
- **Floating Element 2** (bottom-right): Generic Unsplash vase
- **Issue**: Generic stock photos don't showcase Molly's actual work

### Featured Gallery
- Pulls from database (real pottery pieces)
- **Status**: ✅ Already using real work, no changes needed

### About Section (Homepage)
- Generic text about the artist
- **Opportunity**: Could showcase galaxy glaze collection

## Integration Strategy

### Phase 1: Hero Background Replacement
**Replace**: Generic Unsplash pottery background
**With**: Canva Slide 1 (Portfolio cover)
**URL**: `https://res.cloudinary.com/dfrzq3gvh/image/upload/v1762721759/m-art/portfolio-journey/1.png`
**Rationale**:
- Professional portfolio cover created by artist
- Shows multiple pottery pieces
- Consistent with About page hero
- Establishes brand identity immediately

**Cloudinary Optimization**:
- Large format: `w_1920,q_85,f_auto`
- Mobile format: `w_768,q_80,f_auto`
- Use responsive srcset for performance

### Phase 2: Parallax Floating Elements
**Current**: Two generic Unsplash pottery images
**Strategy**: Use cropped galaxy glaze pottery from Slide 5

**Option A - Use Full Slide 5 Thumbnails**:
- Slide 5 URL: `https://res.cloudinary.com/dfrzq3gvh/image/upload/v1762721762/m-art/portfolio-journey/5.png`
- Crop specific pottery pieces using Cloudinary transformations
- **Element 1** (top-left): Crop left pottery piece
  - Transformation: `c_crop,w_600,h_600,x_100,y_200/w_400,q_80,f_auto`
- **Element 2** (bottom-right): Crop right pottery piece
  - Transformation: `c_crop,w_600,h_600,x_1200,y_200/w_400,q_80,f_auto`

**Option B - Use Entire Slide 5 as Visual Element**:
- Add a dedicated "Galaxy Glaze Showcase" section to homepage
- Display full slide 5 in About section
- Keep floating elements subtle/abstract

**Recommendation**: Option A - Extract specific pottery pieces for floating elements

### Phase 3: Homepage About Section Enhancement
**Add**: Galaxy glaze imagery to About section
**Implementation**:
- Add background image from Slide 5 (galaxy collection)
- Or add a visual callout box featuring galaxy glazes
- Link to About page for full journey

## Technical Implementation

### Cloudinary Transformations
```
Base URL: https://res.cloudinary.com/dfrzq3gvh/image/upload/

Hero Background:
- Desktop: /w_1920,q_85,f_auto,c_fill,g_center/v1762721759/m-art/portfolio-journey/1.png
- Tablet: /w_1024,q_80,f_auto,c_fill/v1762721759/m-art/portfolio-journey/1.png
- Mobile: /w_768,q_75,f_auto,c_fill/v1762721759/m-art/portfolio-journey/1.png

Floating Element 1 (sample - needs adjustment based on actual slide content):
- /c_crop,w_800,h_800,x_0,y_0,g_north_west/w_400,q_80,f_auto/v1762721762/m-art/portfolio-journey/5.png

Floating Element 2 (sample):
- /c_crop,w_800,h_800,g_south_east/w_400,q_80,f_auto/v1762721762/m-art/portfolio-journey/5.png
```

### Responsive Considerations
- Hero background: Use srcset for different screen sizes
- Floating elements: Hide on mobile (<768px) to reduce clutter
- Ensure text remains readable over new backgrounds
- Test gradient overlays for proper contrast

### Performance
- Use `f_auto` for automatic format (WebP/AVIF support)
- Lazy load floating elements (not critical for LCP)
- Priority load hero background
- Total size budget: Hero <300KB, Floating <50KB each

## Image Quality Checklist
- [ ] Hero background is sharp at 1920px width
- [ ] Pottery details visible in floating elements
- [ ] No pixelation on retina displays
- [ ] Proper aspect ratios maintained
- [ ] Colors accurate (not washed out)
- [ ] Text contrast sufficient (WCAG AA minimum)

## Testing Plan
1. **Visual Testing**:
   - Desktop (1920x1080, 2560x1440)
   - Tablet (768x1024, 1024x768)
   - Mobile (375x667, 414x896)

2. **Performance Testing**:
   - Lighthouse score (target: 90+ Performance)
   - LCP should be <2.5s
   - Check image load times

3. **Accessibility Testing**:
   - Text contrast ratios
   - Alt text descriptive
   - Responsive behavior

## Fallback Strategy
If Canva slide quality is insufficient:
1. Keep hero background as Slide 1 (high quality)
2. For floating elements: use solid colored pottery silhouettes or abstract shapes
3. Request high-res individual pottery photos from artist

## Success Metrics
✅ Homepage features actual artist's work (not stock photos)
✅ Visual consistency with About page
✅ Professional, cohesive brand identity
✅ Performance maintained (<3s load time)
✅ Mobile-optimized experience

---

**Next Steps**:
1. Test Slide 1 as hero background
2. Analyze Slide 5 for pottery extraction coordinates
3. Implement with Cloudinary transformations
4. Test across devices
5. Commit and deploy
