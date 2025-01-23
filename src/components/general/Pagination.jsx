function Pagination(props) {
  const { currentPage, perPage, total, onChange, position = "center" } = props;

  const totalPages = Math.ceil(total / perPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    totalPages > 1 && (
      <div className={`flex items-center justify-${position} space-x-2 mt-3`}>
        {/* Previous Button */}
        <button
          onClick={() => onChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-200"
        >
          Previous
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onChange(page)}
            className={`px-4 py-2 text-sm font-medium border rounded-lg ${
              currentPage === page
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-200"
        >
          Next
        </button>
      </div>
    )
  );
}

export default Pagination;
