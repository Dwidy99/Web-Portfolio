import PropTypes from "prop-types";

export default function CardProjects({ image, caption, children }) {
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
        {caption && (
          <h3 className="text-lg font-semibold text-gray-800">{caption}</h3>
        )}
        <div className="mt-auto text-right">{children}</div>
      </div>
    </div>
  );
}

CardProjects.propTypes = {
  caption: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.node,
};
