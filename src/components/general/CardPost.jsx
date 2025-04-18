import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

export default function CardPost(props) {
  const date = new Date(props.date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const englishDate = date.toLocaleDateString("en-US", options);
  return (
    <li
      key={props.index}
      className="lg:grid grid grid-cols-3 gap-4 sm:flex sm:flex-wrap"
    >
      <div className="flex mb-6 min-w-0 flex-auto">
        <p className="text-md font-semibold text-gray-500">{englishDate}</p>
      </div>
      <div className="col-span-2 flex flex-col justify-start shrink-0 sm:flex sm:flex-col sm:items-start">
        <h2 className="font-bold text-lg text-gray-500 text-left">
          {props.title || "Lorem ipsum dolor sit."}
        </h2>
        <span
          className="text-sm text-gray-500 text-left"
          dangerouslySetInnerHTML={{
            __html: props.content.substring(0, 250) + "...",
          }}
        ></span>
        <p className="mt-1 text-sm font-medium text-right text-blue-600">
          <Link to={`/blog/${props.slug}`} className="hover:underline">
            Read more <GoArrowRight className="inline" />
          </Link>
        </p>
      </div>
    </li>
  );
}

CardPost.propTypes = {
  index: PropTypes.number,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    .isRequired,
  title: PropTypes.string,
  content: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};
