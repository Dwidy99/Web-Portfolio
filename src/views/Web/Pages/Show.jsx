// import react
import { useEffect, useState } from "react";
// import react-router-dom
import { useParams } from "react-router-dom";
// import LayoutWeb
import LayoutWeb from "../../../layouts/Web";
// import Api
import Api from "../../../services/Api";
// import Loading Component
import Loading from "../../../components/general/Loading";

export default function WebPagesShow() {
  // init state
  const [page, setPage] = useState({});
  const [loadingPages, setLoadingPages] = useState(true);

  //param { slug }
  const { slug } = useParams();

  const fetchDataPages = async () => {
    //setLoadingPages "true"
    setLoadingPages(true);

    //fetch data
    await Api.get(`/api/public/pages/${slug}`).then((response) => {
      //aasign response to state "pages"
      setPage(response.data.data);

      //title page
      document.title = `${response.data.data.title} - Desa Santri`;

      //setLoadingPages "false"
      setLoadingPages(false);
    });
  };

  //useEffect
  useEffect(() => {
    //call function fetchDataPages
    fetchDataPages();
  }, []);

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        {loadingPages ? (
          <Loading />
        ) : (
          <div className="row">
            <div className="col-md-12">
              <h4 className="text-uppercase">
                <i className="fa fa-info-circle"></i> {page.title}
              </h4>
              <hr />
              <div className="card border-0 shadow-sm rounded-3">
                <div className="card-body post-content">
                  <p dangerouslySetInnerHTML={{ __html: page.content }}></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutWeb>
  );
}
