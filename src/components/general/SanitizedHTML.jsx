import DOMPurify from "dompurify";
import PropTypes from "prop-types";

const SanitizedHTML = ({ html, className = "" }) => {
  const sanitizedHtml = DOMPurify.sanitize(html || "", {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "br",
      "strong",
      "em",
      "u",
      "s",
      "ol",
      "ul",
      "li",
      "a",
      "img",
      "blockquote",
      "pre",
      "code",
      "span",
      "div",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
    ],
    ALLOWED_ATTR: [
      "href",
      "src",
      "alt",
      "title",
      "class",
      "style",
      "color",
      "width",
      "height",
      "border",
      "cellpadding",
      "cellspacing",
    ],
  });

  return (
    <div
      className={`prose dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

SanitizedHTML.propTypes = {
  html: PropTypes.string,
  className: PropTypes.string,
};

export default SanitizedHTML;
