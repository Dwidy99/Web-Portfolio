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
      {image && (
        <img
          src={image}
          alt="image project"
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6 flex flex-col flex-grow">
        {title && <h3 className="text-lg font-bold text-gray-800">{title}</h3>}
        {description && (
          <p
            className="my-6 text-lg dark:text-gray-500"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
          ></p>
        )}
        {caption && (
          <div className="flex items-start gap-x-2 text-lg text-gray-800 mb-4">
            <span className="font-semibold whitespace-nowrap">Built with:</span>
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(caption),
              }}
            />
          </div>
        )}
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
