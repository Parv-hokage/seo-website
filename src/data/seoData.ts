export interface PageSEO {
  title: string;
  description: string;
  canonicalPath: string;
  ogType: 'website' | 'article' | 'product';
  structuredData: Record<string, unknown>[];
}

export const SITE_URL = 'https://seo-website-murex.vercel.app';
export const SITE_NAME = 'Verra Coffee Atelier';
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

export const SEO_DATA: Record<string, PageSEO> = {
  '/': {
    title: 'Verra Coffee Atelier | Artisanal Custom Roasted Coffee to Order',
    description:
      'Verra Coffee Atelier roasts single-origin coffee to order in small batches and ships within 48 hours. Choose your origin, roast level, and grind in a personalized bag.',
    canonicalPath: '/',
    ogType: 'website',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        description:
          'Small-batch custom coffee roaster shipping single-origin coffees within 48 hours.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.svg`,
        email: 'hello@verracoffee.example',
        description:
          'Artisanal coffee atelier offering personalized roasted-to-order blends with single-origin beans.',
      },
    ],
  },
  '/build': {
    title: 'Build Your Custom Coffee Blend | Verra Coffee Atelier',
    description:
      'Design your own coffee blend with Verra Coffee Atelier. Select single origin, roast level, grind, and personalize your bag name with live tasting notes.',
    canonicalPath: '/build',
    ogType: 'product',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Custom Coffee Blend',
        description:
          'Personalized roasted-to-order coffee blend tailored by origin, roast profile, grind, and package size.',
        brand: {
          '@type': 'Brand',
          name: SITE_NAME,
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: '18.00',
          highPrice: '68.00',
          offerCount: '36',
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}/build`,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Build a Blend',
            item: `${SITE_URL}/build`,
          },
        ],
      },
    ],
  },
  '/origins': {
    title: 'Single Origin Coffees Traced to the Farm | Verra Coffee Atelier',
    description:
      'Explore single-origin coffees from Guji Ethiopia, Huila Colombia, and Antigua Guatemala. Detailed cupping notes, acidity, body, and sweetness profiles.',
    canonicalPath: '/origins',
    ogType: 'website',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Single Origin Coffees',
        description: 'Ethically sourced and farm-traced single origin coffee beans.',
        itemListElement: [
          {
            '@type': 'Product',
            position: 1,
            name: 'Guji, Ethiopia Single Origin Coffee',
            description:
              'Washed heirloom varieties grown above 2,000 metres. Floral and bright with notes of jasmine, bergamot, and stone fruit.',
            offers: {
              '@type': 'Offer',
              price: '18.00',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
          },
          {
            '@type': 'Product',
            position: 2,
            name: 'Huila, Colombia Single Origin Coffee',
            description:
              'Sweet and balanced coffee grown in Huila with tasting notes of red apple, caramel, and cacao.',
            offers: {
              '@type': 'Offer',
              price: '18.00',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
          },
          {
            '@type': 'Product',
            position: 3,
            name: 'Antigua, Guatemala Single Origin Coffee',
            description:
              'Volcanic soil gives a deep cocoa body and gentle spice with notes of dark cocoa and toasted almond.',
            offers: {
              '@type': 'Offer',
              price: '20.00',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Origins',
            item: `${SITE_URL}/origins`,
          },
        ],
      },
    ],
  },
  '/story': {
    title: 'Our Roast Process: From Green Beans to 48-Hour Delivery | Verra',
    description:
      'Learn how Verra Coffee Atelier roasts in small batches. From cupping green beans and drum roasting to 2-day resting and dispatching within 48 hours.',
    canonicalPath: '/story',
    ogType: 'article',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'How Your Coffee Bag Gets Made: Inside the Roast Day',
        description:
          'A transparent look at Verra Coffee Atelier small-drum roasting, resting, and customized packaging process.',
        author: {
          '@type': 'Organization',
          name: SITE_NAME,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/favicon.svg`,
          },
        },
        mainEntityOfPage: `${SITE_URL}/story`,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Our Roast',
            item: `${SITE_URL}/story`,
          },
        ],
      },
    ],
  },
  '/subscribe': {
    title: 'Coffee Subscriptions | Never Run Out | Verra Coffee Atelier',
    description:
      'Subscribe to freshly roasted coffee delivered weekly, bi-weekly, or monthly. Save up to 10% on your customized blend with flexible pause and cancel.',
    canonicalPath: '/subscribe',
    ogType: 'website',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Fresh Coffee Subscription',
        provider: {
          '@type': 'Organization',
          name: SITE_NAME,
        },
        description:
          'Recurring delivery of custom roasted-to-order coffee on weekly, bi-weekly, or monthly schedules.',
        offers: [
          {
            '@type': 'Offer',
            name: 'Weekly Coffee Subscription',
            discount: '10%',
          },
          {
            '@type': 'Offer',
            name: 'Bi-Weekly Coffee Subscription',
            discount: '10%',
          },
          {
            '@type': 'Offer',
            name: 'Monthly Coffee Subscription',
            discount: '5%',
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Subscribe',
            item: `${SITE_URL}/subscribe`,
          },
        ],
      },
    ],
  },
};
