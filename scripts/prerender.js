import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');
const ssrBundlePath = path.join(distDir, 'ssr/entry-server.js');

async function prerender() {
  if (!fs.existsSync(ssrBundlePath)) {
    console.error('SSR bundle not found at:', ssrBundlePath);
    process.exit(1);
  }

  const { render, SITE_URL } = await import(pathToFileURL(ssrBundlePath).href);
  const template = fs.readFileSync(templatePath, 'utf-8');

  const routes = ['/', '/build', '/origins', '/story', '/subscribe'];

  console.log(`Prerendering ${routes.length} static routes for production SEO...`);

  for (const route of routes) {
    const { html, seo } = render(route);
    const fullCanonicalUrl = `${SITE_URL}${seo.canonicalPath === '/' ? '' : seo.canonicalPath}`;

    let pageHtml = template;

    // 1. Inject server-rendered root HTML
    pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

    // 2. Replace Title
    pageHtml = pageHtml.replace(/<title>.*?<\/title>/s, `<title>${seo.title}</title>`);

    // 3. Replace Meta Description
    pageHtml = pageHtml.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${seo.description}" />`
    );

    // 4. Replace Canonical URL
    pageHtml = pageHtml.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
      `<link rel="canonical" href="${fullCanonicalUrl}" />`
    );

    // 5. Replace Open Graph tags
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:url" content="${fullCanonicalUrl}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:title" content="${seo.title}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${seo.description}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:type"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:type" content="${seo.ogType}" />`
    );

    // 6. Replace Twitter Card tags
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:title" content="${seo.title}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:description" content="${seo.description}" />`
    );

    // 7. Inject Route-Specific JSON-LD Structured Data
    const structuredDataTag = `<script type="application/ld+json">\n${JSON.stringify(
      seo.structuredData,
      null,
      2
    )}\n    </script>`;
    pageHtml = pageHtml.replace(
      /<script\s+type="application\/ld\+json">.*?<\/script>/s,
      structuredDataTag
    );

    // Determine target output file path
    const targetFilePath =
      route === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, route.slice(1), 'index.html');

    const targetDir = path.dirname(targetFilePath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(targetFilePath, pageHtml, 'utf-8');
    console.log(`  ✓ Generated static prerender: ${route} -> ${path.relative(distDir, targetFilePath)}`);
  }

  // Clean up temporary SSR bundle
  const ssrDir = path.join(distDir, 'ssr');
  if (fs.existsSync(ssrDir)) {
    fs.rmSync(ssrDir, { recursive: true, force: true });
  }

  console.log('Static prerendering completed successfully!');
}

prerender().catch((err) => {
  console.error('Error during static prerendering:', err);
  process.exit(1);
});
