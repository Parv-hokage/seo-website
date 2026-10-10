import { useEffect } from 'react';
import { SEO_DATA, SITE_URL, SITE_NAME, OG_IMAGE_URL } from '../data/seoData.ts';

interface SEOProps {
  pathname: string;
}

export const SEO = ({ pathname }: SEOProps) => {
  const seo = SEO_DATA[pathname] || SEO_DATA['/'];
  const fullCanonicalUrl = `${SITE_URL}${seo.canonicalPath === '/' ? '' : seo.canonicalPath}`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = seo.title;

    // Helper to update or create a meta tag
    const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', seo.description);

    // 3. Open Graph Tags
    setMetaTag('property', 'og:title', seo.title);
    setMetaTag('property', 'og:description', seo.description);
    setMetaTag('property', 'og:url', fullCanonicalUrl);
    setMetaTag('property', 'og:type', seo.ogType);
    setMetaTag('property', 'og:site_name', SITE_NAME);
    setMetaTag('property', 'og:image', OG_IMAGE_URL);
    setMetaTag('property', 'og:locale', 'en_US');

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', seo.title);
    setMetaTag('name', 'twitter:description', seo.description);
    setMetaTag('name', 'twitter:image', OG_IMAGE_URL);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);

    // 6. Structured Data (JSON-LD)
    const existingJsonLd = document.getElementById('json-ld-schema');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }
    const script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(seo.structuredData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('json-ld-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [seo, fullCanonicalUrl]);

  return null;
};
