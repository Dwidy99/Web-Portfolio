//import react
import { useEffect, useRef, useState } from "react";
//import react-router-dom
import { Link, useNavigate, useParams } from "react-router-dom";
//quill CSS
import "react-quill/dist/quill.snow.css";

//import LayoutAdmin
import LayoutAdmin from "../../../layouts/Admin";

//import Api
import Api from "../../../services/Api";

//import Cookies js
import Cookies from "js-cookie";
//import toast js
import toast from "react-hot-toast";

export default function ProfilesIndex() {
  document.title = "Edit Profile - My Portfolio";

  const navigate = useNavigate();
  const formRef = useRef(null);

  // const { id } = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  const [profileImage, setProfileImage] = useState(""); // URL for the profile image
  const token = Cookies.get("token");
  
  const user = JSON.parse(Cookies.get("user"));  
  console.log(user);
  

  const fetchDataProfile = async () => {
    // Pastikan user dan token tersedia sebelum melakukan request
    if (!user?.id || !token) {
      toast.error("User authentication error!", { position: "top-center" });
      return;
    }
  
    try {
      const response = await Api.get(`/api/admin/profiles/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Cek jika response sukses dan memiliki data
      const data = response?.data?.data;
  
      if (!data || Object.keys(data).length === 0) {
        toast.error("Profile data not found!", { position: "top-center" });
        setTitle("No profile available");
        setProfileImage(""); // Bisa diisi dengan placeholder image jika kosong
        setContent("No address available.");
        return;
      }
  
      // Set state dengan data yang tersedia
      setTitle(data.title || "Untitled");
      setProfileImage(data.image || ""); // Bisa diisi dengan placeholder image jika kosong
      setContent(data.content || "No content available.");
  
    } catch (error) {
      console.error("Failed to fetch profile:", error);
  
      // Tangani error dengan status yang lebih spesifik
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("Profile not found!", { position: "top-center" });
        } else if (error.response.status === 401) {
          toast.error("Unauthorized access! Please log in again.", {
            position: "top-center",
          });
          navigate("/login"); // Redirect ke login jika token tidak valid
        } else {
          toast.error(`Error ${error.response.status}: ${error.response.data.message || "Something went wrong!"}`, {
            position: "top-center",
          });
        }
      } else {
        toast.error("Failed to fetch profile data!", { position: "top-center" });
      }
  
      // Set state ke default agar tidak crash
      setTitle("No profile available");
      setProfileImage("");
      setContent("No address available.");
    }
  };
  

  const updateProfiles = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("content", content);
    formData.append("_method", "PUT");

    await Api.post(`/api/admin/profiles/${user.id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-center",
          duration: 6000,
        });
        navigate("/admin/profiles");
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };

  const handleReset = () => {
    if (formRef.current) formRef.current.reset();
    setTitle("");
    setImage("");
    setContent("");
    setErrors([]);
  };

  useEffect(() => {
    fetchDataProfile();
  }, []);

  return (
    <LayoutAdmin>
      <Link
        to="/admin/profiles/"
        className="inline-flex items-center justify-center rounded-md bg-meta-4 text-white py-2 px-6 text-sm font-bold hover:bg-lime-400 focus:outline-none"
      >
        <i className="fa-solid fa-arrow-left mr-2"></i> Back
      </Link>

      <div className="rounded-lg border bg-white shadow-md mt-8 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Edit Profile</h3>
        <form ref={formRef} onSubmit={updateProfiles}>
          {/* Profile Title */}
          <div className="grid grid-cols-2 gap-2 my-4 mb-6">
            <div className="basis-128">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Profile Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Profile Title"
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title[0]}</p>
              )}
            </div>
          </div>

          {/* Profile Image */}
          <div className="grid grid-cols-4 gap-2 my-4 mb-6">
            <div className="basis-64">
              {profileImage ? (
                <div className="relative">
                  <img
                    src={profileImage}
                    alt={title}
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

            <div className="basis-128 col-span-3">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-black dark:focus:border-primary"
              />
              {errors.image && (
                <p className="text-red-500 text-xs">{errors.image[0]}</p>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="content"
              className="block text-sm font-bold text-gray-700"
            >
              Address
            </label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter Address"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
            {errors.content && (
              <div className="mt-1 alert alert-danger col-md-6">
                <p className="text-red-500 text-xs">{errors.content[0]}</p>
              </div>
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
