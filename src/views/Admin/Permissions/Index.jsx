//import LayoutAdmin
import { useEffect, useState } from "react";
//import LayoutAdmin
import LayoutAdmin from "../../../layouts/Admin";
//import Api
import Api from "../../../services/Api";
//import js Cokoies
import Cookies from "js-cookie";
//import Layout
import Pagination from "../../../components/general/Pagination";

export default function Index() {
  //title page
  document.title = "Permissions - Desa Digital";

  //define state "permissions"
  const [permissions, setPermissions] = useState([]);

  //define state "pagination"
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //define state "keywords"
  const [keywords, setKeywords] = useState("");

  //token from cookies
  const token = Cookies.get("token");

  //function fetchData
  const fetchData = async (pageNumber = 1, keywords = "") => {
    //define variabel "page"
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/admin/permissions?search=${keywords}&page=${page}`, {
      //header
      headers: {
        //header Bearer + token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set Data response to state "pagination"
      setPermissions(response.data.data.data);

      //set data pagination to state "pagination"
      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));
    });
  };

  //useEffect
  useEffect(() => {
    //call method "fetchData"
    fetchData();
  }, []);

  //function "search Data"
  const searchData = async (e) => {
    //set value to state "keyword"
    setKeywords(e.target.value);

    //call method "fetchdate"
    fetchData(1, e.target.value);
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid px-4 mt-5">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-9 col-12 mb-12">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control border-0 shadow-sm"
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
                          <th className="border-0">Permission Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          //cek apakah data ada?
                          permissions.length > 0 ? (
                            //looping data "permissions" dengan "map"
                            permissions.map((permissions, index) => (
                              <tr key={index}>
                                <td className="fw-bold text-center">
                                  {++index +
                                    (pagination.currentPage - 1) *
                                      pagination.perPage}
                                </td>
                                <td>{permissions.name}</td>
                              </tr>
                            ))
                          ) : (
                            //tampilan pesan data belum tersedia
                            <tr>
                              <td colSpan={2}>
                                <div
                                  className="alert alert-danger border-0 rounded shadow-sm w-100 text-center"
                                  role="alert"
                                >
                                  Data Not Availabel..
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
