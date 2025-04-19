import PropTypes from "prop-types";

export default function CardBlog({
  title,
  category,
  content,
  image,
  children,
}) {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-6 flex flex-col flex-grow">
        {title && (
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        )}
        <span>
          {category.name && (
            <h3 className="text-xs text-blue-600 font-medium mb-3">
              {category.name}
            </h3>
          )}
        </span>
        <span
          className="text-sm text-gray-500 text-left"
          dangerouslySetInnerHTML={{
            __html: content.substring(0, 110) + "...",
          }}
        ></span>
        <div className="mt-auto text-right">{children}</div>
      </div>
    </div>
  );
}

CardBlog.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.node,
  category: PropTypes.string.isRequired,
};
