/**
 * SEO Helper Functions
 */

export const siteConfig = {
  siteName: "Sam Perfumes",
  siteUrl: "https://sam-perfume.vercel.app",
  description: "Premium perfumes, designer fragrances, and luxury scents with fast delivery and customer satisfaction guarantee.",
  author: "Sam Perfumes",
  email: "info@samperfumes.com",
  phone: "+1-XXX-XXX-XXXX",
  image: "https://sam-perfume.vercel.app/og-image.jpg",
  twitterHandle: "@samperfumes",
  socialProfiles: {
    facebook: "https://facebook.com/samperfumes",
    instagram: "https://instagram.com/samperfumes",
    twitter: "https://twitter.com/samperfumes",
  },
};

/**
 * Generate SEO meta data for pages
 */
export const generateSeoMeta = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  author = siteConfig.author,
}) => {
  return {
    title: `${title} | ${siteConfig.siteName}`,
    description: description || siteConfig.description,
    keywords,
    image: image || siteConfig.image,
    url: url || siteConfig.siteUrl,
    type,
    author,
  };
};

/**
 * Generate JSON-LD structured data
 */
export const generateJSONLD = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/sam-logo.jpeg`,
    description: siteConfig.description,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: siteConfig.phone,
      email: siteConfig.email,
    },
    sameAs: Object.values(siteConfig.socialProfiles),
  },

  product: (product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      "@type": "Brand",
      name: product.brand || siteConfig.siteName,
    },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.siteUrl}/product/${product.id}`,
      priceCurrency: product.currency || "USD",
      price: product.price,
      availability: product.inStock ? "InStock" : "OutOfStock",
    },
    aggregateRating:
      product.rating && product.reviewCount
        ? {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          }
        : undefined,
  }),

  breadcrumb: (items) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),

  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.siteName,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      // Update with actual address
      addressCountry: "US",
    },
    priceRange: "$$$",
  },

  ecommerce: {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Perfumes",
    description: "Premium perfumes and designer fragrances",
    url: `${siteConfig.siteUrl}/perfumes`,
  },
};

/**
 * Generate canonical URL
 */
export const generateCanonicalUrl = (path) => {
  return `${siteConfig.siteUrl}${path}`;
};
