//import react-router-dom
import { Link, useNavigate } from "react-router-dom";
//import react
import { useEffect, useRef, useState } from "react";

//import LayoutAdmin
import LayoutAdmin from "../../../layouts/Admin";

//import Api
import Api from "../../../services/Api";

//import toast js
import toast from "react-hot-toast";
//import Cookies js
import Cookies from "js-cookie";
//import ReactQuil
import ReactQuill from "react-quill";
//quill CSS
import "react-quill/dist/quill.snow.css";
import SelectGroupTwo from "../../../components/general/SelectGroupTwo";

export default function Create() {
  //page title
  document.title = "Create Posts - Desa Digital";

  const formRef = useRef(null);
  const quillRef = useRef(null);

  //navigate
  const navigate = useNavigate();

  //define state "posts"
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  const [categories, setCategories] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //function "fetchDataCategiries"
  const fetchDataCategories = async () => {
    await Api.get(`/api/admin/categories/all`, {
      //header
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state "categories"
      setCategories(response.data.data);
    });
  };

  //useEffect
  useEffect(() => {
    //call fucntion "fetchData"
    fetchDataCategories();

    quillRef.current.getEditor();
  }, []);

  //function "statePosts"
  const storePosts = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category_id", categoryID);
    formData.append("content", content);

    //sending data
    await Api.post(`/api/admin/posts`, formData, {
      //header
      headers: {
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
        navigate("/admin/posts");
      })
      .catch((err) => {
        //set errors to state "setErrors"
        setErrors(err.response.data);
      });
  };

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset(); // Reset form fields
    }
    setTitle(""); // Reset name state
    setImage(""); // Reset image state
    setContent(""); // Reset image state
    setCategoryID("");
    setErrors([]); // Clear errors
  };

  return (
    <LayoutAdmin>
      <Link
        to="/admin/posts/"
        type="submit"
        className="mx-2 my-3 inline-flex items-center justify-center rounded-md bg-lime-50 py-2 px-6 text-center text-sm font-medium text-black hover:bg-opacity-90 lg:px-6 xl:px-8 outline outline-2 outline-black"
      >
        <i className="fa-solid fa-arrow-left mr-2"></i> Back
      </Link>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add Category
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <form onSubmit={storePosts}>
            <div className="my-2">
              <label className="mb-3 block text-black dark:text-white">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter role name.."
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.title && (
                <div className="w-full">
                  <p className="mb-3 text-sm font-semibold text-[#bd2929]">
                    {errors.title[0]}
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="basis-128">
                <label
                  htmlFor="category"
                  className="text-black dark:text-white block"
                >
                  Category
                </label>
                <SelectGroupTwo
                  id="category"
                  value={categoryID} // Ensure this is a string or number, defaulting to an empty string
                  onChange={(e) => setCategoryID(e)} // Pass the value directly here
                  options={categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))}
                  placeholder="-- Select Category --"
                />
                {errors.category_id && (
                  <div className="mt-2 text-sm text-[#bd2929]">
                    {errors.category_id[0]}
                  </div>
                )}
              </div>

              <div className="basis-128">
                <label className="block text-black dark:text-white">
                  Image file
                </label>
                <input
                  type="file"
                  id="file"
                  accept="images/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-black dark:focus:border-primary"
                />
                {errors.image && (
                  <div className="w-full">
                    <p className="mb-3 text-sm font-semibold text-[#bd2929]">
                      {errors.image[0]}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="mb-5">
                <label htmlFor="content" className="form-label font-bold">
                  Content
                </label>
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  placeholder="Enter Content..."
                  style={{ width: "100%", height: 350 }}
                />
              </div>
              {errors.content && (
                <div className="w-full">
                  <p className="mb-3 text-sm font-semibold text-[#bd2929]">
                    {errors.content[0]}
                  </p>
                </div>
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
    </LayoutAdmin>
  );
}
