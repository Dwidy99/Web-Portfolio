//import react
import { useState } from "react";
//import react-router-dom
import { Link, useNavigate } from "react-router-dom";

//import layoutAdmin
import LayoutAdmin from "../../../layouts/Admin";

//import Api
import Api from "../../../services/Api";

//import toast js
import toast from "react-hot-toast";
//import Cokoies js
import Cookies from "js-cookie";

export default function PagesCreate() {
  //page title
  document.title = "Create Page - Desa Digital";

  //navigate
  const navigate = useNavigate();

  //define state "page"
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState("");

  //token
  const token = Cookies.get("token");

  //function "fetchDataPages"
  const storePage = async (e) => {
    e.preventDefault();

    //sending data
    await Api.post(
      `/api/admin/pages`,
      {
        //data
        title: title,
        content: content,
      },
      {
        //headers
        headers: {
          //headers + token
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }
    )
      .then((response) => {
        //show toast
        toast.success(response.data.message, {
          position: "top-center",
          duration: 6000,
        });

        //redirect
        navigate("/admin/pages");
      })
      .catch((err) => {
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
                to="/admin/pages"
                className="btn btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>

              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <div className="fa fa-shield-alt"></div> Create Page
                  </h6>
                  <hr />
                  <form onSubmit={storePage}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label fw-bold">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title.."
                      />
                    </div>
                    {errors.title && (
                      <div className="alert alert-danger">
                        {errors.title[0]}
                      </div>
                    )}

                    <div className="mb-3">
                      <label htmlFor="name" className="form-label fw-bold">
                        Content
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter content name.."
                      />
                    </div>
                    {errors.content && (
                      <div className="alert alert-danger">
                        {errors.content[0]}
                      </div>
                    )}

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
