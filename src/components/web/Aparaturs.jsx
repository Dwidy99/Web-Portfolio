import { useEffect, useState } from "react";
import LayoutWeb from "../../layouts/Web";
import Api from "../../services/Api";
import Loading from "../general/Loading";
import CardAparaturs from "../general/CardAparaturs";
import AlertDataEmpty from "../general/AlertDataEmpty";

export default function Aparaturs() {
  //title page
  document.title = "Aparaturs - Desa Digital";

  //init state
  const [aparaturs, setAparaturs] = useState([]);
  const [loadingAparaturs, setLoadingAparaturs] = useState(true);

  //fetch data aparaturs
  const fetchDataAparaturs = async () => {
    //setLoadingAparaturs "true"
    setLoadingAparaturs(true);

    //fetch data
    await Api.get(`/api/public/aparaturs`).then((response) => {
      //assign response to state "aparaturs"
      setAparaturs(response.data.data);

      //setLoadingAparaturs "false"
      setLoadingAparaturs(false);
    });
  };

  //hook useeffect
  useEffect(() => {
    //call method "fetchDataAparaturs"
    fetchDataAparaturs();
  }, []);

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div className="row">
          <div className="col-md-12">
            <h5 className="text-uppercase">
              <i className="fa fa-user-circle"></i> APARATURS DESA
            </h5>
            <hr />
          </div>
        </div>
        <div className="row mt-4">
          {loadingAparaturs ? (
            <Loading />
          ) : aparaturs.length > 0 ? (
            aparaturs.map((aparatur) => (
              <CardAparaturs
                key={aparatur.id}
                name={aparatur.name}
                image={aparatur.image}
                role={aparatur.role}
              />
            ))
          ) : (
            <AlertDataEmpty />
          )}
        </div>
      </div>
    </LayoutWeb>
  );
}
