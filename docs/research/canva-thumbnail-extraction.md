# Canva Slide Thumbnail Extraction Research

**Date**: 2025-11-09
**Researcher**: Claude Code
**Purpose**: Assess feasibility of extracting individual pottery images from Canva presentation slides

## Overview

Analyzed 10 Canva slides uploaded to Cloudinary to determine if individual pottery images can be extracted for use in the gallery.

## Slide Breakdown

### Slide 1 - Cover Photo
- **Content**: Portfolio cover with multiple pottery pieces
- **Extraction Potential**: ⚠️ Low - composite image with text overlays

### Slide 2 - Sophomore Year Timeline
- **Content**: Timeline slide with pottery examples from 2023-2024
- **Extraction Potential**: ⚠️ Low-Medium - contains text, timeline graphics, and small pottery thumbnails
- **Individual Pieces**: Potentially 3-5 pottery pieces visible but embedded in design

### Slide 3 - Junior Year Timeline
- **Content**: Timeline slide with pottery examples from 2024-2025
- **Extraction Potential**: ⚠️ Low-Medium - similar to Slide 2, mixed with text/graphics
- **Individual Pieces**: Potentially 3-5 pottery pieces visible but embedded in design

### Slide 4 - Achievements/Awards
- **Content**: Three sections showing award-winning pieces
  1. Legacy Award - planter with flowers
  2. Paramount Art Show - Molly with artwork
  3. State Fair - bowl with pink flowers
- **Extraction Potential**: ⚠️ Medium - Contains clear pottery photos but mixed with award badges/text
- **Individual Pieces**: 2-3 pieces identifiable (planter, bowl)

### Slide 5 - Senior Year Galaxy Collection
- **Content**: Showcase of galaxy glaze pottery collection
- **Extraction Potential**: ✅ **HIGH** - Multiple clear, high-quality pottery images
- **Individual Pieces**: 4-6 stunning galaxy glaze pieces clearly visible
- **Quality**: Excellent - professional product photography style

### Slides 6-10
- **Status**: Not analyzed in detail
- **Recommendation**: Review individually for extraction potential

## Technical Considerations

### Extraction Challenges
1. **Embedded Text/Graphics**: Most slides have overlaid text, timeline graphics, or award badges
2. **Image Quality**: Dependent on original resolution of embedded photos
3. **Composition**: Many pieces are arranged in collages or layouts
4. **Background Removal**: May require manual editing to isolate pottery from slide backgrounds

### Extraction Methods
1. **Manual Screenshot/Crop**: Use image editing software (Photoshop, GIMP, Canva itself)
2. **Cloudinary Transformations**: Use Cloudinary's crop/transform features to extract regions
3. **AI Background Removal**: Use tools like remove.bg for clean extraction
4. **Re-upload Original Photos**: **Best option** - Ask artist for original high-res pottery photos

## Recommendations

### Immediate Actions
1. ✅ **Use Slide 5 (Galaxy Collection)**: This slide has the clearest, most extractable pottery images
   - Recommend manual extraction of 4-6 galaxy glaze pieces
   - High quality, professional photography
   - Would make excellent gallery additions

2. ⚠️ **Skip Timeline Slides (2, 3)**: Extraction would result in low-quality thumbnails
   - Too much text/graphic overlay
   - Pottery images are small within overall design
   - Not worth the effort vs. quality tradeoff

3. ⚠️ **Slide 4 (Awards)**: Possible but requires editing
   - Could extract 2 pieces (planter, bowl) with background removal
   - Medium priority

### Long-Term Solution
**Request Original Photos from Artist**

The best approach is to ask Molly Anne to provide:
- Original high-resolution pottery photos taken on her phone
- Direct camera uploads (not screenshots from presentations)
- Individual piece photos without text overlays
- Photos from the same sessions used in Canva slides

**Benefits**:
- Higher quality images
- No extraction/editing required
- Professional portfolio-grade images
- Better for gallery display and potential sales

## Conclusion

**Feasibility Rating**: ⚠️ **Low-Medium** for most slides, ✅ **High** for Slide 5

**Recommendation**:
1. Manually extract 4-6 pieces from Slide 5 (Galaxy Collection) for immediate gallery use
2. Contact artist for original high-res photos for a proper gallery update
3. Use Canva slides as portfolio journey content (as currently implemented) rather than primary gallery source

## Next Steps

- [ ] Extract galaxy glaze pieces from Slide 5 if needed
- [ ] Reach out to artist for original pottery photos
- [ ] Upload original photos via admin panel when available
- [ ] Replace any Canva-extracted images with high-res originals

---

**Note**: Canva slides are best used for storytelling (timeline, achievements) rather than as primary gallery image sources. They serve their purpose well in the About page journey section.
