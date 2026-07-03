import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * Reusable SEO component for all pages
 */
export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  author = "Sam Perfumes",
  ogType = "website",
  children,
}) {
  const siteName = "Sam Perfumes";
  const siteUrl = "https://sam-perfume.vercel.app";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const fullUrl = url || siteUrl;
  const fullImage = image || `${siteUrl}/og-image.jpg`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {children}
    </Helmet>
  );
}
