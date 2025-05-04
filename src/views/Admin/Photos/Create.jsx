//import react
import { useRef, useState } from "react";

//import Api
import Api from "../../../services/Api";

//import toast js
import toast from "react-hot-toast";
//import Cookies js
import Cookies from "js-cookie";
import ReactQuillEditor from "../../../components/general/ReactQuillEditor";

import PropTypes from "prop-types";

export default function PhotosCreate(props) {
  const formRef = useRef(null);
  const quillRef = useRef(null);

  //define state "photo"
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [caption, setCaption] = useState("");

  //define state "errors"
  const [errors, setErrors] = useState([]);

  //token
  const token = Cookies.get("token");

  const storePhoto = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to formData
    formData.append("image", image);
    formData.append("link", link);
    formData.append("caption", caption);

    await Api.post(`/api/admin/photos`, formData, {
      //header
      headers: {
        //header + token
        Authorization: `Bearer ${token}`,
        "Content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        //show toast
        toast.success(response.data.message, {
          position: "top-center",
          duration: 6000,
        });

        //set input file to null
        document.getElementById("file").value = "";

        //fetchData
        props.fetchData();

        // Reset error messages
        setErrors("");
        setImage("");
        setLink("");
        setCaption("");
      })
      .catch((err) => {
        setErrors(err.response.data);
      });
  };

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset(); // Reset form fields
    }
    setImage(""); // Reset image state
    setLink(""); // Reset link state
    setCaption(""); // Reset caption state
    setErrors([]); // Clear errors
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-bold text-black dark:text-white">
          File upload Photo
        </h3>
      </div>
      <div className="flex flex-col gap-5.5 p-6.5">
        <form onSubmit={storePhoto}>
          <div className="grid grid-cols-2 gap-2">
            <div className="my-3">
              <label className="mb-3 font-bold">Image</label>
              <input
                type="file"
                id="file"
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                accept="images/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {errors.image && (
                <div className="w-full">
                  <p className="mb-3 text-sm font-semibold text-[#bd2929]">
                    {errors.image[0]}
                  </p>
                </div>
              )}
            </div>
            <div className="my-3">
              <label className="mb-3 font-bold">Link</label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter post link.."
                className="w-full rounded-lg border border-stroke py-3 px-5 outline-none transition focus:border-primary"
              />
              {errors.link && (
                <p className="text-sm text-red-600">{errors.link[0]}</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-3 font-bold">Caption</label>
            <ReactQuillEditor
              ref={quillRef}
              value={caption}
              onChange={setCaption}
              placeholder="Enter Caption..."
            />
            {errors.caption && (
              <p className="text-red-500 text-xs mt-1">{errors.caption[0]}</p>
            )}
          </div>
          <div className="flex my-4">
            <button
              type="submit"
              className="mx-2 inline-flex items-center justify-center rounded-md bg-blue-600 py-2 px-6 text-center text-sm font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8"
            >
              <i className="fa-solid fa-plus mr-2"></i> Add
            </button>
            <button
              type="reset"
              onClick={handleReset}
              className="mx-2 inline-flex items-center justify-center rounded-md bg-slate-600 py-2 px-6 text-center text-sm font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8"
            >
              <i className="fa-solid fa-eraser mr-2"></i> Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

PhotosCreate.propTypes = {
  fetchData: PropTypes.func, // fetchData harus function dan wajib diisi
};
