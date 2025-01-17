import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import Api from "../../../services/Api";

export default function CategoriesEdit() {
  // title page
  document.title = "Update Category - Desa Digital";

  // navigate
  const navigate = useNavigate();

  // define params
  const { id } = useParams();

  // define state for form
  const [name, setName] = useState("");
  const [image, setImage] = useState(null); // state untuk menyimpan gambar
  const [errors, setErrors] = useState([]);
  const [categoryImage, setCategoryImage] = useState(""); // state untuk menyimpan image URL dari kategori

  // define from cookies
  const token = Cookies.get("token");

  // function fetchDataCategory
  const fetchDataCategory = async () => {
    await Api.get(`/api/admin/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setName(response.data.data.name);
      setCategoryImage(response.data.data.image); // set image URL dari API ke state
    });
  };

  // useEffect untuk fetch data kategori
  useEffect(() => {
    fetchDataCategory();
  }, []);

  // function updateCategory untuk mengedit kategori
  const updateCategory = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image); // menambahkan file gambar ke form data
    }
    formData.append("_method", "PUT");

    await Api.post(`/api/admin/categories/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data", // pastikan type form-data
      },
    })
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-center",
          duration: 5000,
        });
        navigate("/admin/categories");
      })
      .catch((err) => {
        setErrors(err.response.data);
      });
  };

  // function handle image change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
                    <div className="fa fa-shield-alt"></div> Update Category
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

                    {/* Display current image */}
                    <div className="mb-3">
                      <label className="form-label fw-bold">Current Icon</label>
                      {categoryImage ? (
                        <div>
                          <img
                            src={categoryImage}
                            alt="Category Icon"
                            style={{ width: "50px", height: "50px" }}
                          />
                        </div>
                      ) : (
                        <span>No icon available</span>
                      )}
                    </div>

                    {/* Input for new image */}
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label fw-bold">
                        Change Icon (optional)
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                    {errors.image && (
                      <div className="alert alert-danger">
                        {errors.image[0]}
                      </div>
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
