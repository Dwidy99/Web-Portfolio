//import react
import { useRef, useState } from "react";

//import toast js
import Api from "../../../services/Api";

//import toast js
import toast from "react-hot-toast";
//import cookies js
import Cookies from "js-cookie";

export default function SlidersCreate(props) {
  const formRef = useRef(null);

  //state
  const [image, setImage] = useState("");

  //errors state
  const [errors, setErrors] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //function "storeSlider"
  const storeSlider = async (e) => {
    e.preventDefault();

    //define fromData
    const formData = new FormData();

    //append to image
    formData.append("image", image);

    await Api.post(`/api/admin/sliders`, formData, {
      //header
      headers: {
        //header + token
        Authorization: `Bearer ${token}`,
        "Content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        // Reset error messages
        setErrors("");

        //show toast
        toast.success(response.data.message, {
          position: "top-center",
          duration: 6000,
        });

        //set input file to null
        document.getElementById("file").value = "";

        //fetch data
        props.fetchData();

        //reset image form
        setImage("");
      })
      .catch((err) => {
        //set errors from response
        if (err.response && err.response.data) {
          setErrors(err.response.data);
        } else {
          setErrors("Something went wrong.");
        }
      });
  };

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset(); // Reset form fields
    }
    setImage(""); // Reset image state
    setErrors([]); // Clear errors
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-bold text-black dark:text-white">
          File upload Slider
        </h3>
      </div>
      <div className="flex flex-col gap-5.5 p-6.5">
        <form onSubmit={storeSlider}>
          <div className="mb-3">
            <label className="mb-2 block text-black dark:text-white">
              Image
            </label>
            <input
              type="file"
              id="file"
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              accept="images/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          {errors.image && (
            <div className="w-full">
              <p className="mb-3 text-sm font-semibold text-[#bd2929]">
                {errors.image[0]}
              </p>
            </div>
          )}

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
