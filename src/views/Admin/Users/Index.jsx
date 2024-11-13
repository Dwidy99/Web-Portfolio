//import LayoutAdmin
import { useEffect, useState } from "react";
//import Link
import { Link } from "react-router-dom";
//import confirmAlert
import { confirmAlert } from "react-confirm-alert";

// import LayoutAdmin
import LayoutAdmin from "../../../layouts/Admin";

// import Api
import Api from "../../../services/Api";
//import hasAnyPermssions
import hasAnyPermissions from "../../../utils/Permissions";
//import Paination
import Pagination from "../../../components/general/Pagination";

//import Cookies js
import Cookies from "js-cookie";
//import toast js
import toast from "react-hot-toast";

export default function UsersIndex() {
  // title page
  document.title = "Users - Desa Digital";

  //define state "users"
  const [users, setUsers] = useState("");

  //define state "pagination"
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //define state "keywords"
  const [keywords, setKeywords] = useState("");

  //define Cookies
  const token = Cookies.get("token");

  //function fetchData
  const fetchData = async (pageNumber = 1, keywords = "") => {
    //define variabel "page"
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/admin/users?search=${keywords}&page=${page}`, {
      //header
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data response to state "setUsers"
      setUsers(response.data.data.data);

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
    //call fetchData
    fetchData();
  }, []);

  //function "search keywords"
  const searchData = async (e) => {
    //set value to state "keywords"
    setKeywords(e.target.value);

    //call function "fetchData"
    fetchData(1, e.target.value);
  };

  //function "deleteUser"
  const deleteUser = (id) => {
    //show confirm alert
    confirmAlert({
      title: "Are you sure?",
      message: "want to delete this data ?",
      buttons: [
        {
          label: "YES",
          onClick: async () => {
            await Api.delete(`/api/admin/users/${id}`, {
              //header
              headers: {
                //header + Bearer
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              toast.success(response.data.message, {
                position: "top-center",
                duration: 5000,
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
                {hasAnyPermissions(["users.create"]) && (
                  <div className="col-md-3 col-12 mb-12">
                    <Link
                      to="/admin/users/create"
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
                          <th className="border-0">Full Name</th>
                          <th className="border-0">Email Address</th>
                          <th className="border-0">Roles</th>
                          <th className="border-0" style={{ width: "15%" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          //cek apakah data ada?
                          users.length > 0 ? (
                            //looping data "users" dengan "map"
                            users.map((user, index) => (
                              <tr key={index}>
                                <td className="fw-bold text-center">
                                  {++index +
                                    (pagination.currentPage - 1) *
                                      pagination.perPage}
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="text-center">
                                  {user.roles.map((role) => (
                                    <span
                                      className="btn btn-warning btn-sm shadow-sm border-0 ms-2 mb-2 fw-normal"
                                      key={index}
                                    >
                                      {role.name}
                                    </span>
                                  ))}
                                </td>
                                <td className="text-center">
                                  {hasAnyPermissions(["users.edit"]) && (
                                    <Link
                                      to={`/admin/users/edit/${user.id}`}
                                      className="btn btn-primary btn-sm me-2"
                                    >
                                      <i className="fa fa-pencil-alt"></i>
                                    </Link>
                                  )}

                                  {hasAnyPermissions(["users.delete"]) && (
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() => deleteUser(user.id)}
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
