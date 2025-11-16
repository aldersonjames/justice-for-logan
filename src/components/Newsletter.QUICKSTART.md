# Newsletter Component - Quick Start

## 30-Second Setup

### 1. Import the Component

```jsx
import Newsletter from './components/Newsletter'
```

### 2. Add to Your Page

```jsx
<Newsletter variant="default" />
```

### 3. That's it!

The component works immediately. For Netlify Forms integration, see below.

---

## Common Use Cases

### Add to Footer (Most Popular)

**File**: `src/components/Footer.jsx`

```jsx
import Newsletter from './Newsletter'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Add newsletter at top of footer */}
        <div className="mb-12">
          <Newsletter variant="dark" />
        </div>

        {/* Your existing footer content */}
      </div>
    </footer>
  )
}
```

### Add Between Page Sections

**File**: `src/App.jsx` or any page component

```jsx
import Newsletter from './components/Newsletter'

function App() {
  return (
    <>
      <HeroSection />
      <AboutSection />

      {/* Newsletter between sections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <Newsletter />
        </div>
      </section>

      <TestimonialsSection />
      <Footer />
    </>
  )
}
```

### Add to Sidebar

```jsx
<div className="grid md:grid-cols-4 gap-8">
  <main className="md:col-span-3">
    {/* Main content */}
  </main>

  <aside className="md:col-span-1">
    <Newsletter variant="compact" />
  </aside>
</div>
```

---

## Netlify Forms Setup (5 minutes)

### Step 1: Add Hidden Form to index.html

**File**: `index.html`

Add this before the closing `</body>` tag:

```html
<!-- Netlify Form Detection -->
<form name="newsletter" netlify netlify-honeypot="bot-field" hidden>
  <input type="text" name="bot-field" />
  <input type="email" name="email" />
</form>
```

### Step 2: Deploy

```bash
git add .
git commit -m "Add newsletter signup"
git push
```

### Step 3: Check Netlify Dashboard

1. Go to your site in Netlify
2. Click "Forms" in the sidebar
3. You should see "newsletter" form listed
4. Done! Submissions will appear here

---

## Variants

### Default (Light)
```jsx
<Newsletter variant="default" />
```
Best for: Light backgrounds, standalone sections

### Dark
```jsx
<Newsletter variant="dark" />
```
Best for: Footers, dark backgrounds, hero sections

### Compact
```jsx
<Newsletter variant="compact" />
```
Best for: Sidebars, inline placements, minimal designs

---

## Customization Examples

### Center on Page
```jsx
<div className="max-w-lg mx-auto">
  <Newsletter />
</div>
```

### Full Width
```jsx
<div className="w-full">
  <Newsletter />
</div>
```

### Add Custom Margin
```jsx
<Newsletter className="my-16" />
```

### Add Shadow
```jsx
<Newsletter className="shadow-2xl" />
```

---

## Email Notifications

### Get Notified of New Signups

1. Netlify Dashboard → Your Site → Forms
2. Click "Settings and usage"
3. Scroll to "Form notifications"
4. Click "Add notification"
5. Select "Email notification"
6. Enter your email
7. Choose notification format
8. Save

---

## View All Submissions

1. Netlify Dashboard → Your Site → Forms
2. Click "newsletter"
3. See all submissions with timestamps
4. Export as CSV if needed

---

## Testing Locally

```bash
# Install Netlify CLI (one time)
npm install -g netlify-cli

# Run with Netlify Forms enabled
netlify dev

# Visit http://localhost:8888
# Test the form
# View submissions in Netlify Dashboard
```

---

## Complete Footer Example

Here's a complete, copy-paste-ready footer integration:

```jsx
import Newsletter from './Newsletter'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-secondary/10 to-transparent rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter signup */}
        <div className="mb-12">
          <Newsletter variant="dark" />
        </div>

        {/* Footer content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-display font-bold mb-4 text-primary-light">
              Justice for Logan
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Honoring the life of Logan Federico and fighting for criminal justice reform.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary-light">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About Logan</a></li>
              <li><a href="#advocacy" className="text-gray-300 hover:text-white transition-colors">Take Action</a></li>
              <li><a href="#media" className="text-gray-300 hover:text-white transition-colors">Media Coverage</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary-light">Connect</h4>
            <div className="space-y-3 text-sm">
              <a href="#" className="flex items-center text-gray-300 hover:text-white transition-colors">
                <span className="mr-2">📘</span> Facebook
              </a>
              <a href="#" className="flex items-center text-gray-300 hover:text-white transition-colors">
                <span className="mr-2">📸</span> Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-gray-400 text-sm text-center">
            © {currentYear} Justice for Logan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
```

---

## Troubleshooting

### "Form not found" error
- Add the hidden form to `index.html`
- Redeploy your site
- Wait 1-2 minutes for propagation

### Submissions not appearing
- Check Netlify Dashboard → Forms
- Verify form name matches: `name="newsletter"`
- Test with `netlify dev` locally

### Styling looks broken
- Ensure Tailwind CSS is configured
- Check that component is inside styled layout
- Verify custom colors in `tailwind.config.js`

---

## Next Steps

1. ✅ Add component to your page
2. ✅ Add hidden form to index.html
3. ✅ Deploy to Netlify
4. ✅ Test submission
5. ✅ Set up email notifications
6. 📊 Connect to Mailchimp/ConvertKit (optional)
7. 📈 Track conversions with analytics (optional)

---

## Need More Help?

- **Full Documentation**: See `Newsletter.README.md`
- **Live Examples**: See `NewsletterExample.jsx`
- **Integration Guide**: See `NEWSLETTER_INTEGRATION_GUIDE.md`
- **Netlify Docs**: https://docs.netlify.com/forms/setup/

---

**Remember**: The component works immediately. Netlify Forms setup is only needed to receive submissions!
