import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  keywords,
  author,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  robots,
}) => {
  const defaultTitle = "Dwi's Mini Blog | Share my knowlegde";
  const defaultDescription = "Blog education programming Laravel and React.";

  return (
    <Helmet>
      {/* Umum */}
      <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords.join(", ")} />}
      {author && <meta name="author" content={author} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {robots && <meta name="robots" content={robots} />}

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={ogTitle || title || defaultTitle} />
      <meta
        property="og:description"
        content={ogDescription || description || defaultDescription}
      />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogUrl && (
        <meta
          property="og:url"
          content={ogUrl || canonical || window.location.href}
        />
      )}
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title || defaultTitle} />
      <meta
        name="twitter:description"
        content={ogDescription || description || defaultDescription}
      />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {ogUrl && (
        <meta
          name="twitter:url"
          content={ogUrl || canonical || window.location.href}
        />
      )}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  author: PropTypes.string,
  canonical: PropTypes.string,
  ogTitle: PropTypes.string,
  ogDescription: PropTypes.string,
  ogImage: PropTypes.string,
  ogUrl: PropTypes.string,
  robots: PropTypes.string,
};

export default SEO;
