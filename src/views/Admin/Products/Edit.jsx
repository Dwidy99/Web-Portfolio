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

export default function ProductsEdit() {
  //page title
  document.title = "Edit Product - Desa Digital";

  //navigate
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const formRef = useRef(null);

  //get is use useParams
  const { id } = useParams();

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [owner, setOwner] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState([]);

  const [productImage, setProductImage] = useState("");

  //token
  const token = Cookies.get("token");

  //function "fetchDataProduct"
  const fetchDataProduct = async () => {
    await Api.get(`/api/admin/products/${id}`, {
      //headers
      headers: {
        //headers + token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setTitle(response.data.data.title);
      setContent(response.data.data.content);
      setOwner(response.data.data.owner);
      setPrice(response.data.data.price);
      setPhone(response.data.data.phone);
      setAddress(response.data.data.address);

      setProductImage(response.data.data.image);
    });
  };

  //hook "useEffect"
  useEffect(() => {
    fetchDataProduct();
  }, []);

  //function "updateProduct"
  const updateProduct = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData" (the order must same with the backend)
    formData.append("image", image);
    formData.append("title", title);
    formData.append("owner", owner);
    formData.append("price", price);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("content", content);
    formData.append("_method", "PUT");

    //sending data
    await Api.post(`/api/admin/products/${id}`, formData, {
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
        navigate("/admin/products");
      })
      .catch((err) => {
        setErrors(err.response.data);
      });
  };

  const handleReset = () => {
    if (formRef.current) formRef.current.reset();
    setTitle("");
    setImage("");
    setOwner("");
    setPrice("");
    setAddress("");
    setPhone("");
    setContent("");
    setErrors([]);
  };

  return (
    <LayoutAdmin>
      <Link
        to="/admin/products/"
        className="inline-flex items-center justify-center rounded-md bg-meta-4 text-white py-2 px-6 text-sm font-medium hover:bg-lime-400 focus:outline-none"
      >
        <i className="fa-solid fa-arrow-left mr-2"></i> Back
      </Link>

      <div className="rounded-lg border bg-white shadow-md mt-8 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Edit Post</h3>
        <form ref={formRef} onSubmit={updateProduct}>
          {/* Post Title */}
          <div className="grid grid-cols-2 gap-2 my-4 mb-6">
            <div className="basis-128">
              <label className="block text-sm font-medium text-gray-700">
                Product Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Post Title"
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title[0]}</p>
              )}
            </div>

            <div className="basis-128">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Post Title"
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price[0]}</p>
              )}
            </div>
          </div>

          <div className="my-3">
            <div className="basis-64 col-span-1">
              {productImage ? (
                <div className="relative">
                  <img
                    src={productImage}
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
              <label className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-black dark:focus:border-primary"
              />
              {errors.image && (
                <p className="text-red-500 text-xs mt-1">{errors.image[0]}</p>
              )}
            </div>
          </div>

          {/* Post Image */}
          <div className="grid grid-cols-6 gap-2 my-4 mb-6">
            <div className="basis-128 col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Post Owner.."
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone[0]}</p>
              )}
            </div>

            <div className="basis-128 col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Owner
              </label>
              <input
                type="text"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                placeholder="Enter Post Owner.."
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              {errors.owner && (
                <p className="text-red-500 text-xs mt-1">{errors.owner[0]}</p>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              rows={6}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
            {errors.address && (
              <div className="mt-1 alert alert-danger col-md-6">
                {errors.address[0]}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={content}
              onChange={setContent}
              placeholder="Enter Post Content..."
              className="w-full h-100 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            {errors.content && (
              <p className="text-red-500 text-xs mt-1">{errors.content[0]}</p>
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
