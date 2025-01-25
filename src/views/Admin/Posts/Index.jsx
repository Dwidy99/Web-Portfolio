//import react
import { useEffect, useState } from "react";
//import LayoutAdmin
import LayoutAdmin from "../../../layouts/Admin";
//import react-router-dom
import { Link } from "react-router-dom";

//import Api
import Api from "../../../services/Api";
//import Api
import Pagination from "../../../components/general/Pagination";
//import hasAnyPermission
import hasAnyPermissions from "../../../utils/Permissions";

//import Cookies js
import Cookies from "js-cookie";
import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";

export default function PostsIndex() {
  //Page title
  document.title = "Posts - Desa Digital";

  //define state "posts"
  const [posts, setPosts] = useState([]);

  //define state "pagination"
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //define state "keywords"
  const [keywords, setKeywords] = useState("");

  //token from cookies
  const token = Cookies.get("token");

  //function "fetchData"
  const fetchData = async (pageNumber = 1, keywords = "") => {
    //define variabel "page"
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/admin/posts?search=${keywords}&page=${page}`, {
      //header
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data reponse to state "setposts"
      setPosts(response.data.data.data);

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

  //function "searchData"
  const searchData = (e) => {
    //set valeu to state "keywords"
    setKeywords(e.target.value);

    //call function "fetchData"
    fetchData(1, e.target.value);
  };

  //function "deletePosts"
  const deletePost = (id) => {
    //show confirm alert
    confirmAlert({
      title: "Are you sure?",
      message: "want to delete this data ?",
      buttons: [
        {
          label: "YES",
          onClick: async () => {
            await Api.delete(`/api/admin/posts/${id}`, {
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

              //function fetchData
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
          Post Lists
        </h4>

        <div className="flex flex-row mb-4">
          <div className="w-full basis-1/4 sm:w-auto">
            {hasAnyPermissions(["posts.create"]) && (
              <Link
                to="/admin/posts/create"
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
                Title
              </h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-bold uppercase xsm:text-base">
                Category
              </h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-bold uppercase xsm:text-base">
                User
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-bold uppercase xsm:text-base">
                Actions
              </h5>
            </div>
          </div>

          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div
                className={`grid grid-cols-4 sm:grid-cols-5 ${
                  index === posts.length - 1
                    ? ""
                    : "border-b border-stroke dark:border-strokedark"
                }`}
                key={post.id}
              >
                <div className="p-2.5 xl:p-5">{index + 1}</div>
                <div className="p-2.5 xl:p-5">
                  <span className="font-medium">{post.title}</span>
                </div>
                <div className="p-2.5 xl:p-5">
                  {/* Adjusted image styling */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-12 h-12 object-cover rounded-full mx-auto" // Smaller size and consistent scaling
                  />
                </div>
                <div className="flex justify-center col-span-2 p-2.5 xl:p-5 gap-2">
                  {/* Edit Button */}
                  <Link
                    to={`/admin/posts/edit/${post.id}`}
                    className="inline-flex items-center justify-center rounded-md bg-success py-2 px-4 text-sm font-medium text-white hover:bg-green-600"
                  >
                    <i className="fa fa-edit mr-2"></i> Edit
                  </Link>

                  {/* Delete Button */}
                  {hasAnyPermissions(["posts.delete"]) && (
                    <button
                      onClick={() => deletePost(post.id)}
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
