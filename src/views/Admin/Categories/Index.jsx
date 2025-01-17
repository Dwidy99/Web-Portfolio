import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import Cookies from "js-cookie";
import hasAnyPermissions from "../../../utils/Permissions";
import Api from "../../../services/Api";
import Pagination from "../../../components/general/Pagination";
import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";

export default function CategoriesIndex() {
  document.title = "Categories - Desa Digital";

  // State untuk kategori dan pagination
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });
  const [keywords, setKeywords] = useState("");

  // Ambil token dari cookies
  const token = Cookies.get("token");

  // Fungsi untuk mengambil data kategori
  const fetchData = async (pageNumber = 1, keywords = "") => {
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/admin/categories?search=${keywords}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setCategories(response.data.data.data);
      console.log(response.data.data.data);
      setPagination({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi untuk mencari kategori
  const searchData = async (e) => {
    setKeywords(e.target.value);
    fetchData(1, e.target.value);
  };

  // Fungsi untuk menghapus kategori
  const deleteCategory = (id) => {
    confirmAlert({
      title: "Are you sure?",
      message: "Want to delete this data?",
      buttons: [
        {
          label: "YES",
          onClick: async () => {
            await Api.delete(`/api/admin/categories/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              toast.success(response.data.message, { position: "top-center" });
              fetchData();
            });
          },
        },
        {
          label: "NO",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {hasAnyPermissions(["categories.create"]) && (
                  <div className="col-md-3 col-12 mb-12">
                    <Link
                      to="/admin/categories/create"
                      className="btn btn-md btn-primary border-primary border-0 shadow w-100"
                      type="button"
                    >
                      <i className="fa fa-plus-circle"></i> Add new
                    </Link>
                  </div>
                )}

                <div className="col-md-9 col-12 mb-2">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => searchData(e)}
                      placeholder="search here.."
                    />
                    <span className="input-group-text border-0 shadow-sm">
                      <i className="fa fa-search"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-1">
            <div className="col-md-12">
              <div className="card border-0 rounded shadow-sm border-sm border-top-success">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-centered table-nowrap mb-0 rounded">
                      <thead className="thead-dark">
                        <tr className="border-0">
                          <th className="border-0" style={{ width: "5%" }}>
                            No.
                          </th>
                          <th className="border-0">Categories Name</th>
                          <th className="border-0" style={{ width: "10%" }}>
                            Icon
                          </th>
                          <th className="border-0" style={{ width: "15%" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.length > 0 ? (
                          categories.map((category, index) => (
                            <tr key={index}>
                              <td className="fw-bold text-center">
                                {++index +
                                  (pagination.currentPage - 1) *
                                    pagination.perPage}
                              </td>
                              <td>{category.name}</td>
                              <td className="text-center">
                                {/* Menampilkan gambar ikon */}
                                {category.image ? (
                                  <img
                                    src={category.image}
                                    alt={category.name}
                                    style={{ width: "40px", height: "40px" }}
                                  />
                                ) : (
                                  <span>No icon</span>
                                )}
                              </td>
                              <td className="text-center">
                                {hasAnyPermissions(["categories.edit"]) && (
                                  <Link
                                    to={`/admin/categories/edit/${category.id}`}
                                    className="btn btn-primary btn-sm me-2"
                                  >
                                    <i className="fa fa-pencil-alt"></i>
                                  </Link>
                                )}

                                {hasAnyPermissions(["categories.delete"]) && (
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteCategory(category.id)}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4}>
                              <div
                                className="alert alert-danger border-0 rounded shadow-sm w-100 text-center"
                                role="alert"
                              >
                                Data Not Available..
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <Pagination
                    currentPage={pagination.currentPage}
                    perPage={pagination.perPage}
                    total={pagination.total}
                    onChange={(pageNumber) => fetchData(pageNumber, keywords)}
                    position="end"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
