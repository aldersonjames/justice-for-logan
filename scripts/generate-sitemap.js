import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseUrl = process.env.VITE_SITE_URL || 'https://justiceforlogan.com';

const pages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/#about', priority: '0.9', changefreq: 'monthly' },
  { path: '/#timeline', priority: '0.8', changefreq: 'weekly' },
  { path: '/#memory-wall', priority: '0.8', changefreq: 'daily' },
  { path: '/#media', priority: '0.9', changefreq: 'daily' },
  { path: '/#advocacy', priority: '1.0', changefreq: 'weekly' },
  { path: '/#resources', priority: '0.8', changefreq: 'monthly' },
  { path: '/#toolkit', priority: '0.7', changefreq: 'monthly' },
  { path: '/#events', priority: '0.8', changefreq: 'weekly' },
  { path: '/#blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/#testimonials', priority: '0.7', changefreq: 'monthly' },
  { path: '/#map', priority: '0.6', changefreq: 'monthly' },
  { path: '/#impact', priority: '0.7', changefreq: 'weekly' },
  { path: '/#press-kit', priority: '0.7', changefreq: 'monthly' },
  { path: '/#booking', priority: '0.8', changefreq: 'monthly' },
  { path: '/#guestbook', priority: '0.6', changefreq: 'daily' },
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const distPath = join(__dirname, '..', 'dist', 'sitemap.xml');
  writeFileSync(distPath, sitemap);
  console.log('✅ Sitemap generated successfully at dist/sitemap.xml');
};

generateSitemap();
