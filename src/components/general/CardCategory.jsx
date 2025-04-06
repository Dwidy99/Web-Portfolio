import PropTypes from "prop-types";

export default function CardCategory({ name, image, colorClass }) {
  return (
    <div className="flex justify-evenly items-center my-2">
      {/* Button */}
      <a
        className={`${colorClass} drop-shadow-xl text-white rounded px-3 py-2 hover:${
          colorClass.split("-")[0]
        }-600`}
      >
        <img
          src={image}
          alt={name}
          className="inline object-cover rounded-md shadow-md mx-1"
          style={{ width: "25px" }}
        />
        {name}
      </a>
    </div>
  );
}

CardCategory.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  colorClass: PropTypes.string.isRequired,
};
