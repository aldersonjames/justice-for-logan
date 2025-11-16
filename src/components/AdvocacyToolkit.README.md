# Advocacy Toolkit Component

A comprehensive advocacy resource center providing downloadable templates and tools for criminal justice reform advocacy.

## Overview

The Advocacy Toolkit component provides visitors with practical, ready-to-use templates for advocating for bail reform in South Carolina. It includes 10 different advocacy tools across multiple categories, each with copy-to-clipboard and download functionality.

## Features

- **10 Advocacy Tools** covering letters, social media, speaking, email campaigns, and media outreach
- **Category Filtering** - Filter tools by type (All, Letters, Social Media, Speaking, Email, Media)
- **Copy to Clipboard** - One-click copying of any template
- **Download as File** - Download templates as .txt files for offline use
- **Template Previews** - See a preview before copying or downloading
- **Responsive Design** - Works on all device sizes
- **Accessible** - Keyboard navigation and screen reader friendly

## Included Templates

### Letters (3 templates)
1. **State Legislator Letter Template** - Professional letter for state representatives
2. **Governor Letter Template** - Template for writing to the Governor
3. **Op-Ed / Letter to Editor** - Newspaper submission templates (short and long versions)

### Social Media (2 templates)
4. **Social Media Post Templates** - Ready-to-share content for Instagram, Facebook, Twitter/X, and LinkedIn
5. **Petition Sharing Script** - Templates for sharing petitions via email, text, and social media

### Speaking (3 templates)
6. **Discussion Talking Points** - Key facts and responses to common questions
7. **Public Hearing Comment** - 2-3 minute testimony for legislative hearings
8. **Door-Knocking / Canvassing Script** - Complete script for community outreach

### Email (1 template)
9. **Email Campaign Template** - Concise constituent emails with subject lines and follow-ups

### Media (1 template)
10. **Press Release Template** - Professional press release with media kit components

## Usage

### Basic Implementation

```jsx
import AdvocacyToolkit from './components/AdvocacyToolkit';

function App() {
  return (
    <div>
      <AdvocacyToolkit />
    </div>
  );
}
```

### With Navigation

```jsx
<nav>
  <a href="#advocacy-toolkit">Advocacy Resources</a>
</nav>

<AdvocacyToolkit />
```

## Component Structure

```
AdvocacyToolkit
├── Header Section
│   ├── Title & Description
│   └── Decorative Divider
├── Category Filter
│   └── Filter Buttons (All, Letters, Social, Speaking, Email, Media)
├── Tools Grid
│   └── Tool Cards (each with)
│       ├── Header (icon, title, description)
│       ├── Preview Box
│       └── Action Buttons (Copy, Download)
├── Additional Resources
│   ├── Social Media Graphics
│   ├── Legislator Directory
│   └── Fact Sheets
├── Call to Action
└── Tips Sections
    ├── Tips for Effective Advocacy
    └── How to Use These Templates
```

## Template Content Features

Each template includes:
- **Realistic, actionable content** - Not generic placeholders, but actual usable text
- **[Bracketed placeholders]** - Clear indicators for personalization
- **Professional tone** - Appropriate for official correspondence
- **Evidence-based arguments** - Statistics from credible sources
- **Clear calls to action** - Specific asks from recipients
- **Formatting guidance** - Tips for delivery and best practices

## Customization

### Modify Template Content

Edit the `advocacyTools` array in the component:

```jsx
const advocacyTools = [
  {
    id: 'unique-id',
    category: 'letters', // letters, social, speaking, email, media
    title: 'Template Title',
    icon: DocumentTextIcon, // Heroicon component
    description: 'Brief description',
    preview: 'First few lines...',
    content: `Full template content here...`,
    filename: 'download-filename.txt'
  },
  // ... more templates
];
```

### Add New Categories

Update the `categories` array:

```jsx
const categories = [
  { id: 'new-category', name: 'Category Name', icon: IconComponent }
];
```

### Change Colors

The component uses Tailwind CSS classes with the site's color scheme:
- `primary` - Logan Pink (#FF69B4)
- `secondary` - Eagles Midnight Green (#004C54)
- `primary-dark` - Dark Pink (#C71585)
- `secondary-dark` - Dark Teal (#00333A)

## Dependencies

- React 18+
- @heroicons/react 2.0+
- Tailwind CSS (configured with custom colors)

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Clipboard API support for copy functionality
- Blob API support for download functionality

## Accessibility

- Keyboard navigable
- ARIA labels on interactive elements
- Color contrast meets WCAG AA standards
- Focus indicators on all interactive elements
- Semantic HTML structure

## Best Practices for Users

The component includes built-in guidance:

1. **Tips for Effective Advocacy**
   - Personalize templates
   - Be specific about asks
   - Follow up on communications
   - Share advocacy efforts
   - Stay respectful

2. **How to Use Templates**
   - Copy or download
   - Replace placeholders
   - Add personal details
   - Review before sending
   - Keep records

## Integration with Other Components

Works well with:
- **Advocacy.jsx** - Main advocacy section (link from "Take Action" buttons)
- **Newsletter.jsx** - Subscribe for updates on advocacy campaigns
- **EventsCalendar.jsx** - Promote advocacy events and hearings

## Future Enhancements

Potential additions:
- Download all templates as a ZIP file
- Email templates directly from the component
- Social media sharing buttons
- Track which templates are most popular
- Multi-language support
- Video tutorials for using templates
- Success stories from users

## Performance

- Templates are stored in component state (no external API calls)
- Clipboard operations are async and non-blocking
- File downloads use Blob URLs (cleaned up after use)
- Filtered lists update instantly
- Lazy loading could be added for very large template libraries

## State Management

The component uses React hooks:
- `useState` for copied state and category filter
- Clipboard API for copying
- Blob API for downloading

## Error Handling

- Try/catch on clipboard operations
- Fallback for browsers without Clipboard API support
- Console logging for debugging

## SEO Considerations

- Semantic HTML structure
- Descriptive section ID for deep linking (`#advocacy-toolkit`)
- Clear headings hierarchy
- Meta-friendly content

## Analytics Recommendations

Consider tracking:
- Which templates are copied most
- Which templates are downloaded most
- Category filter usage
- Time spent on page
- External link clicks (legislator directory, etc.)

## Maintenance

When updating templates:
1. Ensure all [placeholders] are clearly marked
2. Verify statistics are current and cited
3. Test copy and download functionality
4. Review for tone and professionalism
5. Check formatting in preview boxes

## Legal Considerations

- Templates are provided as educational resources
- Users are responsible for personalizing and verifying content
- No guarantee of specific outcomes
- Encourage users to consult legal professionals for specific cases

## License

Part of the Justice for Logan website project.

## Support

For questions or issues with the component, contact the development team.
