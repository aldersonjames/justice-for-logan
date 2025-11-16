# Justice for Logan Federico Website Constitution

## Core Principles

### I. Code Quality & Style
- Enforce ESLint + Prettier configurations for all TypeScript/JavaScript artifacts.
- Use React functional components with hooks; maintain clean, readable code with comments where intent isn't obvious.
- Use semantic commit prefixes (`feat:`, `fix:`, `chore:`, `content:`, etc.); keep commits focused and descriptive.
- Branch names follow `00X-feature-name` matching Spec Kit feature directories when applicable.

### II. Performance & Scalability
- **Primary Goal**: Handle traffic spikes (10K+ simultaneous visitors) without degradation.
- Deploy as static site via Netlify CDN; leverage edge caching and instant global distribution.
- Optimize all images (WebP with fallbacks); lazy-load media content below the fold.
- Target <2s initial page load on 3G; keep JavaScript bundle <150KB gzipped.
- Minimize external dependencies; prefer vanilla CSS/Tailwind over heavy animation libraries.

### III. Content Management & Updates
- Design for non-technical content updates by web designer familiar with HTML/CSS/JS.
- Centralize editable content in clearly marked configuration files or data files.
- Document all content update procedures in README with step-by-step instructions.
- Support hot-swapping of images via simple file replacement in clearly named directories.

### IV. Respectful Presentation
- Maintain dignified, professional tone while celebrating Logan's vibrant personality.
- Balance memorial (honoring Logan) with advocacy (driving legal reform) 50/50.
- Avoid sensationalism; present facts clearly and respectfully.
- Use Logan's favorite elements (Eagles, Taylor Swift, pink) as tasteful accents, not overwhelming themes.
- Ensure family approval for all biographical content and photos.

### V. Accessibility & Inclusivity
- Meet WCAG 2.1 AA standards minimum for contrast, keyboard navigation, and screen readers.
- Provide alt text for all images; ensure semantic HTML structure.
- Support high-contrast mode and respect prefers-reduced-motion.
- Ensure mobile-first responsive design works flawlessly on all screen sizes.
- Fast, accessible experience for users on slow connections or assistive technologies.

### VI. Privacy & Security
- Implement HTTPS for all traffic; configure Netlify security headers.
- No tracking beyond essential analytics (Google Analytics or privacy-focused alternative).
- Never sell or share visitor data; comply with GDPR/CCPA requirements.
- Store no personal information unless explicitly submitted (contact form, petition signatures).
- Secure all form submissions against spam with reCAPTCHA or honeypot methods.

### VII. External Service Integration
- **Calendly Integration**: Embed booking widget for media interviews with Stephen Federico.
- **Social Media**: Link to Facebook, Instagram, news channel videos without embedding tracking pixels.
- **News Aggregation**: Link to external sources; never duplicate copyrighted content.
- **Petition/Donations**: Link to trusted external services (Change.org, GoFundMe) rather than handling payments directly.

### VIII. Advocacy Focus
- Clearly articulate mission: Criminal justice reform in South Carolina.
- Provide actionable steps: Contact legislators, sign petitions, share story, attend events.
- Update regularly with legislative progress, media coverage, and community events.
- Maintain timeline of advocacy milestones and victories.

### IX. Documentation & Maintenance
- Maintain comprehensive README with:
  - How to update content
  - How to deploy changes
  - How to add news articles/media
  - How to troubleshoot common issues
- Document all third-party integrations and API keys needed.
- Keep dependencies minimal and document why each is necessary.
- Provide rollback instructions for failed deployments.

### X. Development Workflow
- Test all changes locally before deployment.
- Use Netlify preview deployments for family review before going live.
- Keep production branch (`main`) stable and deployable at all times.
- Tag releases with semantic versioning for major content/feature updates.
- Monitor site performance and uptime; set up alerts for downtime.

## Technical Stack

### Required
- **Frontend**: React 18+ with Vite (fast builds, HMR)
- **Styling**: Tailwind CSS (utility-first, small bundle)
- **Deployment**: Netlify (CDN, free tier, traffic spike handling)
- **Version Control**: Git + GitHub

### Allowed Third-Party Services
- **Analytics**: Google Analytics 4 or Plausible (privacy-focused)
- **Forms**: Netlify Forms or Formspree (contact/submission handling)
- **Scheduling**: Calendly (media booking system)
- **Fonts**: Google Fonts (Inter, Montserrat, Playfair Display)

### Prohibited
- Heavy JavaScript frameworks (Angular, Vue) - keep it simple
- Database servers (PostgreSQL, MySQL) - static site only
- Backend servers (Express, Rails) - CDN-first architecture
- Payment processing (Stripe, PayPal) - link to external services only
- User authentication systems - no login required

## Content Guidelines

### Photography
- High-resolution images optimized for web (1200px wide max for hero, 800px for content)
- Respectful, celebratory photos that capture Logan's personality
- Family approval required for all photos
- Clear file naming: `logan-[description]-[number].jpg`

### Writing Tone
- **Biographical sections**: Warm, personal, celebratory
- **Tragedy section**: Factual, respectful, non-sensational
- **Advocacy sections**: Direct, action-oriented, empowering
- **News coverage**: Objective summaries with clear source attribution

### Brand Elements
- **Primary Color**: Logan Pink (#FF69B4)
- **Accent Color**: Eagles Midnight Green (#004C54)
- **Supporting Colors**: Eagles Silver, White, Charcoal
- **Typography**: Modern, clean, readable (Inter, Montserrat)

## Performance Standards

- **Initial Load**: <2 seconds on 3G connection
- **Time to Interactive**: <3 seconds
- **Lighthouse Score**: 90+ across all categories
- **Bundle Size**: <150KB gzipped JavaScript
- **Image Optimization**: All images under 200KB each
- **CDN Response**: <50ms from edge locations worldwide

## Security Requirements

- Enforce HTTPS with automatic redirects
- Set security headers via Netlify config (CSP, HSTS, X-Frame-Options)
- Implement form spam protection (reCAPTCHA or honeypot)
- No sensitive data stored client-side
- Regular dependency updates for security patches

## Launch Requirements

- Family approval of all content
- Cross-browser testing (Chrome, Safari, Firefox, Edge)
- Mobile responsiveness verified (iPhone, Android, tablets)
- Accessibility audit passed
- Performance audit passed
- SEO optimization complete (meta tags, structured data, sitemap)
- Analytics configured and verified
- Social media sharing tested
- All links verified working
- Contact forms tested end-to-end

## Ongoing Maintenance

- **Weekly**: Check for broken links, verify forms working
- **Bi-weekly**: Add new media coverage and advocacy updates
- **Monthly**: Review analytics, update content as needed
- **Quarterly**: Dependency security updates, performance review
- **As-needed**: Emergency updates for breaking news or critical issues

**Version**: 1.0.0 | **Ratified**: 2025-10-01 | **Last Amended**: 2025-10-01
