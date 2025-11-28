import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

export function SEO({ 
  title, 
  description, 
  keywords = "rodotec, implementos rodoviários, poliguindaste, carroceria, caçamba basculante, tanque, equipamentos rodoviários, sergipe",
  ogImage = "https://images.unsplash.com/photo-1693064203616-2e78760f5df7?w=1200&h=630&fit=crop",
  ogType = "website",
  canonicalUrl
}: SEOProps) {
  const location = useLocation();
  const baseUrl = "https://rodotec.com.br";
  const fullUrl = canonicalUrl || `${baseUrl}${location.pathname}`;
  const fullTitle = `${title} | RODOTEC - Equipamentos Rodoviários`;

  useEffect(() => {
    // Update title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph meta tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:site_name', 'RODOTEC - Equipamentos Rodoviários', true);

    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);

    // Robots
    updateMetaTag('robots', 'index, follow');

    // Author and company info
    updateMetaTag('author', 'RODOTEC Equipamentos Rodoviários');
    updateMetaTag('company', 'RODOTEC - Equipamentos Rodoviários Ltda');
    updateMetaTag('geo.region', 'BR-SE');
    updateMetaTag('geo.placename', 'Sergipe');

  }, [fullTitle, description, keywords, ogImage, ogType, fullUrl]);

  return null;
}

