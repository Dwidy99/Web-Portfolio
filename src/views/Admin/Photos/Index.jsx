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

  // Pagination Handler
  const handlePageChange = (pageNumber) => {
    fetchData(pageNumber, keywords);
  };

  return (
    <LayoutAdmin>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div>
          {hasAnyPermissions(["photos.create"]) && (
            <PhotosCreate fetchData={fetchData} />
          )}
        </div>

        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Post Lists
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-bold uppercase xsm:text-base">No.</h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-bold uppercase xsm:text-base">
                Image
              </h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-bold uppercase xsm:text-base">
                Caption
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-bold uppercase xsm:text-base">
                Actions
              </h5>
            </div>
          </div>

          {photos.length > 0 ? (
            photos.map((photo, index) => (
              <div
                className={`grid grid-cols-4 sm:grid-cols-5 ${
                  index === photos.length - 1
                    ? ""
                    : "border-b border-stroke dark:border-strokedark"
                }`}
                key={photo.id}
              >
                <div className="p-2.5 xl:p-5">{index + 1}</div>
                <div className="p-2.5 xl:p-5">
                  {/* Adjusted image styling */}
                  <img
                    src={photo.image}
                    alt={photo.caption}
                    className="w-12 h-12 object-cover rounded-full mx-auto" // Smaller size and consistent scaling
                  />
                </div>
                <div className="p-2.5 xl:p-5">
                  <span className="font-medium">{photo.caption}</span>
                </div>
                <div className="flex justify-center p-2.5 xl:p-5 gap-2">
                  {/* Delete Button */}
                  {hasAnyPermissions(["photos.delete"]) && (
                    <button
                      onClick={() => deletePhoto(photo.id)}
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
