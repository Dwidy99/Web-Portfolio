import PropTypes from "prop-types";
import { useRef, useEffect, useState } from "react";

const AccordionItem = ({ exp, isOpen, onClick, index, formatDate }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden transition-all">
      {/* Header */}
      <button
        onClick={() => onClick(index)}
        className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-left"
      >
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded bg-white overflow-hidden">
            <img
              src={exp.image}
              alt={exp.name}
              className="object-contain h-full w-full"
            />
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {exp.name}
            </div>
            <div className="text-sm text-gray-500">
              {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
            </div>
          </div>
        </div>
        <span className="text-gray-500">{isOpen ? "▲" : "▼"}</span>
      </button>

      {/* Content */}
      <div
        ref={contentRef}
        className="px-4 overflow-hidden transition-all duration-300 bg-white dark:bg-gray-900"
        style={{
          height: `${height}px`,
        }}
      >
        <div className="py-3 text-sm text-gray-700 dark:text-gray-300">
          <p
            className="my-6 text-lg dark:text-gray-500"
            dangerouslySetInnerHTML={{ __html: exp.description }}
          ></p>
        </div>
        <ul className="list-disc ml-6 space-y-1 text-sm text-gray-600 dark:text-gray-400 pb-3">
          {exp.highlights?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

AccordionItem.propTypes = {
  exp: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    link: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    description: PropTypes.string,
    highlights: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default AccordionItem;
