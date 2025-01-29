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

//import cookies js
import Cookies from "js-cookie";
//import hasAnyPermission
import hasAnyPermissions from "../../../utils/Permissions";
import SlidersCreate from "./Create";
import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";

export default function SlidersIndex() {
  //page title
  document.title = "Slider - Desa Digital";

  //define state "sliders"
  const [sliders, setSliders] = useState("");

  //define state "Pagination"
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //token from cookies
  const token = Cookies.get("token");

  //function fetchData
  const fetchData = async (pageNumber = 1) => {
    const page = pageNumber || pagination.currentPage;
    try {
      const response = await Api.get(`/api/admin/sliders?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Set sliders data and pagination
      setSliders(response.data.data.data);
      setPagination({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      });

      console.log("response:", response.data.data.data);
    } catch (error) {
      console.error(
        "Error fetching sliders:",
        error.response?.data || error.message
      );
      toast.error("Error fetching sliders. Please try again later.", {
        position: "top-center",
        duration: 5000,
      });
    }
  };

  //useEffect
  useEffect(() => {
    //call funtion fetchData
    fetchData();
  }, []);

  //function deleteSliders
  const deleteSliders = (id) => {
    confirmAlert({
      title: "Delete Slider Data",
      message: "Are you sure delete this slider ?",
      buttons: [
        {
          label: "YES",
          onClick: async () => {
            await Api.delete(`/api/admin/sliders/${id}`, {
              //header
              headers: {
                //header + token
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              //show toast
              toast.success(response.data.message, {
                position: "top-center",
                duration: 5000,
              });

              //call function "fetchData"
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
    fetchData(pageNumber);
  };

  return (
    <LayoutAdmin>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div>
          {hasAnyPermissions(["photos.create"]) && (
            <SlidersCreate fetchData={fetchData} />
          )}
        </div>

        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Slider Lists
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-bold uppercase xsm:text-base">No.</h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-bold uppercase text-center xsm:text-base">
                Image
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-bold uppercase text-center xsm:text-base">
                Actions
              </h5>
            </div>
          </div>

          {sliders.length > 0 ? (
            sliders.map((photo, index) => (
              <div
                className={`grid grid-cols-4 sm:grid-cols-5 ${
                  index === sliders.length - 1
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
                    alt="image slider"
                    className="w-12 h-12 object-cover rounded-full mx-auto" // Smaller size and consistent scaling
                  />
                </div>
                <div className="flex justify-center p-2.5 xl:p-5 gap-2">
                  {/* Delete Button */}
                  {hasAnyPermissions(["sliders.delete"]) && (
                    <button
                      onClick={() => deleteSliders(photo.id)}
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
