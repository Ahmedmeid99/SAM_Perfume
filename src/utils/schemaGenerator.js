/**
 * Dynamic Schema Generator for Products
 * This file contains helper functions to generate JSON-LD structured data for products
 * dynamically based on product data from your API
 */

export const generateProductSchema = (product, lang = "en") => {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    description: product.description || "",
    image: product.image,
    brand: {
      "@type": "Brand",
      name: "Sam Perfumes",
    },
    offers: {
      "@type": "Offer",
      url: `https://sam-perfume.vercel.app/product/${product.id}`,
      priceCurrency: product.currency || "USD",
      price: product.price,
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Sam Perfumes",
      },
    },
    ...(product.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewCount || 0,
      },
    }),
  };
};

export const generateBreadcrumbSchema = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

export const generateCollectionSchema = (name, description, url, items = []) => {
  return {
    "@context": "https://schema.org/",
    "@type": "CollectionPage",
    name: name,
    description: description,
    url: url,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: item.url,
      })),
    },
  };
};

export const generateFAQSchema = (faqs) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

export const generateArticleSchema = (article) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate,
    author: {
      "@type": "Organization",
      name: "Sam Perfumes",
    },
  };
};

/**
 * Insert schema into page head
 * Usage: insertSchema(generateProductSchema(product))
 */
export const insertSchema = (schema) => {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};
