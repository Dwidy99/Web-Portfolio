//import react
import { useEffect, useRef, useState } from "react";
//import react-router-dom
import { Link, useNavigate, useParams } from "react-router-dom";
//import reactQuill
import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

//import LayoutAdmin
import LayoutAdmin from "../../../layouts/Admin";

//import Api
import Api from "../../../services/Api";

//import Cookies js
import Cookies from "js-cookie";
//import toast js
import toast from "react-hot-toast";

export default function PostEdit() {
  //page title
  document.title = "Edit Posts - Desa Digital";

  //navigate
  const navigate = useNavigate();

  //quillRef
  const quilRef = useRef();

  // call params
  const { id } = useParams();

  //define state for form
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [category_id, setcategory_id] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  const [categories, setCategories] = useState([]);

  //define token
  const token = Cookies.get("token");

  //function "fetchDataCategories"
  const fetchDataCategories = async () => {
    await Api.get(`/api/admin/categories/all`, {
      //headers
      headers: {
        //headers + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state "setCategories"
      setCategories(response.data.data);
    });
  };

  //   function "fetchDataPost"
  const fetchDataPost = async () => {
    await Api.get(`/api/admin/posts/${id}`, {
      //headers
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state
      setTitle(response.data.data.title);
      setcategory_id(response.data.data.category_id);
      setContent(response.data.data.content);
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchDataCategories"
    fetchDataCategories();

    //call function "fetchDataPost"
    fetchDataPost();
  }, []);

  //function "updatePost"
  const updatePosts = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //update data to "formData"
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category_id", category_id);
    formData.append("content", content);
    formData.append("_method", "PUT");

    //sending data
    await Api.post(`/api/admin/posts/${id}`, formData, {
      //header
      headers: {
        //header Bearer + Token
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

        //redirect
        navigate("/admin/posts");
      })
      .catch((error) => {
        //set error message to state "errors"
        setErrors(error.response.data);
      });
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/posts"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-user"></i> Update Posts
                  </h6>
                  <hr />
                  <form onSubmit={updatePosts}>
                    <div className="row">
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
                      </div>
                      {errors.image && (
                        <div className="alert alert-danger">
                          {errors.image[0]}
                        </div>
                      )}

                      <div className="mb-3">
                        <label htmlFor="title" className="form-label fw-bold">
                          Title post
                        </label>
                        <input
                          type="title"
                          className="form-control"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter Title Post.."
                        />
                      </div>
                      {errors.title && (
                        <div className="alert alert-danger">
                          {errors.title[0]}
                        </div>
                      )}

                      <div className="mb-3">
                        <label
                          htmlFor="category"
                          className="form-label fw-bold"
                        >
                          Category
                        </label>
                        <select
                          className="form-select"
                          value={category_id}
                          onChange={(e) => setcategory_id(e.target.value)}
                        >
                          <option value="">-- Select Category --</option>
                          {categories.map((category) => (
                            <option value={category.id} key={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        {errors.category_id && (
                          <div className="alert alert-danger">
                            {errors.category_id[0]}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-3">
                        <label htmlFor="content" className="form-label fw-bold">
                          Content
                        </label>
                        <ReactQuill
                          theme="snow"
                          ref={quilRef}
                          rows="5"
                          value={content}
                          onChange={(content) => setContent(content)}
                          placeholder="Enter Content.."
                        />
                      </div>
                      {errors.content && (
                        <div className="alert alert-danger">
                          {errors.content[0]}
                        </div>
                      )}
                    </div>

                    <div>
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
