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

//import Cookies js
import Cookies from "js-cookie";
import hasAnyPermissions from "../../../utils/Permissions";

//import component create
import PhotosCreate from "./Create";
import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";

export default function PhotosIndex() {
  //page title
  document.title = "Photos - Desa Digital";

  //define state "photos"
  const [photos, setPhotos] = useState([]);

  //define state "pagination"
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //define state "keywords"
  const [keywords, setKeywords] = useState("");

  //token from Cookies
  const token = Cookies.get("token");

  //finction "fetchData"
  const fetchData = async (pageNumber = 1, keywords = "") => {
    const page = pageNumber ? pageNumber : pagination.currentPage;
    await Api.get(`/api/admin/photos?search${keywords}&page=${page}`, {
      //header
      headers: {
        //header + token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data response to state "setPosts"
      setPhotos(response.data.data.data);
      console.log(response.data.data.data);

      //set data response to state "pagination"
      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));
    });
  };

  //useEffect
  useEffect(() => {
    //call "fetchData"
    fetchData();
  }, []);

  //function "searchData"
  const searchData = async (e) => {
    //set value to state "keywords"
    setKeywords(e.target.value);

    //call function "fetchData"
    fetchData(1, e.target.value);
  };

  //function "deleteData"
  const deletePhoto = async (id) => {
    confirmAlert({
      title: "Delete Photo ?",
      message: "Are You Sure Delete Data ?",
      buttons: [
        {
          label: "YES",
          onClick: async () => {
            await Api.delete(`/api/admin/photos/${id}`, {
              //header
              headers: {
                //header + token
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              //show toast
              toast.success(response.data.message, {
                position: "top-center",
                duration: 6000,
              });

              //fetchData
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
            <div className="col-md-12">
              {hasAnyPermissions(["photos.create"]) && (
                <PhotosCreate fetchData={fetchData} />
              )}
            </div>
          </div>

          <div className="row mt-4">
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
                          <th className="border-0">Image</th>
                          <th className="border-0">Caption</th>
                          <th className="border-0" style={{ width: "15%" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          //cek apakah data ada?
                          photos.length > 0 ? (
                            //looping data "photos" dengan "map"
                            photos.map((photo, index) => (
                              <tr key={index}>
                                <td className="fw-bold text-center">
                                  {++index +
                                    (pagination.currentPage - 1) *
                                      pagination.perPage}
                                </td>
                                <td className="text-center">
                                  <img
                                    src={photo.image}
                                    width={"100px"}
                                    className="rounded"
                                  />
                                </td>
                                <td>{photo.caption}</td>
                                <td className="text-center">
                                  {hasAnyPermissions(["photos.edit"]) && (
                                    <Link
                                      to={`/admin/photos/edit/${photo.id}`}
                                      className="btn btn-primary btn-sm me-2"
                                    >
                                      <i className="fa fa-pencil-alt"></i>
                                    </Link>
                                  )}

                                  {hasAnyPermissions(["photos.delete"]) && (
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() => deletePhoto(photo.id)}
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
