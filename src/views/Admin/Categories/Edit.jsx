//import react-router-dom
import { Link, useNavigate, useParams } from "react-router-dom";
//import react
import { useEffect, useState } from "react";

//import LayoutAdmin
import LayoutAdmin from "../../../layouts/Admin";

//import toast js
import toast from "react-hot-toast";
//import Cookies js
import Cookies from "js-cookie";

//import Api
import Api from "../../../services/Api";

export default function CategoriesEdit() {
  //title page
  document.title = "Update Category - Desa Digital";

  //navigate
  const navigate = useNavigate();

  //define params
  const { id } = useParams();

  //define state for form
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  //define from cookies
  const token = Cookies.get("token");

  //function fetchDataCategory
  const fetchDataCategory = async () => {
    await Api.get(`/api/admin/categories/${id}`, {
      //headers
      headers: {
        //headers + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state
      setName(response.data.data.name);
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchDataCategory"
    fetchDataCategory();
  }, []);

  //fucntion "updateCategory"
  const updateCategory = async (e) => {
    e.preventDefault();

    //sending data
    await Api.post(
      `/api/admin/categories/${id}`,
      {
        name: name,
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
        //show toast js
        toast.success(response.data.message, {
          position: "top-center",
          duration: 5000,
        });

        //navigate
        navigate("/admin/categories");
      })
      .catch((err) => {
        // set errors
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
                to="/admin/categories"
                className="btn btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>

              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <div className="fa fa-shield-alt"></div> Create Category
                  </h6>
                  <hr />
                  <form onSubmit={updateCategory}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label fw-bold">
                        Category Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter category name.."
                      />
                    </div>
                    {errors.name && (
                      <div className="alert alert-danger">{errors.name[0]}</div>
                    )}
                    <hr />

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
