//import react
import { useEffect, useState } from "react";
//import LayoutWeb
import LayoutWeb from "../../../layouts/Web";
//import CardPage
import CardPage from "../../../components/general/CardPage";
//import Api
import Api from "../../../services/Api";
//import Loading
import Loading from "../../../components/general/CardPage";
//import AlertDataEmpty
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";

export default function WebPagesIndex() {
  //Page title
  document.title = "About Village - Rajeg Village";

  //init state
  const [pages, setPage] = useState([]);
  const [loadingPages, setLoadingPages] = useState(true);

  //fetch data pages
  const fetchDataPage = async () => {
    //setLoadingPage "true"
    setLoadingPages(true);

    //fetch data
    await Api.get(`/api/public/pages`).then((response) => {
      //assign response to state "page"
      setPage(response.data.data);

      //setLoadingPage "false"
      setLoadingPages(false);
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchDataPages"
    fetchDataPage();
  }, []);

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div className="row">
          <div className="col-md-12">
            <h5 className="text-uppercase">
              <i className="fa fa-info-circle"></i> ABOUT VILLAGE
            </h5>
          </div>
        </div>
        <div className="row mt-4">
          {loadingPages ? (
            <Loading />
          ) : pages.length > 0 ? (
            pages.map((page) => (
              <CardPage key={page.id} title={page.title} slug={page.slug} />
            ))
          ) : (
            <AlertDataEmpty />
          )}
        </div>
      </div>
    </LayoutWeb>
  );
}
