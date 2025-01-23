import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import Cookies from "js-cookie";
import hasAnyPermissions from "../../../utils/Permissions";
import Api from "../../../services/Api";
import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";

export default function CategoriesIndex() {
  document.title = "Categories - Desa Digital";

  // State untuk kategori dan pagination
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });
  const [keywords, setKeywords] = useState("");

  // Ambil token dari cookies
  const token = Cookies.get("token");

  // Fungsi untuk mengambil data kategori
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

  // Fungsi untuk mencari kategori
  const searchData = async (e) => {
    setKeywords(e.target.value);
    fetchData(1, e.target.value);
  };

  // Fungsi untuk menghapus kategori
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
                className="inline-flex items-center justify-center gap-2.5 bg-primary py-2.5 px-6 text-center font-medium text-white hover:bg-opacity-90 rounded-lg shadow-md"
                type="button"
              >
                <i className="fa fa-plus-circle"></i> Add New
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
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                No.
              </h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Categories Name
              </h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Icon
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
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
                key={index}
              >
                <div className="fw-bold text-center p-2.5 xl:p-5">
                  {++index + (pagination.currentPage - 1) * pagination.perPage}
                </div>
                <div className="p-2.5 xl:p-5">{category.name}</div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      style={{ width: "40px", height: "40px" }}
                    />
                  ) : (
                    <span>No icon</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-center p-2.5 mx-2 xl:p-5">
                  {hasAnyPermissions(["categories.edit"]) && (
                    <Link
                      to={`/admin/categories/edit/${category.id}`}
                      className="flex flex-col items-center justify-center bg-meta-3 text-center text-white hover:bg-opacity-90 rounded-lg shadow-md py-2 px-4 text-xs"
                      type="button"
                    >
                      <i className="fa fa-pencil-alt text-sm mb-1"></i>
                      <span className="text-xs">Edit</span>
                    </Link>
                  )}

                  {hasAnyPermissions(["categories.delete"]) && (
                    <button
                      className="flex flex-col items-center justify-center bg-meta-1 text-center text-white hover:bg-opacity-90 rounded-lg shadow-md py-2 px-4 text-xs"
                      type="button"
                      onClick={() => deleteCategory(category.id)}
                    >
                      <i className="fa fa-trash"></i>Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-5">
              <div
                className="alert alert-danger border-0 rounded shadow-sm w-100"
                role="alert"
              >
                Data Not Available..
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <nav>
              <ul className="flex list-none space-x-2">
                {/* Previous Page Button */}
                <li>
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="px-4 py-2 bg-gray-300 text-black rounded-lg disabled:bg-gray-500"
                  >
                    Prev
                  </button>
                </li>
                {/* Page Numbers */}
                {Array.from(
                  { length: Math.ceil(pagination.total / pagination.perPage) },
                  (_, i) => (
                    <li key={i}>
                      <button
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-4 py-2 rounded-lg ${
                          pagination.currentPage === i + 1
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-black"
                        }`}
                      >
                        {i + 1}
                      </button>
                    </li>
                  )
                )}
                {/* Next Page Button */}
                <li>
                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={
                      pagination.currentPage ===
                      Math.ceil(pagination.total / pagination.perPage)
                    }
                    className="px-4 py-2 bg-gray-300 text-black rounded-lg disabled:bg-gray-500"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
