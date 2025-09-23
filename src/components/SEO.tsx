import { Helmet } from 'react-helmet-async';

interface SEOProps {
  page: string;
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

const SEO = ({ page, title, description, image, type = 'website' }: SEOProps) => {
  const baseUrl = window.location.origin;
  const currentUrl = window.location.href;
  
  const seoTitle = title || "VCoin — Where Entrepreneurs and Investors Meet";
  const seoDescription = description || "Join the future of startup funding with VCoin. Connect entrepreneurs with investors through our revolutionary tokenized investment platform.";
  const seoImage = image || `${baseUrl}/og-image.jpg`;
  
  const languages = ['en', 'es', 'fr', 'de', 'pt', 'ru', 'zh', 'ar'];
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "VCoin",
    "url": baseUrl,
    "logo": `${baseUrl}/vcoin-logo.png`,
    "description": seoDescription,
    "sameAs": [
      "https://twitter.com/vcoin",
      "https://discord.gg/vcoin",
      "https://t.me/vcoin"
    ]
  };

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      
      {/* Open Graph */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="VCoin" />
      <meta property="og:locale" content="en" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:site" content="@vcoin" />
      
      {/* Canonical */}
      <link rel="canonical" href={currentUrl.split('?')[0]} />
      
      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default SEO;