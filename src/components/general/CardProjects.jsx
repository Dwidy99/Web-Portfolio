import PropTypes from "prop-types";
import DOMPurify from "dompurify";

export default function CardProjects({
  title,
  description,
  image,
  caption,
  children,
}) {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      {/* Gambar Project */}
      {image && (
        <img
          src={image}
          alt={title || "Project image"}
          className="w-full h-60 object-cover"
        />
      )}

      {/* Konten Project */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Judul */}
        {title && (
          <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        )}

        {/* Caption (Tech Stack, dsb) */}
        {caption && (
          <div className="flex items-start gap-x-2 text-sm text-gray-700 mb-4">
            <span className="font-semibold whitespace-nowrap">Built with:</span>
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(caption),
              }}
            />
          </div>
        )}

        {/* Deskripsi Singkat */}
        {description && (
          <p
            className="text-gray-600 text-base mb-4 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
          ></p>
        )}

        {/* Tombol / Child Elements */}
        <div className="mt-auto text-right">{children}</div>
      </div>
    </div>
  );
}

CardProjects.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  caption: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.node,
};
