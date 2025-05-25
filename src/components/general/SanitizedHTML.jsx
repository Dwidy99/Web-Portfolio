import { useMemo, useEffect, useRef } from "react";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";

/**
 * Component to render sanitized HTML content safely.
 * Automatically lazy loads images using IntersectionObserver.
 */
export default function SanitizedHTML({ html = "", className = "" }) {
  const contentRef = useRef();

  const sanitizedHtml = useMemo(() => {
    return DOMPurify.sanitize(html, {
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
      FORBID_TAGS: ["style", "script", "iframe", "frame"],
      FORBID_ATTR: ["onload", "onerror"],
    });
  }, [html]);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const images = container.querySelectorAll("img[data-src]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: "200px" }
    );

    images.forEach((img) => {
      img.dataset.src = img.src;
      img.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";
      observer.observe(img);
    });

    return () => observer.disconnect();
  }, [sanitizedHtml]);

  return (
    <div
      ref={contentRef}
      className={`sanitized-content ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}

SanitizedHTML.propTypes = {
  html: PropTypes.string.isRequired,
  className: PropTypes.string,
};
