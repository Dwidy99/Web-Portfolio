//import react
import { useEffect, useState } from "react";
//import LayoutAdmin
import LayoutWeb from "../../../layouts/Web";
//import Slider
import Slider from "../../../components/web/Slider";
//import Loading
import Loading from "../../../components/general/Loading";
//import Api
import Api from "../../../services/Api";
//import AlertDataEmpty
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";
//import CardProduct
import CardProduct from "../../../components/general/CardProduct";

export default function Home() {
  //init state products
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  //fetch data products
  const fetchDataProducts = async () => {
    //setLoadingProducts "true"
    setLoadingProducts(true);

    //fetch data
    await Api.get(`/api/public/products_home`).then((response) => {
      //assign response to state "products"
      setProducts(response.data.data);

      //setLoadingProducts "false"
      setLoadingProducts(false);
    });
  };

  //hook useEffect
  useEffect(() => {
    //call method "fetchDataProducts"
    fetchDataProducts();
  }, []);

  return (
    <LayoutWeb>
      <Slider />

      <div className="container mt-5 mb-3">
        <div className="row">
          <div className="col-md-12 mb-3">
            <div className="section-title">
              <h4>
                <i className="fa fa-shopping-bag"></i>
                MY
                <strong style={{ color: "rgb(209 104 0)" }}> PORTFOLIO </strong>
              </h4>
            </div>
          </div>
          {loadingProducts ? (
            <Loading />
          ) : products.length > 0 ? (
            products.map((product) => (
              <CardProduct
                key={product.id}
                image={product.image}
                title={product.title}
                slug={product.slug}
                price={product.price}
                phone={product.phone}
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
