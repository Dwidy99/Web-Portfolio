//import useNavigate and useParams
import { Link, useNavigate, useParams } from "react-router-dom";
//import useState
import { useEffect, useState } from "react";

// import Api
import Api from "../../../services/Api";

//import LayoutAdmin
import LayoutAdmin from "../../../layouts/Admin";

//import toast js
import toast from "react-hot-toast";
//import Cokoies js
import Cookies from "js-cookie";

export default function RolesEdit() {
  //title page
  document.title = "Edit Role - Data Digital";

  //navigate
  const navigate = useNavigate();

  //get param id at URL
  const { id } = useParams();

  //define state for form
  const [name, setName] = useState("");
  const [permissionsData, setPermissionsData] = useState([]);
  const [errors, setErrors] = useState([]);

  //define state "permissionis"
  const [permissions, setPermissions] = useState([]);

  //get token
  const token = Cookies.get("token");

  //function "fetchDataPermissionsData"
  const fetchDataPermissions = async () => {
    await Api.get("/api/admin/permissions/all", {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state "permissions"
      setPermissions(response.data.data);
    });
  };

  //function "fetchDataRole"
  const fetchDataRole = async () => {
    await Api.get(`/api/admin/roles/${id}`, {
      //header
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state
      setName(response.data.data.name);
      setPermissionsData(response.data.data.permissions.map((obj) => obj.name));
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchDataPermissions"
    fetchDataPermissions();

    //call function "fetchDataRole"
    fetchDataRole();
  }, []);

  //define function "handleCheckboxChange"
  const handleCheckboxChange = (e) => {
    //define data
    let data = permissionsData;

    //check item already exist, if so, remove filter
    if (data.some((name) => name === e.target.value)) {
      data = data.filter((name) => name !== e.target.value);
    } else {
      //push new item on array
      data.push(e.target.value);
    }

    //set data to state
    setPermissionsData(data);
  };

  const updateRole = async (e) => {
    e.preventDefault();

    await Api.post(
      `/api/admin/roles/${id}`,
      {
        //data
        name: name,
        permissions: permissionsData,
        _method: "PUT",
      },
      {
        //header
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-center",
          duration: 4000,
        });

        //redirect
        navigate("/admin/roles");
      })
      .catch((err) => {
        //set error message to state "errors"
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
                to="/admin/roles"
                className="btn btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>

              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <div className="fa fa-shield-alt"></div> Edit Role
                  </h6>
                  <hr />
                  <form onSubmit={updateRole}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label fw-bold">
                        Role name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter role name.."
                      />
                    </div>
                    {errors.name && (
                      <div className="alert alert-danger">{errors.name[0]}</div>
                    )}
                    <hr />

                    <div className="mb-3">
                      <label htmlFor="name" className="fw-bold">
                        Permissions
                      </label>
                      <br />
                      {permissions.map((permission) => (
                        <div
                          className="form-check form-check-inline"
                          key={Math.random()}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={permission.name}
                            defaultChecked={permissionsData.some(
                              (name) => name === permission.name ?? true
                            )}
                            onChange={handleCheckboxChange}
                            id={`check-${permission.id}`}
                            placeholder="Enter role name.."
                          />
                          <label
                            className="form-check-label fw-normal"
                            htmlFor={`check-${permission.id}`}
                          >
                            {permission.name}
                          </label>
                        </div>
                      ))}

                      {errors.name && (
                        <div className="alert alert-danger">
                          {errors.permissions[0]}
                        </div>
                      )}
                      <hr />
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
