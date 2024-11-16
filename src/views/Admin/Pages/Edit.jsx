//import react
import { useEffect, useState } from "react";
//import react-router-dom
import { Link, useNavigate, useParams } from "react-router-dom";

//import LayoutAdmin
import LayoutAdmin from "../../../layouts/Admin";

//import Api
import Api from "../../../services/Api";

//import toast js
import toast from "react-hot-toast";
//import Cookies js
import Cookies from "js-cookie";
//import ReactQuill
import ReactQuill from "react-quill";

export default function PagesEdit() {
  //page title
  document.title = "Edit Page - Desa Digital";

  //navigate
  const navigate = useNavigate();

  //id params
  const { id } = useParams();

  //define state for form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  //token token
  const token = Cookies.get("token");

  //fucntion "fetchDataPage"
  const fetchDataPage = async () => {
    await Api.get(`/api/admin/pages/${id}`, {
      //headers
      headers: {
        //headers + token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state
      setTitle(response.data.data.title);
      setContent(response.data.data.content);
    });
  };

  //useEffect
  useEffect(() => {
    //call fetchDataPage
    fetchDataPage();
  }, []);

  //function "updatePage"
  const updatePage = async (e) => {
    e.preventDefault();

    //sending data
    await Api.post(
      `/api/admin/pages/${id}`,
      {
        //data
        title: title,
        content: content,
        _method: "PUT",
      },
      {
        //headers
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }
    )
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-center",
          duration: 5000,
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
                    <div className="fa fa-shield-alt"></div> Edit Page
                  </h6>
                  <hr />
                  <form onSubmit={updatePage}>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label fw-bold">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title.."
                      />
                      {errors.title && (
                        <div className="alert alert-danger">
                          {errors.title[0]}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="content" className="form-label fw-bold">
                        Content
                      </label>
                      <ReactQuill
                        theme="snow"
                        row="5"
                        value={content}
                        onChange={(content) => setContent(content)}
                        placeholder="Enter content.."
                      />
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
                        <i className="fa fa-save"></i> Update
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
