import { renderToString } from 'react-dom/server';
import { App } from './App.tsx';
import { SEO_DATA, SITE_URL, SITE_NAME, OG_IMAGE_URL } from './data/seoData.ts';

export function render(url: string) {
  const html = renderToString(<App initialPath={url} />);
  const seo = SEO_DATA[url] || SEO_DATA['/'];
  return { html, seo, SITE_URL, SITE_NAME, OG_IMAGE_URL };
}

export { SEO_DATA, SITE_URL, SITE_NAME, OG_IMAGE_URL };
