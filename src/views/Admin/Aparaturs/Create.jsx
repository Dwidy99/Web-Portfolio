// import react-router-dom
import { Link, useNavigate } from "react-router-dom";
// import react
import { useState } from "react";

// import Api
import Api from "../../../services/Api";

//import LayoutAdmin
import LayoutAdmin from "../../../layouts/Admin";
// import toast js
import toast from "react-hot-toast";
// import Cookies js
import Cookies from "js-cookie";
import ReactQuill from "react-quill";

export default function AparatursCreate() {
  //page title
  document.title = "Create Aparatur - Desa Digital";

  //navigate
  const navigate = useNavigate();

  //define state for form
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //fucntion "storeAparatur"
  const storeAparatur = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //this send data must "sequentially" and same with "Backend"
    formData.append("image", image);
    formData.append("name", name);
    formData.append("role", role);

    //sending data
    await Api.post("/api/admin/aparaturs", formData, {
      //headers
      headers: {
        Authorization: `Bearer ${token}`,
        "role-type": "multipart/form-data",
      },
    })
      .then((response) => {
        //show toast
        toast.success(response.data.message, {
          position: "top-center",
          duration: 6000,
        });

        //navigate
        navigate("/admin/aparaturs");
      })
      .catch((err) => {
        setErrors(err.response.data);
      });
  };

  //reset form
  const resetForm = (e) => {
    e.preventDefault();

    setImage("");
    setName("");
    setRole("");
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid md-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/aparaturs"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-user"></i> Create Aparatur
                  </h6>
                  <hr />
                  <form onSubmit={storeAparatur}>
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
                          <label htmlFor="name" className="form-label fw-bold">
                            Title Aparatur
                          </label>
                          <input
                            type="name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Title Post.."
                          />

                          {errors.name && (
                            <div className="mt-1 alert alert-danger col-md-6">
                              {errors.name[0]}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="role" className="form-label fw-bold">
                            Role
                          </label>
                          <input
                            type="role"
                            className="form-control"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="Enter role.."
                          />
                          {errors.role && (
                            <div className="mt-1 alert alert-danger col-md-6">
                              {errors.role[0]}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <button
                        type="submit"
                        className="btn btn-md btn-primary me-2"
                      >
                        <i className="fa fa-save"></i> Save
                      </button>
                      <button
                        type="reset"
                        className="btn btn-md btn-warning"
                        onClick={(e) => resetForm(e)}
                      >
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
