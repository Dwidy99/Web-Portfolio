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

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {hasAnyPermissions(["posts.create"]) && (
                  <div className="col-md-3 col-12 mb-12">
                    <Link
                      to="/admin/posts/create"
                      className="btn btn-md btn-primary border-primary border-0 shadow w-100"
                      type="button"
                    >
                      <i className="fa fa-plus-circle"></i> Add new
                    </Link>
                  </div>
                )}

                <div className="col-md-9 col-12 mb-2">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
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
                          <th className="border-0" style={{ width: "20%" }}>
                            Category
                          </th>
                          <th className="border-0" style={{ width: "15%" }}>
                            User
                          </th>
                          <th className="border-0" style={{ width: "15%" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          //cek apakah data ada?
                          posts.length > 0 ? (
                            //looping data "posts" dengan "map"
                            posts.map((posts, index) => (
                              <tr key={index}>
                                <td className="fw-bold text-center">
                                  {++index +
                                    (pagination.currentPage - 1) *
                                      pagination.perPage}
                                </td>
                                <td>{posts.title}</td>
                                <td>{posts.category.name}</td>
                                <td>{posts.user.name}</td>
                                <td className="text-center">
                                  {hasAnyPermissions(["posts.edit"]) && (
                                    <Link
                                      to={`/admin/posts/edit/${posts.id}`}
                                      className="btn btn-primary btn-sm me-2"
                                    >
                                      <i className="fa fa-pencil-alt"></i>
                                    </Link>
                                  )}

                                  {hasAnyPermissions(["posts.delete"]) && (
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() => deletePost(posts.id)}
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
                              <td colSpan={4}>
                                <div
                                  className="alert alert-danger border-0 rounded shadow-sm w-100 text-center"
                                  role="alert"
                                >
                                  Data Not Available..
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
