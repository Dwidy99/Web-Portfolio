import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import Cookies from "js-cookie";
import hasAnyPermissions from "../../../utils/Permissions";
import Api from "../../../services/Api";
import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";
import Pagination from "../../../components/general/Pagination";

export default function CategoriesIndex() {
  document.title = "Categories - Desa Digital";

  // State for categories and pagination
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });
  const [keywords, setKeywords] = useState("");

  // Get token from cookies
  const token = Cookies.get("token");

  // Function to fetch categories data
  const fetchData = async (pageNumber = 1, keywords = "") => {
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/admin/categories?search=${keywords}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setCategories(response.data.data.data);
      setPagination({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function for search input
  const searchData = async (e) => {
    setKeywords(e.target.value);
    fetchData(1, e.target.value);
  };

  // Function to delete a category
  const deleteCategory = (id) => {
    confirmAlert({
      title: "Are you sure?",
      message: "Want to delete this data?",
      buttons: [
        {
          label: "YES",
          onClick: async () => {
            await Api.delete(`/api/admin/categories/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              toast.success(response.data.message, { position: "top-center" });
              fetchData();
            });
          },
        },
        {
          label: "NO",
          onClick: () => {},
        },
      ],
    });
  };

  // Pagination Handler
  const handlePageChange = (pageNumber) => {
    fetchData(pageNumber, keywords);
  };

  return (
    <LayoutAdmin>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Categories List
        </h4>

        <div className="flex flex-row mb-4">
          <div className="w-full basis-1/4 sm:w-auto">
            {hasAnyPermissions(["categories.create"]) && (
              <Link
                to="/admin/categories/create"
                className="mx-2 inline-flex items-center justify-center rounded-md bg-meta-5 py-3.5 px-2 text-center text-md font-medium text-white hover:bg-opacity-90 sm:text-xs"
                type="button"
              >
                <i className="fa fa-plus-circle mr-2"></i> Add New
              </Link>
            )}
          </div>

          <div className="w-full basis-2/2">
            <form action="#" method="POST">
              <div className="relative">
                <input
                  type="text"
                  onChange={(e) => searchData(e)}
                  placeholder="Search here..."
                  className="w-full bg-transparent pl-10 pr-4 py-2 text-black dark:text-white border border-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="absolute left-0 top-1/2 -translate-y-1/2 p-2"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-bold uppercase xsm:text-base">No.</h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-bold uppercase xsm:text-base">
                Categories Name
              </h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-bold uppercase xsm:text-base">
                Icon
              </h5>
            </div>
            <div className="p-2.5 text-center col-span-2 xl:p-5">
              <h5 className="text-sm font-bold uppercase xsm:text-base">
                Actions
              </h5>
            </div>
          </div>

          {categories.length > 0 ? (
            categories.map((category, index) => (
              <div
                className={`grid grid-cols-4 sm:grid-cols-5 ${
                  index === categories.length - 1
                    ? ""
                    : "border-b border-stroke dark:border-strokedark"
                }`}
                key={category.id}
              >
                <div className="p-2.5 xl:p-5">{index + 1}</div>
                <div className="p-2.5 xl:p-5">
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="p-2.5 xl:p-5">
                  {/* Adjusted image styling */}
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-12 h-12 object-cover rounded-full mx-auto" // Smaller size and consistent scaling
                  />
                </div>
                <div className="flex justify-center col-span-2 p-2.5 xl:p-5 gap-2">
                  {/* Edit Button */}
                  <Link
                    to={`/admin/categories/edit/${category.id}`}
                    className="inline-flex items-center justify-center rounded-md bg-success py-2 px-4 text-sm font-medium text-white hover:bg-green-600"
                  >
                    <i className="fa fa-edit mr-2"></i> Edit
                  </Link>

                  {/* Delete Button */}
                  {hasAnyPermissions(["categories.delete"]) && (
                    <button
                      onClick={() => deleteCategory(category.id)}
                      className="inline-flex items-center justify-center rounded-md bg-danger py-2 px-4 text-sm font-medium text-white hover:bg-red-600"
                    >
                      <i className="fa fa-trash mr-2"></i> Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="w-full">
              <h5 className="flex justify-center my-3 text-lg font-semibold text-[#9D5425]">
                No Data Found!
              </h5>
            </div>
          )}
        </div>
        {/* Pagination Component */}
        <Pagination
          className="flex justify-end my-4"
          currentPage={pagination.currentPage}
          totalCount={pagination.total}
          pageSize={pagination.perPage}
          onPageChange={handlePageChange}
        />
      </div>
    </LayoutAdmin>
  );
}
