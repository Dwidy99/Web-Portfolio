//import LayoutWeb
import { useEffect, useState } from "react";
import LayoutWeb from "../../layouts/Web";
import { useParams } from "react-router-dom";
import Loading from "../../components/general/Loading";
import Api from "../../services/Api";

export default function WebProductsShow() {
  //init state
  const [product, setProduct] = useState({});
  const [loadingProduct, setLoadingProduct] = useState(true);

  //destruct id
  const { slug } = useParams();

  //fetch data product
  const fetchDetailDataProducts = async () => {
    //assign response to state "product"
    setLoadingProduct(true);

    //fetch data
    await Api.get(`/api/public/products/${slug}`).then((response) => {
      //assign response to state "product"
      setProduct(response.data.data);

      //title page
      document.title = `${response.data.data.title} - Rajeg Village`;

      //setLoadingProduct "false"
      setLoadingProduct(false);
    });
  };

  //hook useEffect
  useEffect(() => {
    //call function fetchDetailDataProducts
    fetchDetailDataProducts();
  }, []);

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        {loadingProduct ? (
          <Loading />
        ) : (
          <div className="row">
            <div className="col-md-12">
              <div className="card border-0 shadow-sm rounded-3">
                <div className="card-body post-content">
                  <img src={product.image} className="rounded w-100 mb-3" />
                  <table className="table">
                    <tbody>
                      <tr>
                        <th
                          scope="row"
                          style={{ width: "15%" }}
                          className="text-uppercase"
                        >
                          Product Name
                        </th>
                        <td style={{ width: "1%" }}>:</td>
                        <td>{product.title}</td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-uppercase">
                          No. Telp / WA
                        </th>
                        <td>:</td>
                        <td>{product.phone}</td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-uppercase">
                          Description
                        </th>
                        <td>:</td>
                        <td>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: product.content,
                            }}
                          ></p>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-uppercase">
                          Alamat
                        </th>
                        <td>:</td>
                        <td>{product.address}</td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-uppercase">
                          Buy Product
                        </th>
                        <td>:</td>
                        <td>
                          <a
                            href={`https://api.whatsapp.com/send?phone=${product.phone}&text=Halo%20kak%2C%20saya%20ingin%20pesan%20%3A%20${product.title}`}
                          >
                            <i className="fa-brands fa-whatsapp"></i> Buy Now
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutWeb>
  );
}
