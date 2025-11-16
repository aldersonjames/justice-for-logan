# Deployment Guide

## ✅ Project Status: PRODUCTION READY

The project has been cleaned and organized for deployment to Netlify.

---

## 📁 What Was Cleaned

### Files Moved to `archive/` (not deployed):
- **33 documentation files** → `archive/docs/`
- **74 raw images (117MB)** → `archive/images-raw/pics/`
- **2 screenshots** → `archive/screenshots/`
- **Development files** → `archive/development/`
  - justice-for-logan.zip (26MB)
  - setup-github.sh
  - APP_INTEGRATION_EXAMPLE.jsx
  - CHANGES_SUMMARY.txt

### Files Kept for Production:
- `src/` - Source code
- `public/` - Static assets
- `netlify/` - Serverless functions
- `scripts/` - Build scripts
- Configuration files (package.json, netlify.toml, etc.)
- `.env.example` - Environment variable template
- `README.md` - Production documentation

---

## 🚀 Deploy to Netlify

### Prerequisites

1. **Create `.env` file** (copy from `.env.example`):
```bash
cp .env.example .env
```

2. **Configure environment variables** in `.env`:
```bash
# Required
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ADMIN_EMAIL=your-email@example.com

# Recommended
VITE_CALENDLY_URL=https://calendly.com/your-username
VITE_GOFUNDME_URL=https://www.gofundme.com/f/support-logan-federicos-family
VITE_PETITION_URL=https://change.org/your-petition

# Social Media
VITE_FACEBOOK_URL=https://facebook.com/your-page
VITE_INSTAGRAM_URL=https://instagram.com/your-account
VITE_TWITTER_URL=https://twitter.com/your-account

# Web Crawler (for serverless function)
CRAWLER_SEARCH_TERMS=Logan Federico,Justice for Logan
CRAWLER_EMAIL_RECIPIENT=admin@example.com
```

### Deployment Steps

#### Option 1: Deploy from Git Repository

1. **Push to GitHub** (if not already done):
```bash
git add .
git commit -m "Production ready deployment"
git push origin main
```

2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account
   - Select the `justice-for-logan` repository

3. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 20 (already set in netlify.toml)

4. **Add Environment Variables**:
   - Go to Site Settings → Environment Variables
   - Add all variables from your `.env` file
   - **Important**: Use the same variable names

5. **Deploy**:
   - Click "Deploy site"
   - Netlify will install dependencies and build

#### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Login to Netlify**:
```bash
netlify login
```

3. **Initialize site**:
```bash
netlify init
```

4. **Deploy**:
```bash
netlify deploy --prod
```

---

## 🔧 Post-Deployment Configuration

### 1. Configure Form Notifications

Go to: **Site Settings → Forms → Form notifications**

Set up email notifications for:
- `guestbook` - Visitor messages
- `media-submission` - User-submitted media coverage
- `media-booking` - Interview requests
- `newsletter` - Newsletter signups
- `memory-wall` - Memory submissions

### 2. Set Up Custom Domain (Optional)

Go to: **Site Settings → Domain management**
- Add custom domain: `justiceforlogan.com`
- Configure DNS records
- Enable HTTPS (automatic with Netlify)

### 3. Enable Scheduled Functions

The web crawler is configured to run daily at 9 AM UTC.

Verify in: **Site Settings → Functions**

---

## 📊 Build Information

- **Build time**: ~1.3 seconds
- **Total bundle size**: 866 kB (784 kB JS + 81 kB CSS)
- **Gzipped size**: 249 kB
- **Modules**: 938

### Build Warning

You may see a warning about chunk size (784 kB). This is expected for a comprehensive SPA with 14+ components. If needed, you can optimize later with code splitting.

---

## ✅ What's Included in Deployment

### Core Files:
- `index.html` - Entry point
- `dist/` - Built application (generated on deployment)
- `public/` - Static assets
- `netlify/functions/` - Serverless functions (crawler)
- `scripts/` - Build scripts (sitemap generator)

### Configuration:
- `package.json` - Dependencies
- `netlify.toml` - Netlify configuration
- `vite.config.js` - Build configuration
- `tailwind.config.js` - Styling configuration

### Excluded from Deployment (via .netlifyignore):
- `archive/` - Development files and documentation
- `src/` - Source files (compiled into dist/)
- `.github/`, `.specify/`, `.claude/` - Development tools
- Config files not needed in production

---

## 🔍 Verify Deployment

After deployment, check:

1. **Homepage loads** - Hero section, navigation
2. **All sections render** - 14 components visible
3. **Forms work** - Submit a test to guestbook
4. **Analytics tracking** - Check Google Analytics Real-Time
5. **Mobile responsive** - Test on phone/tablet
6. **Performance** - Run Lighthouse audit

---

## 📝 Environment Variables Checklist

Before deploying, ensure these are configured in Netlify:

- [ ] `VITE_GA_MEASUREMENT_ID` - Google Analytics
- [ ] `VITE_ADMIN_EMAIL` - Admin email
- [ ] `VITE_CALENDLY_URL` - Scheduling link (optional)
- [ ] `VITE_GOFUNDME_URL` - Fundraising campaign
- [ ] `VITE_PETITION_URL` - Petition link
- [ ] `VITE_FACEBOOK_URL` - Facebook page
- [ ] `VITE_INSTAGRAM_URL` - Instagram account
- [ ] `VITE_TWITTER_URL` - Twitter account
- [ ] `CRAWLER_SEARCH_TERMS` - Search terms for crawler
- [ ] `CRAWLER_EMAIL_RECIPIENT` - Crawler notification email

---

## 🆘 Troubleshooting

### Build Fails?

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

### Forms Not Working?

1. Check hidden forms in `index.html`
2. Verify `data-netlify="true"` attribute
3. Check form name matches hidden form
4. View submissions in Netlify dashboard → Forms

### Environment Variables Not Loading?

1. Ensure variables start with `VITE_` for client-side access
2. Redeploy after adding new variables
3. Check build logs for errors

### Crawler Not Running?

1. Check Netlify Functions logs
2. Verify `CRAWLER_SEARCH_TERMS` is set
3. Ensure scheduled function is enabled

---

## 📦 Deployment Size

**Before cleanup**: ~143 MB (with all docs, images, zips)
**After cleanup**: ~12 MB (production files only)

**Savings**: 131 MB (92% reduction)

---

## 🎯 Next Steps After Deployment

1. **Add real content**:
   - Replace placeholder images in components
   - Update biography text in AboutLogan
   - Add real testimonials, blog posts, events

2. **Configure services**:
   - Set up Google Analytics account
   - Create Calendly scheduling page
   - Launch GoFundMe campaign
   - Create Change.org petition

3. **Add images**:
   - Optimize images from `archive/images-raw/pics/`
   - Follow recommendations in `archive/docs/IMAGE_RECOMMENDATIONS.md`
   - Place optimized images in `public/images/`

4. **Monitor**:
   - Check analytics daily
   - Review form submissions
   - Monitor crawler for new media coverage

---

## 📚 Documentation

All development documentation is preserved in `archive/docs/`:
- `IMPLEMENTATION_COMPLETE.md` - Full implementation summary
- `IMAGE_RECOMMENDATIONS.md` - Image selection guide
- `QUICK_REFERENCE.md` - Quick content updates
- Component-specific guides (Timeline, Newsletter, etc.)

---

**Last Updated**: November 16, 2025
**Status**: ✅ PRODUCTION READY
**Deploy Status**: Not yet deployed (ready to deploy)

---

Built with care for Logan and her family.
