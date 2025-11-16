# Press Kit Assets Directory

This directory should contain all downloadable press kit materials for the Justice for Logan website.

## Directory Structure

```
press-kit/
├── README.md (this file)
├── thumbnails/               # Thumbnail images for previews
│   ├── logan-portrait-thumb.jpg
│   ├── logan-family-thumb.jpg
│   ├── stephen-federico-thumb.jpg
│   ├── fact-sheet-thumb.jpg
│   ├── stats-thumb.jpg
│   ├── press-release-thumb.jpg
│   ├── quotes-thumb.jpg
│   ├── logo-color-thumb.png
│   ├── logo-white-thumb.png
│   ├── brand-thumb.jpg
│   └── complete-thumb.jpg
├── logan-portrait.jpg        # High-res portrait (3000x4000px)
├── logan-family.jpg          # Family photo (4000x3000px)
├── stephen-federico.jpg      # Stephen's press photo (3000x3000px)
├── case-overview.pdf         # Case fact sheet
├── bail-reform-stats.pdf     # Statistics document
├── press-release-initial.pdf # Initial press release
├── press-release-reform.pdf  # Legislative reform announcement
├── stephen-quotes.pdf        # Approved quotes collection
├── logo-color.png            # Full color logo (2000x2000px, transparent)
├── logo-white.png            # White logo for dark backgrounds
├── brand-guidelines.pdf      # Complete brand guide
└── justice-for-logan-complete-press-kit.zip  # All materials bundled
```

## Asset Requirements

### High-Resolution Photos
- Format: JPG
- Minimum resolution: 3000px on shortest side
- Color space: sRGB
- Maximum file size: 10 MB

### Thumbnails
- Format: JPG or PNG
- Dimensions: 400x300px (landscape) or 300x400px (portrait)
- File size: < 200 KB

### PDFs
- Format: PDF
- Embedded fonts
- High-quality print resolution (300 DPI)
- File size: Optimized for web when possible

### Logos
- Format: PNG with transparency
- Dimensions: 2000x2000px minimum
- Include versions for light and dark backgrounds

## Adding New Assets

1. Place high-resolution files in the main press-kit directory
2. Create corresponding thumbnails in the thumbnails subdirectory
3. Update the PressKit.jsx component to include new items in the pressKitItems array
4. Test download functionality locally

## Photo Credits

All photos should be credited as "Courtesy of the Federico Family" when used by media.

## Usage Rights

Materials in this press kit are provided for editorial and news coverage purposes only. Commercial use is not permitted without explicit written permission.

## Contact

For questions about press kit materials or to request additional assets:
- Email: media@justiceforlogan.org
- Website: https://justiceforlogan.org
