import { Link } from "react-router-dom";
import DateID from "../../utils/DateID";
import { GoArrowRight } from "react-icons/go";

export default function CardPost(props) {
  return (
    <li
      key={props.index}
      className="lg:grid grid-cols-2 gap-x-6 gap-y-6 py-5 sm:flex sm:flex-wrap "
    >
      <div className="flex gap-x-4 mb-6 min-w-0 flex-auto">
        <p className="text-lg font-extrabold text-gray-500">
          {DateID(new Date(props.date))}
        </p>
      </div>
      <div className="flex flex-col justify-start shrink-0 sm:flex sm:flex-col sm:items-start">
        <h2 className="font-bold text-lg text-gray-500 text-left">
          {props.title || "Lorem ipsum dolor sit."}
        </h2>
        <span
          className="text-sm text-gray-500 text-left"
          dangerouslySetInnerHTML={{
            __html: props.content.substring(0, 250) + "...",
          }}
        ></span>
        <p className="mt-1 font-bold text-gray-500 text-left">
          <Link to={`/blog/${props.slug}`} className="hover:underline">
            Read more <GoArrowRight className="inline" />
          </Link>
        </p>
      </div>
    </li>
  );
}
