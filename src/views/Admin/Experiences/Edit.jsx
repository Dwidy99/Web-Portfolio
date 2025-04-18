//import react
import { useEffect, useRef, useState } from "react";
//import react-router-dom
import { Link, useNavigate, useParams } from "react-router-dom";

import LayoutAdmin from "../../../layouts/Admin";

//import LayoutAdmin
import Api from "../../../services/Api";

//import Cookies js
import Cookies from "js-cookie";
//import toast js
import toast from "react-hot-toast";
import ReactQuill from "react-quill";

export default function ExperiencesEdit() {
  //page title
  document.title = "Edit Experience - My Portfolio";

  //navigate
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const formRef = useRef(null);

  //get is use useParams
  const { id } = useParams();

  const [icon, setIcon] = useState("");
  const [experienceName, setExperienceName] = useState("");
  const [experienceDescription, setExperienceDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [errors, setErrors] = useState([]);

  const [experienceIcon, setExperienceIcon] = useState("");

  //token
  const token = Cookies.get("token");

  const [_, setLoading] = useState(true);

  const fetchDataExperience = async () => {
    setLoading(true); // Set loading ke true sebelum fetching
    await Api.get(`/api/admin/experiences/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setExperienceName(response.data.data.experience_name);
        setExperienceDescription(response.data.data.experience_description);

        const startDateFromApi = new Date(response.data.data.start_date);
        const formattedStartDate = startDateFromApi.toISOString().slice(0, 10);
        setStartDate(formattedStartDate);

        const endDateFromApi = new Date(response.data.data.end_date);
        const formattedEndDate = endDateFromApi.toISOString().slice(0, 10);
        setEndDate(formattedEndDate);

        setExperienceIcon(response.data.data.icon);
      })
      .finally(() => {
        setLoading(false); // Set loading ke false setelah fetching selesai (berhasil atau gagal)
      });
  };

  useEffect(() => {
    fetchDataExperience();
    quillRef.current.getEditor();
  }, []);

  //function "updateExperience"
  const updateExperience = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData" (the order must same with the backend)
    formData.append("icon", icon);
    formData.append("experience_name", experienceName);
    formData.append("experience_description", experienceDescription);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("_method", "PUT");

    //sending data
    await Api.post(`/api/admin/experiences/${id}`, formData, {
      //headers
      headers: {
        //headers + token
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        //show toast
        toast.success(response.data.message, {
          position: "top-center",
          duration: 6000,
        });

        //navigate
        navigate("/admin/experiences");
      })
      .catch((err) => {
        console.log(err.response.data);

        setErrors(err.response.data);
      });
  };

  const handleReset = () => {
    if (formRef.current) formRef.current.reset();
    setExperienceName("");
    setExperienceDescription("");
    setIcon("");
    setStartDate("");
    setEndDate("");

    setErrors([]);
  };

  return (
    <LayoutAdmin>
      <Link
        to="/admin/experiences/"
        className="inline-flex items-center justify-center rounded-md bg-meta-4 text-white py-2 px-6 text-sm font-medium hover:bg-lime-400 focus:outline-none"
      >
        <i className="fa-solid fa-arrow-left mr-2"></i> Back
      </Link>

      <div className="rounded-lg border bg-white shadow-md mt-8 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Edit Experience
        </h3>
        <form ref={formRef} onSubmit={updateExperience}>
          {/* Experience ExperienceName */}
          <div className="grid grid-cols-2 gap-2 my-4 mb-6">
            <div className="basis-128">
              <label className="block text-sm font-medium text-gray-700">
                Experience Name
              </label>
              <input
                type="text"
                value={experienceName}
                onChange={(e) => setExperienceName(e.target.value)}
                placeholder="Enter Experience Name.."
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              {errors.experience_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.experience_name[0]}
                </p>
              )}
            </div>
          </div>

          <div className="my-3">
            <div className="basis-64 col-span-1">
              {experienceIcon ? (
                <div className="relative">
                  <img
                    src={experienceIcon}
                    alt={experienceName}
                    className="w-full h-auto rounded-lg shadow-md object-cover"
                    style={{ maxWidth: "150px", maxHeight: "150px" }}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-32 bg-gray-200 rounded-lg">
                  <p className="text-sm text-gray-600">No icon available</p>
                </div>
              )}
            </div>

            <div className="basis-128 col-span-3 mt-5">
              <label className="block text-sm font-medium text-gray-700">
                Company Icon
              </label>
              <input
                type="file"
                accept="icon/*"
                onChange={(e) => setIcon(e.target.files[0])}
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-black dark:focus:border-primary"
              />
              {errors.icon && (
                <p className="text-red-500 text-xs mt-1">{errors.icon[0]}</p>
              )}
            </div>
          </div>

          {/* Start Date & End Date */}
          <div className="grid grid-cols-2 gap-2 my-4">
            <div className="basis-128">
              <label className="form-label text-sm font-bold">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              {errors.start_date && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.start_date[0]}
                </p>
              )}
            </div>

            <div className="basis-128">
              <label className="form-label text-sm font-bold">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              {errors.end_date && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.end_date[0]}
                </p>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={experienceDescription}
              onChange={setExperienceDescription}
              placeholder="Enter Description..."
            />
            {errors.experience_description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.experience_description[0]}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex mt-5.5 items-center space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-500 focus:outline-none"
            >
              <i className="fa-solid fa-save mr-2"></i> Save
            </button>
            <button
              type="reset"
              onClick={handleReset}
              className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-400 focus:outline-none"
            >
              <i className="fa-solid fa-redo mr-2"></i> Reset
            </button>
          </div>
        </form>
      </div>
    </LayoutAdmin>
  );
}
