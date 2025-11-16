# AdvocacyToolkit Integration Guide

Quick guide for adding the Advocacy Toolkit component to your Justice for Logan website.

## Step 1: Import the Component

In your `App.jsx` or main layout file:

```jsx
import AdvocacyToolkit from './components/AdvocacyToolkit';
```

## Step 2: Add to Your Layout

Place the component where you want it in your page structure:

```jsx
function App() {
  return (
    <div className="App">
      <HeroSection />
      <AboutLogan />
      <Timeline />
      <Advocacy />
      <AdvocacyToolkit />  {/* Add here */}
      <MediaCoverage />
      <Testimonials />
      <EventsCalendar />
      <Newsletter />
      <Footer />
    </div>
  );
}
```

## Step 3: Add Navigation Link

In your navigation component or header:

```jsx
<nav>
  <a href="#about">About Logan</a>
  <a href="#advocacy">The Fight</a>
  <a href="#advocacy-toolkit">Advocacy Tools</a>  {/* Add this */}
  <a href="#media">Media</a>
  <a href="#events">Events</a>
</nav>
```

## Step 4: Link from Advocacy Section

Update the existing Advocacy.jsx component to link to the toolkit:

In `Advocacy.jsx`, find the "Get Template" link (around line 114) and update it:

```jsx
// Change this:
<a href="#" className="text-white hover:text-gray-100 underline text-sm font-medium">
  Get Template
</a>

// To this:
<a href="#advocacy-toolkit" className="text-white hover:text-gray-100 underline text-sm font-medium">
  Get Templates
</a>
```

## Step 5: Verify Dependencies

The component requires @heroicons/react. If not already installed:

```bash
npm install @heroicons/react --legacy-peer-deps
```

## Complete Example

Here's a complete `App.jsx` example:

```jsx
import { useState } from 'react';
import HeroSection from './components/HeroSection';
import AboutLogan from './components/AboutLogan';
import Timeline from './components/Timeline';
import Advocacy from './components/Advocacy';
import AdvocacyToolkit from './components/AdvocacyToolkit';
import MediaCoverage from './components/MediaCoverage';
import Testimonials from './components/Testimonials';
import EventsCalendar from './components/EventsCalendar';
import Newsletter from './components/Newsletter';
import Guestbook from './components/Guestbook';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-secondary">Justice for Logan</h1>
              <div className="flex gap-6">
                <a href="#about" className="nav-link">About</a>
                <a href="#timeline" className="nav-link">Timeline</a>
                <a href="#advocacy" className="nav-link">Take Action</a>
                <a href="#advocacy-toolkit" className="nav-link">Resources</a>
                <a href="#media" className="nav-link">Media</a>
                <a href="#events" className="nav-link">Events</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-20">
          <HeroSection />
          <AboutLogan />
          <Timeline />
          <Advocacy />
          <AdvocacyToolkit />
          <MediaCoverage />
          <Testimonials />
          <EventsCalendar />
          <Newsletter />
          <Guestbook />
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
```

## Optional Enhancements

### Add a Featured Tool on the Advocacy Page

In `Advocacy.jsx`, you could add a teaser for the toolkit:

```jsx
<div className="mt-12 text-center bg-white rounded-xl p-8 shadow-lg">
  <h3 className="text-2xl font-bold text-secondary mb-4">
    Need Help Getting Started?
  </h3>
  <p className="text-gray-700 mb-6">
    We've created ready-to-use templates for letters, social media posts,
    speeches, and more. Everything you need to advocate effectively.
  </p>
  <a
    href="#advocacy-toolkit"
    className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
  >
    Browse Advocacy Tools
  </a>
</div>
```

### Add to Footer Quick Links

In `Footer.jsx`:

```jsx
<div>
  <h4 className="font-bold mb-4">Take Action</h4>
  <ul className="space-y-2">
    <li><a href="#advocacy">Get Involved</a></li>
    <li><a href="#advocacy-toolkit">Advocacy Resources</a></li>
    <li><a href="#events">Upcoming Events</a></li>
    <li><a href="#newsletter">Stay Informed</a></li>
  </ul>
</div>
```

### Add Share Buttons to Each Template

You could enhance the component by adding social sharing:

```jsx
import { ShareIcon } from '@heroicons/react/24/outline';

// In the tool card actions section:
<button
  onClick={() => shareTemplate(tool)}
  className="flex items-center gap-2 bg-accent hover:bg-gray-400 text-white px-4 py-3 rounded-lg"
>
  <ShareIcon className="w-5 h-5" />
  Share
</button>
```

## Testing the Integration

1. **Visual Check**: Navigate to the toolkit section and verify all templates display correctly
2. **Copy Function**: Test the copy-to-clipboard button on each template
3. **Download Function**: Test downloading each template as a file
4. **Category Filter**: Verify filtering works for all categories
5. **Responsive**: Check on mobile, tablet, and desktop sizes
6. **Navigation**: Ensure smooth scrolling to the section
7. **Links**: Verify all external links (legislator directory) open correctly

## Troubleshooting

### "Module not found: @heroicons/react"
```bash
npm install @heroicons/react --legacy-peer-deps
```

### Copy to Clipboard doesn't work
- Ensure you're testing in a secure context (HTTPS or localhost)
- Check browser console for errors
- Verify browser supports Clipboard API

### Smooth scrolling not working
Add to your `index.css`:
```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* Height of fixed nav */
}
```

### Tailwind styles not applying
Ensure `tailwind.config.js` includes the component:
```js
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```

## Performance Considerations

- The component is ~1175 lines but renders efficiently
- Templates are stored in memory (no external API calls)
- Consider code splitting if bundle size is a concern:

```jsx
import { lazy, Suspense } from 'react';

const AdvocacyToolkit = lazy(() => import('./components/AdvocacyToolkit'));

// In your render:
<Suspense fallback={<div>Loading resources...</div>}>
  <AdvocacyToolkit />
</Suspense>
```

## Analytics Tracking

Consider adding event tracking:

```jsx
const copyToClipboard = async (text, id) => {
  try {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);

    // Track in analytics
    if (window.gtag) {
      window.gtag('event', 'copy_template', {
        template_id: id,
        template_category: tool.category
      });
    }

    setTimeout(() => setCopiedId(null), 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};
```

## Accessibility Checklist

- [ ] Keyboard navigation works for all buttons
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA
- [ ] Screen readers can access all content
- [ ] Alt text on icons (Heroicons handle this)
- [ ] Semantic HTML structure
- [ ] Skip links if needed for long content

## Next Steps

1. Add the component to your app
2. Test all functionality
3. Customize templates if needed
4. Add analytics tracking
5. Promote the toolkit on social media
6. Gather feedback from users
7. Iterate based on usage patterns

## Support

If you encounter issues, check:
- Browser console for errors
- Network tab for failed requests
- React DevTools for component state
- Tailwind configuration
- Dependencies are installed

---

**Ready to empower advocates!** The toolkit provides everything needed for effective criminal justice reform advocacy.
