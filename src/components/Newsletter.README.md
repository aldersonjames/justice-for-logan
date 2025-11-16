# Newsletter Component

A conversion-optimized, GDPR-compliant newsletter signup component for the Justice for Logan website, integrated with Netlify Forms.

## Features

- **Email Validation**: Real-time validation with clear error messages
- **Netlify Forms Integration**: Seamless form submission handling
- **Spam Protection**: Built-in honeypot field
- **Success/Error States**: Visual feedback for all submission states
- **GDPR Compliant**: Privacy notice and unsubscribe information
- **Responsive Design**: Works on all screen sizes
- **Accessible**: ARIA labels and screen reader support
- **Three Variants**: Default, Dark, and Compact styles
- **Conversion Optimized**: Trust indicators and minimal friction

## Usage

### Basic Import

```jsx
import Newsletter from './components/Newsletter'

function MyPage() {
  return (
    <div>
      <Newsletter />
    </div>
  )
}
```

### Available Variants

#### 1. Default Variant (Light Gradient)

Perfect for standalone sections or full-width placements.

```jsx
<Newsletter variant="default" />
```

**Best used in:**
- Dedicated newsletter sections
- Between content blocks
- Landing pages

#### 2. Dark Variant

Designed for dark backgrounds like footers or hero sections.

```jsx
<Newsletter variant="dark" />
```

**Best used in:**
- Footer sections
- Dark hero sections
- Dark-themed pages

#### 3. Compact Variant

Clean white background for sidebars or inline placements.

```jsx
<Newsletter variant="compact" />
```

**Best used in:**
- Sidebars
- Inline with content
- Minimal design contexts

### Custom Styling

Add custom classes via the `className` prop:

```jsx
<Newsletter
  variant="default"
  className="max-w-md mx-auto shadow-2xl"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'dark' \| 'compact'` | `'default'` | Visual style variant |
| `className` | `string` | `''` | Additional CSS classes |

## Component States

The component handles four states:

1. **Idle**: Initial state, ready for input
2. **Submitting**: Form is being submitted (shows loading spinner)
3. **Success**: Submission successful (shows success message, disables form)
4. **Error**: Submission failed (shows error message, keeps form enabled)

## Netlify Forms Setup

### Automatic Detection

The component is pre-configured for Netlify Forms. When you deploy to Netlify:

1. Netlify automatically detects the form (via `data-netlify="true"`)
2. Form submissions appear in your Netlify Dashboard under "Forms"
3. No additional configuration needed!

### Accessing Submissions

1. Log in to your Netlify Dashboard
2. Go to your site
3. Click "Forms" in the navigation
4. View all newsletter submissions

### Email Notifications

Set up email notifications for new submissions:

1. Go to Site Settings > Forms
2. Click "Form notifications"
3. Add notification emails
4. Configure notification format

### Integrations

Connect to your email marketing service:

- **Mailchimp**: Use Netlify's Mailchimp integration
- **Zapier**: Set up a Zap to trigger on form submission
- **Custom Webhooks**: Configure in Netlify Forms settings

## Design System

The component uses the Justice for Logan design system:

### Colors

- **Primary Pink**: `#FF69B4` - Main brand color
- **Secondary Teal**: `#004C54` - Eagles Midnight Green
- **Accent colors**: Various shades for different states

### Typography

- **Display Font**: Montserrat (headings)
- **Body Font**: Inter (body text)
- **Serif Font**: Playfair Display (quotes)

### Spacing

Uses Tailwind's spacing scale with responsive breakpoints:
- Mobile: Compact padding
- Tablet: Medium padding
- Desktop: Comfortable padding

## Accessibility

The component follows WCAG 2.1 Level AA guidelines:

- Semantic HTML with proper form labels
- ARIA labels for screen readers
- Keyboard navigation support
- Focus indicators
- Error messages with `role="alert"`
- Disabled state handling

## Security

### Spam Protection

The component includes a honeypot field that's hidden from users but visible to bots:

```jsx
<div className="hidden">
  <label>
    Don't fill this out if you're human: <input name="bot-field" />
  </label>
</div>
```

### Email Validation

Client-side validation using regex:

```javascript
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

### GDPR Compliance

- Clear privacy notice
- Link to privacy policy
- Information about data usage
- Unsubscribe information

## Examples

### In Footer

```jsx
<footer className="bg-gray-900">
  <div className="max-w-7xl mx-auto px-4 py-12">
    {/* Newsletter at top of footer */}
    <Newsletter variant="dark" />

    {/* Rest of footer content */}
    <div className="mt-12">
      {/* Footer links, copyright, etc. */}
    </div>
  </div>
</footer>
```

### Between Content Sections

```jsx
<article>
  {/* Main content */}
  <section>
    <h2>About Logan</h2>
    <p>Content here...</p>
  </section>

  {/* Newsletter signup */}
  <div className="my-16 max-w-2xl mx-auto">
    <Newsletter variant="default" />
  </div>

  {/* More content */}
  <section>
    <h2>Advocacy</h2>
    <p>More content...</p>
  </section>
</article>
```

### In Sidebar

```jsx
<div className="grid md:grid-cols-4 gap-8">
  {/* Main content */}
  <div className="md:col-span-3">
    <article>{/* Article content */}</article>
  </div>

  {/* Sidebar */}
  <aside className="md:col-span-1">
    <Newsletter variant="compact" />
  </aside>
</div>
```

## Customization

### Modifying Text

Edit the component file to change:
- Heading text
- Description text
- Button text
- Privacy notice

### Adding Fields

To add more fields (e.g., name):

1. Add the input field to the form
2. Add it to the `formData` object
3. Update Netlify form detection by redeploying

### Changing Behavior

Modify the `handleSubmit` function to:
- Add analytics tracking
- Show different success messages
- Redirect after submission
- Clear form differently

## Testing

### Manual Testing Checklist

- [ ] Enter invalid email → Shows error
- [ ] Enter valid email → Submits successfully
- [ ] Success state shows and auto-clears after 5 seconds
- [ ] Form disables during submission
- [ ] Honeypot field is hidden
- [ ] Privacy policy link works
- [ ] Responsive on mobile, tablet, desktop
- [ ] Keyboard navigation works
- [ ] Screen reader announces states

### Test in Netlify Dev

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run local dev server with Netlify Forms
netlify dev
```

This enables Netlify Forms locally for testing.

## Troubleshooting

### Form not appearing in Netlify Dashboard

1. Check that `data-netlify="true"` is present
2. Ensure form has a unique `name` attribute
3. Redeploy your site
4. Check Netlify build logs for form detection

### Submissions not working

1. Check browser console for errors
2. Verify Netlify Forms is enabled for your site
3. Test with Netlify Dev locally
4. Check that the form isn't blocked by ad blockers

### Styling issues

1. Ensure Tailwind is properly configured
2. Check that custom colors are in `tailwind.config.js`
3. Verify the component is inside your app's style scope

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Mobile

## Performance

- Lightweight: No external dependencies
- Fast load: Uses system fonts as fallbacks
- Optimized: React hooks for state management
- Minimal re-renders: Only updates on state changes

## License

Part of the Justice for Logan website. All rights reserved.

## Support

For questions or issues with this component:
1. Check this README
2. Review the NewsletterExample.jsx file
3. Check Netlify Forms documentation
4. Contact the development team

---

**Component Version**: 1.0.0
**Last Updated**: November 2025
**Maintained By**: Justice for Logan Development Team
