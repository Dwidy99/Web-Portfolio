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

export default function AparatursEdit() {
  //page title
  document.title = "Edit Aparatur - Desa Digital";

  //navigate
  const navigate = useNavigate();

  //get is use useParams
  const { id } = useParams();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState([]);

  //token
  const token = Cookies.get("token");

  //function "fetchDataAparatur"
  const fetchDataAparatur = async () => {
    await Api.get(`/api/admin/aparaturs/${id}`, {
      //headers
      headers: {
        //headers + token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setName(response.data.data.name);
      setRole(response.data.data.role);
    });
  };

  //hook "useEffect"
  useEffect(() => {
    fetchDataAparatur();
  }, []);

  //function "updateAparatur"
  const updateAparatur = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData" (the order must same with the backend)
    formData.append("image", image);
    formData.append("name", name);
    formData.append("role", role);
    formData.append("_method", "PUT");

    //sending data
    await Api.post(`/api/admin/aparaturs/${id}`, formData, {
      //headers
      headers: {
        //headers + token
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

  const reset = (e) => {
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
                    <i className="fa fa-user"></i> Update Aparatur
                  </h6>
                  <hr />
                  <form onSubmit={updateAparatur}>
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
                            Name Aparatur
                          </label>
                          <input
                            type="name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Name.."
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
                        onClick={(e) => reset(e)}
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
