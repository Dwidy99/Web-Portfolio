//import react
import { useEffect, useState } from "react";
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

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid md-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/products"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-user"></i> Update Product
                  </h6>
                  <hr />
                  <form onSubmit={updateProduct}>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label fw-bold">
                        Image
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                      />

                      {errors.image && (
                        <div className="mt-1 alert alert-danger col-md-6">
                          {errors.image[0]}
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label fw-bold">
                            Title Product
                          </label>
                          <input
                            type="title"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter Title Post.."
                          />

                          {errors.title && (
                            <div className="mt-1 alert alert-danger col-md-6">
                              {errors.title[0]}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="phone" className="form-label fw-bold">
                            Phone
                          </label>
                          <input
                            type="phone"
                            className="form-control"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter phone.."
                          />
                          {errors.phone && (
                            <div className="mt-1 alert alert-danger col-md-6">
                              {errors.phone[0]}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="content" className="form-label fw-bold">
                        Content
                      </label>
                      <ReactQuill
                        theme="snow"
                        rows="5"
                        value={content}
                        onChange={(content) => setContent(content)}
                        placeholder="Enter Content.."
                      />
                      {errors.content && (
                        <div className="mt-1 alert alert-danger col-md-6">
                          {errors.content[0]}
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="owner" className="form-label fw-bold">
                            Owner
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                            placeholder="Enter phone.."
                          />
                          {errors.owner && (
                            <div className="mt-1 alert alert-danger col-md-6">
                              {errors.owner[0]}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="price" className="form-label fw-bold">
                            Price
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter phone.."
                          />
                          {errors.price && (
                            <div className="mt-1 alert alert-danger col-md-6">
                              {errors.price[0]}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="address" className="form-label fw-bold">
                        Address
                      </label>
                      <textarea
                        className="form-control fw-bold"
                        rows="3"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter Address"
                      ></textarea>
                      {errors.address && (
                        <div className="mt-1 alert alert-danger col-md-6">
                          {errors.address[0]}
                        </div>
                      )}
                    </div>

                    <div className="mt-3">
                      <button
                        type="submit"
                        className="btn btn-md btn-primary me-2"
                      >
                        <i className="fa fa-save"></i> Save
                      </button>
                      <button type="reset" className="btn btn-md btn-warning">
                        <i className="fa fa-redo"></i> Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
