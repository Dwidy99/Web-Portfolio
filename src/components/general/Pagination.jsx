//import pagination
import Pagination from "react-js-pagination";

function definePagination(props) {
  return (
    props.total > 0 && (
      <Pagination
        innerClass={`flex items-center space-x-2 justify-center mt-3 mb-0`} // Tailwind pagination container class
        activePage={props.currentPage}
        activeClass="bg-blue-500 text-white rounded-full" // Active page style
        itemsCountPerPage={props.perPage}
        totalItemsCount={props.total}
        onChange={props.onChange}
        itemClass="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200" // Page item class
        linkClass="page-link text-gray-500 hover:text-gray-700" // Link class
      />
    )
  );
}

export default definePagination;
