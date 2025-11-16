# Blog/Updates Component Documentation

## Overview
The BlogUpdates component displays advocacy updates, news, family updates, and legislative progress for the Justice for Logan website. It's designed to be easy to use and maintain.

## Files
- **Component**: `/src/components/BlogUpdates.jsx`
- **Data**: `/src/data/blog-posts.json`

## Adding to Your App

To use the BlogUpdates component in your app, add it to your `App.jsx`:

```jsx
import BlogUpdates from './components/BlogUpdates'

function App() {
  return (
    <div>
      {/* ... other components ... */}
      <BlogUpdates />
      {/* ... other components ... */}
    </div>
  )
}
```

Don't forget to add a navigation link in your menu:
```jsx
<a href="#blog" className="nav-link">Updates</a>
```

## Features

### 1. Category Filtering
Posts can be filtered by:
- All Updates
- Advocacy
- News
- Family Updates
- Legislation

### 2. Markdown Support
Blog post content supports full markdown formatting including:
- Headings (# ## ###)
- Bold and italic text
- Lists (ordered and unordered)
- Links
- Blockquotes

### 3. Expandable Posts
- Posts show title, date, author, category, excerpt, and featured image placeholder
- Click "Read More" to expand and see full content
- Click "Show Less" to collapse

### 4. Social Sharing
Each expanded post includes share buttons for:
- Copy link to clipboard
- Facebook
- X (Twitter)

### 5. Responsive Design
- Fully responsive on mobile, tablet, and desktop
- Touch-friendly buttons and interactions
- Optimized typography for all screen sizes

## Adding New Blog Posts

To add a new blog post, edit `/src/data/blog-posts.json` and add a new entry:

```json
{
  "id": 6,
  "title": "Your Post Title",
  "slug": "your-post-slug",
  "date": "2025-11-15",
  "category": "advocacy",
  "author": "Your Name",
  "excerpt": "A brief summary of your post (1-2 sentences)",
  "featuredImage": null,
  "content": "# Full Post Content\n\nWrite your full post content here using Markdown syntax.\n\n## Subheading\n\nMore content...\n\n- List item 1\n- List item 2"
}
```

### Field Descriptions

- **id**: Unique number (increment from last post)
- **title**: Main headline of the post
- **slug**: URL-friendly version of title (lowercase, hyphens)
- **date**: Publication date in YYYY-MM-DD format
- **category**: One of: "advocacy", "news", "family updates", "legislation"
- **author**: Name of the author
- **excerpt**: Short summary displayed on the card
- **featuredImage**: URL to image or `null` for placeholder
- **content**: Full post content in Markdown format

### Markdown Tips

**Headings:**
```markdown
# Main Heading (H1)
## Subheading (H2)
### Smaller Heading (H3)
```

**Formatting:**
```markdown
**bold text**
*italic text*
```

**Lists:**
```markdown
- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2
```

**Links:**
```markdown
[Link text](https://example.com)
```

**Line Breaks:**
Use `\n\n` for paragraph breaks in the JSON string.

## Color Scheme

The component uses the Justice for Logan brand colors:

- **Primary Pink**: #FF69B4 (Logan Pink)
- **Secondary Green**: #004C54 (Eagles Midnight Green)
- **Accent Colors**: Various shades for categories
  - Advocacy: Primary Pink
  - News: Secondary Green
  - Family Updates: Pink-500
  - Legislation: Blue-600

## Customization

### Changing Category Colors

In `BlogUpdates.jsx`, find the `getCategoryColor` function:

```javascript
const getCategoryColor = (category) => {
  const categoryMap = {
    'advocacy': 'bg-primary text-white',
    'news': 'bg-secondary text-white',
    'family updates': 'bg-pink-500 text-white',
    'legislation': 'bg-blue-600 text-white'
  }
  return categoryMap[category] || 'bg-gray-500 text-white'
}
```

### Changing Featured Image Placeholder Icons

In the component, find the featured image section and update emojis:

```javascript
{post.category === 'advocacy' && '📣'}
{post.category === 'news' && '📰'}
{post.category === 'family updates' && '💜'}
{post.category === 'legislation' && '⚖️'}
```

### Adding Featured Images

To add an actual image to a post:

1. Add the image to `/src/assets/blog/`
2. Update the post's `featuredImage` field:
   ```json
   "featuredImage": "/src/assets/blog/my-image.jpg"
   ```

## Best Practices

### Writing Post Content

1. **Be Clear and Concise**: Use simple language that everyone can understand
2. **Use Headings**: Break up long posts with descriptive headings
3. **Add Links**: Link to sources, related articles, or action items
4. **Include Calls to Action**: End with clear next steps for readers
5. **Keep Excerpts Short**: 1-2 sentences maximum for the excerpt

### Post Frequency

- Post regular updates to keep supporters engaged
- Aim for at least 1-2 posts per month
- Post immediately after major events or developments

### Categories Usage

- **Advocacy**: Rallies, campaigns, grassroots organizing
- **News**: Media coverage, press releases, public attention
- **Family Updates**: Personal messages, memories, family events
- **Legislation**: Bills, hearings, legal developments, policy changes

## Troubleshooting

### Posts Not Showing Up
1. Check that the JSON is valid (no syntax errors)
2. Ensure the date format is YYYY-MM-DD
3. Verify the category matches exactly (case-sensitive)

### Formatting Issues
1. Remember to use `\n` for line breaks in JSON strings
2. Escape special characters like quotes with backslash
3. Test markdown formatting in a markdown preview tool first

### Share Buttons Not Working
- The share buttons use the current page URL
- For Facebook/X sharing to work properly, the site must be publicly accessible

## Support

For questions or issues with the BlogUpdates component, contact the development team or refer to the React and react-markdown documentation:

- [React Markdown Documentation](https://github.com/remarkjs/react-markdown)
- [Markdown Guide](https://www.markdownguide.org/)
