import express from 'express';

const router = express.Router();

// Dynamic sitemap generation
router.get('/sitemap.xml', async (req, res) => {
    try {
        const [Blog, Project, Service] = await Promise.all([
            import('../models/Blog.model.js').then(m => m.default),
            import('../models/Project.model.js').then(m => m.default),
            import('../models/Service.model.js').then(m => m.default)
        ]);

        const [blogs, projects, services] = await Promise.all([
            Blog.findAll({ where: { isActive: true }, attributes: ['slug', 'updatedAt'] }),
            Project.findAll({ where: { isActive: true }, attributes: ['id', 'updatedAt'] }),
            Service.findAll({ where: { isActive: true }, attributes: ['id', 'updatedAt'] })
        ]);

        const baseUrl = process.env.FRONTEND_URL || 'https://www.wisdomquantums.com';

        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <!-- Static Pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/services</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/portfolio</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/technologies</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/blogs</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/careers</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact-us</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Dynamic Blog Posts -->
${blogs.map(blog => `  <url>
    <loc>${baseUrl}/blogs/${blog.slug}</loc>
    <lastmod>${blog.updatedAt.toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}

</urlset>`;

        res.header('Content-Type', 'application/xml');
        res.send(xml);
    } catch (error) {
        console.error('Sitemap generation error:', error);
        res.status(500).send('Error generating sitemap');
    }
});

// Robots.txt
router.get('/robots.txt', (req, res) => {
    const baseUrl = process.env.FRONTEND_URL || 'https://www.wisdomquantums.com';

    const robotsTxt = `# robots.txt for WisdomQuantums Solutions

User-agent: *
Allow: /

# Disallow admin and private pages
Disallow: /admin
Disallow: /login
Disallow: /dashboard

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1
`;

    res.header('Content-Type', 'text/plain');
    res.send(robotsTxt);
});

export default router;
