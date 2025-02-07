//import react
import { useEffect, useState } from "react";
//import react-router-dom
import { Link } from "react-router-dom";

//import LayoutAdmin
import LayoutAdmin from "../../../layouts/Admin";

//import Api
import Api from "../../../services/Api";
//import Pagination
import Pagination from "../../../components/general/Pagination";
//import hasAnyPermission
import hasAnyPermissions from "../../../utils/Permissions";

//improt Cookies js
import Cookies from "js-cookie";
import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";
import { MdPersonSearch } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";

export default function PagesIndex() {
  //title Page
  document.title = "Pages - Desa Digital";

  //define pages state
  const [pages, setPages] = useState([]);

  //define Pagination
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //define keywords state
  const [keywords, setKeywords] = useState("");

  //token
  const token = Cookies.get("token");

  //function "fetchData"
  const fetchData = async (pageNumber = 1, keywords = "") => {
    //define variabel "page"
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/admin/pages?search=${keywords}&page=${page}`, {
      //headers
      headers: {
        //headers + token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data response to state "setPages"
      setPages(response.data.data.data);

      //set data pagination to state "pagination"
      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchData"
    fetchData();
  }, []);

  //function "search Data"
  const searchData = async (e) => {
    //set value to state "keyword"
    setKeywords(e.target.value);

    //call method "fetchdate"
    fetchData(1, e.target.value);
  };

  //function "deletePage"
  const deletePage = (id) => {
    confirmAlert({
      title: "Delete Data Page",
      message: "Are you sure ?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await Api.delete(`/api/admin/pages/${id}`, {
              //headers
              headers: {
                //headers + token
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              //show toast
              toast.success(response.data.message, {
                position: "top-center",
                duration: 6000,
              });

              //function "fetchData"
              fetchData();
            });
          },
        },
        {
          label: "No",
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
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default lg:dark:bg-meta-4 sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Categories List
        </h4>

        <div className="flex flex-row mb-4">
          <div className="w-full basis-1/4 sm:w-auto">
            {hasAnyPermissions(["pages.create"]) && (
              <Link
                to="/admin/pages/create"
                className="mx-2 inline-flex items-center justify-center rounded-md bg-meta-5 py-3.5 px-2 text-center text-md font-medium text-white hover:bg-opacity-90 sm:text-xs"
                type="button"
              >
                <FaCirclePlus className="text-white mr-2" /> Add New
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
                  <MdPersonSearch />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="rounded-lg border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-stroke dark:border-strokedark">
              <thead>
                <tr className="bg-bodydark2 text-left dark:bg-meta-4">
                  <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 border border-stroke dark:border-strokedark">
                    No.
                  </th>
                  <th className="min-w-[115px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 border border-stroke dark:border-strokedark">
                    Title Page
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white border border-stroke dark:border-strokedark">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {pages.length > 0 ? (
                  pages.map((page, index) => (
                    <tr
                      className={`${index === pages.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"}`}
                      key={page.id}
                    >
                      <td className="py-5 px-4 pl-9 border border-stroke dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {index + 1}
                        </h5>
                      </td>
                      <td className="py-5 px-4 pl-9 border border-stroke dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {page.title}
                        </h5>
                      </td>
                      <td className="py-5 px-4 pl-9 border border-stroke dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          <Link
                            to={`/admin/pages/edit/${page.id}`}
                            className="inline-flex items-center justify-center rounded-md bg-success py-2 px-4 text-sm font-medium text-white hover:bg-green-600"
                          >
                            <i className="fa fa-edit mr-2"></i> Edit
                          </Link>

                          {hasAnyPermissions(["pages.delete"]) && (
                            <button
                              onClick={() => deletePage(page.id)}
                              className="inline-flex items-center justify-center rounded-md bg-danger py-2 px-4 text-sm font-medium text-white hover:bg-red-600"
                            >
                              <i className="fa fa-trash mr-2"></i> Delete
                            </button>
                          )}
                        </h5>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-5 text-center text-lg font-semibold text-red-500 dark:text-white border border-stroke dark:border-strokedark"
                    >
                      No Data Found!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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

      <main>
        <div className="container-fluid px-4 mt-5">
          <div className="row">
            <div className="col-md-9">
              <div className="row">
                {hasAnyPermissions(["pages.create"]) && (
                  <div className="col-md-3 col-12 mb-2">
                    <Link
                      to="/admin/pages/create"
                      className="btn btn-primary border-0 shadow-sm w-100"
                      type="button"
                    >
                      <FaCirclePlus className="text-white mr-2" /> Add New
                    </Link>
                  </div>
                )}

                <div className="col-md-9 col-12 mb-2">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control border-0 shadow-sm"
                      onChange={(e) => searchData(e)}
                      placeholder="search here.."
                    />
                    <span className="input-group-text border-0 shadow-sm">
                      <i className="fa fa-search"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-md-12">
              <div className="card border-0 rounded shadow-sm border-sm border-top-success">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-centered table-nowrap mb-0 rounded">
                      <thead className="thead-dark">
                        <tr className="border-0">
                          <th className="border-0" style={{ width: "5%" }}>
                            No.
                          </th>
                          <th className="border-0">Title</th>
                          <th className="border-0" style={{ width: "15%" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          //cek apakah data ada?
                          pages.length > 0 ? (
                            //looping data "pages" dengan "map"
                            pages.map((page, index) => (
                              <tr key={index}>
                                <td className="fw-bold text-center">
                                  {++index +
                                    (pagination.currentPage - 1) *
                                      pagination.perPage}
                                </td>
                                <td>{page.title}</td>
                                <td className="text-center">
                                  {hasAnyPermissions(["pages.edit"]) && (
                                    <Link
                                      to={`/admin/pages/edit/${page.id}`}
                                      className="btn btn-warning btn-sm me-2"
                                    >
                                      <i className="fa fa-pencil-alt"></i>
                                    </Link>
                                  )}

                                  {hasAnyPermissions(["pages.delete"]) && (
                                    <button
                                      className="btn btn-danger btn-sm me-2"
                                      onClick={() => deletePage(page.id)}
                                    >
                                      <i className="fa fa-trash"></i>
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            //tampilan pesan data belum tersedia
                            <tr>
                              <td colSpan={5}>
                                <div
                                  className="alert alert-danger border-0 rounded shadow-sm w-100 text-center"
                                  role="alert"
                                >
                                  Data Not Availabel..
                                </div>
                              </td>
                            </tr>
                          )
                        }
                      </tbody>
                    </table>
                  </div>

                  <Pagination
                    currentPage={pagination.currentPage}
                    perPage={pagination.perPage}
                    total={pagination.total}
                    onChange={(pageNumber) => fetchData(pageNumber, keywords)}
                    position="end"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
