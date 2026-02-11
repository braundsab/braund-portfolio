# Image Preparation Guide

## Overview

This guide helps you prepare and optimise images for your portfolio website to ensure fast loading times and great visual quality.

## Image Specifications

### Portfolio Images

**Thumbnails (main grid images):**
- Width: 1600-2000px
- Format: JPG
- Quality: 80-85%
- Target size: 300-500KB

**Gallery images (lightbox):**
- Width: 2000px maximum
- Format: JPG
- Quality: 80-85%
- Target size: 400-600KB

### Blog Images

- Width: 1200-1600px
- Format: JPG
- Quality: 80-85%
- Target size: 200-400KB

### About Page Images

- Profile photo: 800x800px (square)
- Format: JPG
- Quality: 85%
- Target size: 150-250KB

## Optimisation Methods

### Method 1: Adobe Lightroom (Recommended if you have it)

1. Select images to export
2. File > Export
3. Settings:
   - Format: JPEG
   - Quality: 80-85
   - Resize to Fit: Long Edge
   - Dimension: 2000 pixels
   - Resolution: 72 ppi
   - Sharpen For: Screen, Standard
4. Export to `/assets/images/portfolio/`

### Method 2: Preview (Mac - Built-in, Free)

1. Open image in Preview
2. Tools > Adjust Size
3. Settings:
   - Width: 2000 pixels
   - Resolution: 72 pixels/inch
   - ☑ Scale proportionally
   - Resample image: Lanczos
4. File > Export
5. Settings:
   - Format: JPEG
   - Quality slider: About 80%
6. Save to `/assets/images/portfolio/`

### Method 3: ImageOptim (Mac - Free)

Best used AFTER resizing with Preview:

1. Download: https://imageoptim.com/
2. Drag and drop images onto ImageOptim
3. It automatically compresses without quality loss
4. Saves 20-40% file size!

### Method 4: Adobe Photoshop

1. Image > Image Size
   - Width: 2000 pixels
   - Resolution: 72 ppi
   - Resample: Bicubic (best for reduction)
2. File > Export > Save for Web (Legacy)
   - Format: JPEG
   - Quality: 75-80
   - Optimised: ☑
   - Progressive: ☑
3. Save to `/assets/images/portfolio/`

## Batch Processing

If you have many images to process:

### Using Preview (Mac)

1. Select all images in Finder
2. Right-click > Open With > Preview
3. Select all thumbnails in Preview sidebar (Cmd+A)
4. Tools > Adjust Size (resizes all)
5. File > Export Selected Images
6. Choose format and quality
7. Save all at once

### Using Automator (Mac - Advanced)

Create a workflow:
1. Open Automator
2. New > Quick Action
3. Add "Scale Images" action
   - Size: 2000 pixels
   - Always show this action
4. Save as "Resize for Portfolio"
5. Right-click images > Quick Actions > Resize for Portfolio

## File Organisation

```
assets/images/
├── portfolio/
│   ├── project-name-main.jpg       # Main thumbnail
│   ├── project-name-detail-1.jpg   # Gallery image 1
│   ├── project-name-detail-2.jpg   # Gallery image 2
│   └── ...
├── blog/
│   ├── post-title-featured.jpg     # Featured image
│   ├── post-title-image-1.jpg      # Inline image
│   └── ...
└── about/
    └── profile.jpg                  # Your photo
```

**Naming conventions:**
- Use lowercase
- Use hyphens not spaces
- Be descriptive but concise
- Include project name for easy sorting

**Examples:**
- ✅ `tourism-bc-campaign-hero.jpg`
- ✅ `editorial-spread-01.jpg`
- ✅ `book-cover.jpg`
- ❌ `IMG_1234.jpg`
- ❌ `Final Version 2 edited.jpg`

## Recommended Workflow

### For Portfolio Items

1. **Select your best images** from Lightroom/Photos
2. **Export at full resolution** to a working folder
3. **Resize to 2000px wide** using preferred method
4. **Run through ImageOptim** (if available)
5. **Rename descriptively**: `project-name-01.jpg`
6. **Move to** `/assets/images/portfolio/`
7. **Update** `_data/portfolio.yml` with filenames

### For Writing Samples (as Images)

If your writing samples are PDFs exported as JPGs:

1. **Export from PDF** at 150-200 DPI
2. **Keep readable** - text should be clear
3. **Crop excess white space** if needed
4. **Resize to 1600px wide** maximum
5. **Higher quality** (85-90%) since text needs to be readable
6. **Name clearly**: `article-title-page-1.jpg`

### For Book Project Spreads

1. **Export spreads** from InDesign/PDF at 150 DPI
2. **Maintain aspect ratio** of actual spread
3. **Resize to 2000px wide**
4. **Quality 85%** (text must be readable)
5. **Name sequentially**: `book-spread-01.jpg`, `book-spread-02.jpg`

## Quality Checks

Before uploading, verify:

- [ ] Text is readable (for writing samples)
- [ ] Colours look accurate
- [ ] No compression artifacts
- [ ] File size under 600KB (ideally under 500KB)
- [ ] Image dimensions are 2000px wide or less
- [ ] Filenames are descriptive and lowercase

## Testing

After uploading to your site:

1. **Test on mobile** - Do images load quickly?
2. **Check quality** - Do they look sharp on screen?
3. **Monitor loading** - Use browser DevTools Network tab
4. **Lighthouse audit** - Run in Chrome DevTools for performance score

## Tools Reference

**Free:**
- Preview (Mac built-in)
- ImageOptim (Mac) - https://imageoptim.com/
- Squoosh (Web) - https://squoosh.app/

**Paid:**
- Adobe Lightroom - Best for photographers
- Adobe Photoshop - Most powerful
- Affinity Photo - One-time purchase alternative

## Troubleshooting

**Images look pixelated:**
- Export at higher resolution
- Use higher quality setting (85-90%)
- Check source image quality

**File sizes too large:**
- Reduce dimensions to 1600px
- Lower quality to 75%
- Run through ImageOptim
- Consider converting complex images to WebP (advanced)

**Images load slowly:**
- Target under 400KB per image
- Enable lazy loading (already implemented)
- Consider WebP format for future optimisation

**Colours look different on web:**
- Convert to sRGB colour space on export
- Check monitor calibration
- Test on multiple devices

## Pro Tips

1. **Keep originals** - Never delete your source files
2. **Batch process** - Do all images at once for consistency
3. **Test first** - Export one image, upload, check quality
4. **Progressive JPEG** - Enable for better perceived loading
5. **Alt text** - Describe images for accessibility
6. **Filename = alt text** - Use descriptive names

## Advanced: WebP Conversion (Optional)

For even better performance in the future:

```bash
# Install cwebp (via Homebrew on Mac)
brew install webp

# Convert images
cwebp -q 80 input.jpg -o output.webp

# Batch convert
for file in *.jpg; do cwebp -q 80 "$file" -o "${file%.jpg}.webp"; done
```

Note: Requires updating HTML to use `<picture>` element for fallbacks.

---

**Ready to optimise?**

Start with your best 3-6 portfolio pieces, then add more over time. Quality > Quantity!
