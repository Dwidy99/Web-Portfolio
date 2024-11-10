//import useState
import { useEffect, useState } from "react";
//import useNavigate
import { Link, useNavigate } from "react-router-dom";

//import Api
import Api from "../../../services/Api";
//import LayoutAdmin
import LayoutAdmin from "../../../layouts/Admin";

//import Cookies js
import Cookies from "js-cookie";
//import toast js
import toast from "react-hot-toast";

export default function RolesCreate() {
  //title page
  document.title = "Create - Desa Digital";

  //navigate
  const navigate = useNavigate();

  //define state "permissions"
  const [name, setName] = useState("");
  const [permissionsData, setPermissionsData] = useState([]);
  const [errors, setErrors] = useState([]);

  //define state "permissions"
  const [permissions, setPermissions] = useState([]);

  //token
  const token = Cookies.get("token");

  //function "fetchDataPermissions"
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

  useEffect(() => {
    //call function "fetchDataPermissions"
    fetchDataPermissions();
  }, []);

  //function "handleCheckboxChange"
  const handleCheckboxChange = (e) => {
    //define data
    let data = permissionsData;

    //push data on state
    data.push(e.target.value);

    //set data to state
    setPermissionsData(data);
  };

  //function "storeRoles"
  const storeRole = async (e) => {
    e.preventDefault();

    await Api.post(
      "/api/admin/roles",
      {
        //data
        name: name,
        permissions: permissionsData,
      },
      {
        //header
        headers: {
          //header Bearer + Token
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        //show toast
        toast.success(response.data.message, {
          position: "top-center",
          duration: 4000,
        });

        //duration
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
                    <div className="fa fa-shield-alt"></div> Create Role
                  </h6>
                  <hr />
                  <form onSubmit={storeRole}>
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
                            type="checkbox"
                            className="form-check-input"
                            value={permission.name}
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
