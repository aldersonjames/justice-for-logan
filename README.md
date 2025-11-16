# Justice for Logan

A memorial and advocacy website honoring Logan Federico and fighting for criminal justice reform in South Carolina.

## Quick Start

### Development
```bash
npm install --legacy-peer-deps
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

## Deployment

This site is configured for Netlify deployment.

### Prerequisites
1. Create a `.env` file (copy from `.env.example`)
2. Configure environment variables:
   - `VITE_GA_MEASUREMENT_ID` - Google Analytics ID
   - `VITE_ADMIN_EMAIL` - Admin email for notifications
   - Social media URLs
   - External service URLs (Calendly, GoFundMe, Petition)

### Deploy to Netlify
1. Connect your repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Configure form notifications in Site Settings > Forms

## Project Structure

```
justice-for-logan/
├── src/
│   ├── components/        # React components
│   ├── data/             # JSON data files
│   ├── utils/            # Utilities (analytics, config)
│   └── App.jsx           # Main application
├── public/               # Static assets
├── netlify/functions/    # Serverless functions
├── scripts/              # Build scripts
└── archive/              # Development files (not deployed)
```

## Features

- 14 interactive components
- Google Analytics integration
- Netlify Forms (5 forms)
- Interactive map with Leaflet
- Event calendar
- Media coverage crawler
- SEO optimized (sitemap, robots.txt)
- Mobile responsive with hamburger menu
- Security headers configured

## Content Management

Update content by editing JSON files in `src/data/`:
- `events.json` - Calendar events
- `blog-posts.json` - Blog updates
- `resources.json` - Advocacy resources
- `testimonials.json` - Community testimonials
- `mediaArticles.json` - Media coverage
- `memories.json` - Memory wall entries
- `map-locations.json` - Map locations

## Build Notes

Due to React 19 peer dependencies, use:
```bash
npm install --legacy-peer-deps
```

## Documentation

All development documentation has been moved to `archive/docs/`:
- Implementation guides
- Component summaries
- Integration examples
- Deployment checklists

## Support

For questions or issues, refer to the documentation in the `archive/docs/` directory.

---

**Built with care for Logan and her family.**

*May this platform help bring the justice and change she deserves.*
