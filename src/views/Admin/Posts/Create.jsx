//import react-router-dom
import { Link, useNavigate } from "react-router-dom";
//import react
import { useEffect, useState } from "react";

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

export default function PostsCreate() {
  //page title
  document.title = "Create Posts - Desa Digital";

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
                    <i className="fa fa-user"></i> Create Posts
                  </h6>
                  <hr />
                  <form onSubmit={storePosts}>
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
                          value={categoryID}
                          onChange={(e) => setCategoryID(e.target.value)}
                        >
                          <option value="">-- Select Category --</option>
                          {categories.map((category) => (
                            <option value={category.id} key={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.category_id && (
                        <div className="alert alert-danger">
                          {errors.category_id[0]}
                        </div>
                      )}
                    </div>

                    <div className="row">
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
