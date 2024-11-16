//import react
import { useEffect, useState } from "react";
//import react-router-dom
import { Link } from "react-router-dom";

//import LayoutAdmin
import LayoutAdmin from "../../../layouts/Admin";

//import hasAnyPermission
import hasAnyPermissions from "../../../utils/Permissions";
//import Api
import Api from "../../../services/Api";
//import Pagination
import Pagination from "../../../components/general/Pagination";

//import Cookies js
import Cookies from "js-cookie";

export default function ProductsIndex() {
  //Page Title
  document.title = "Product Page - Desa Digital";

  //define products state
  const [products, setProducts] = useState("");

  //define Pagination
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //define keywords
  const [keywords, setKeywords] = useState("");

  //token
  const token = Cookies.get("token");

  //function "fetchData"
  const fetchData = async (pageNumber = 1, keywords = "") => {
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/admin/products?search=${keywords}&page=${page}`, {
      //headers
      headers: {
        //headers + token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to setProducts
      setProducts(response.data.data.data);

      //set state Pagination
      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchData"
    fetchData();
  }, []);

  //function "searchData"
  const searchData = (e) => {
    //set value to state "keyword"
    setKeywords(e.target.value);

    //call function "fetchData" with argument
    fetchData(1, e.target.value);
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {hasAnyPermissions(["products.create"]) && (
                  <div className="col-md-3 col-12 mb-12">
                    <Link
                      to="/admin/products/create"
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
                          <th className="border-0">Title</th>
                          <th className="border-0">Owner</th>
                          <th className="border-0" style={{ width: "10%" }}>
                            Price
                          </th>
                          <th className="border-0">Phone</th>
                          <th className="border-0" style={{ width: "20%" }}>
                            Address
                          </th>
                          <th className="border-0" style={{ width: "15%" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          //cek apakah data ada?
                          products.length > 0 ? (
                            //looping data "products" dengan "map"
                            products.map((product, index) => (
                              <tr key={index}>
                                <td className="fw-bold text-center">
                                  {++index +
                                    (pagination.currentPage - 1) *
                                      pagination.perPage}
                                </td>
                                <td>{product.title}</td>
                                <td>{product.owner}</td>
                                <td>Rp. {product.price}</td>
                                <td>{product.phone}</td>
                                <td>{product.address}</td>
                                <td className="text-center">
                                  {hasAnyPermissions(["products.edit"]) && (
                                    <Link
                                      to={`/admin/products/edit/${products.id}`}
                                      className="btn btn-primary btn-sm me-2"
                                    >
                                      <i className="fa fa-pencil-alt"></i>
                                    </Link>
                                  )}

                                  {hasAnyPermissions(["posts.delete"]) && (
                                    <button className="btn btn-danger btn-sm">
                                      <i className="fa fa-trash"></i>
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            //tampilan pesan data belum tersedia
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
                          )
                        }
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
