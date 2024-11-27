import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  //assigning Location variable
  const location = useLocation();

  //desrtucturing pathname from Location
  const { pathname } = location;

  //Javascript aplit method to get the name  of the path in array
  const activeRoute = pathname.split("/");

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light navbat-top d-none d-md-block d-lg-block">
        <div className="container">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item me-4">
                <i className="fa fa-envelope"></i> 98dwiyulianto@gmail.com
              </li>
              <li className="nav-item me-4">
                <i className="fa fa-phone"></i> 081313xxxxxx
              </li>
            </ul>
            <div>
              FOLLOW US :
              <a href="#" className="ms-2 me-2">
                <i className="fab fa-facebook-square text-white fa-lg"></i>
              </a>
              <a href="http://" className="ms-2 me-2">
                <i className="fab fa-instagram text-white fa-lg"></i>
              </a>
              <a href="#" className="ms-2 me-2">
                <i className="fab fa-youtube text-white fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="jumbotron-header pb-3">
        <div className="container">
          <div className="row">
            <div className="col-md-9 d-none d-md-block d-lg-block">
              <div className="header-logo">
                <a href="#">
                  <img
                    src="/images/logo-jbg.png"
                    alt=""
                    width="110"
                    className="img-responsive"
                  />
                </a>
              </div>
              <div className="header-text">
                <h2 className="header-school">SANTRI VILLAGE</h2>
                <hr />
                <div className="header-address">
                  Jln. Diponegoro No. 58, Wonosalam, Tangerang, Banten, 61473
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div
                style={{ marginTop: "60px" }}
                className="d-none d-md-block d-lg-block"
              ></div>
              <form action="#" className="d-flex" method="GET">
                <input
                  type="search"
                  name="q"
                  placeholder="find anything.."
                  aria-label="search"
                />
                <button
                  className="btn btn-primary-dark"
                  type="submit"
                  style={{
                    backgroundColor: "#005005",
                    borderColor: "#005005",
                    color: "white",
                  }}
                ></button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-md navbar-light navbar-blue nav-web">
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
          <li className="nav-item ms-2">
            <Link
              className={
                activeRoute[1] === ""
                  ? "nav-link active text-uppercase"
                  : "nav-link text-uppercase"
              }
              to="/"
            >
              <i className="fa fa-home"></i>HOME
            </Link>
          </li>

          <li>
            <Link
              className={
                activeRoute[1] === "pages"
                  ? "nav-link active text-uppercase"
                  : "nav-link text-uppercase"
              }
              to="/pages"
            >
              <i className="fa fa-info-circle"></i> ABOUT ME
            </Link>
          </li>

          <li>
            <Link
              className={
                activeRoute[1] === "aparaturs"
                  ? "nav-link active text-uppercase"
                  : "nav-link text-uppercase"
              }
              to="/aparaturs"
            >
              <i className="fa fa-info-circle"></i> APARATURS
            </Link>
          </li>

          <li>
            <Link
              className={
                activeRoute[1] === "posts"
                  ? "nav-link active text-uppercase"
                  : "nav-link text-uppercase"
              }
              to="/posts"
            >
              <i className="fa fa-book"></i> NEWS
            </Link>
          </li>

          <li>
            <Link
              className={
                activeRoute[1] === "products"
                  ? "nav-link active text-uppercase"
                  : "nav-link text-uppercase"
              }
              to="/products"
            >
              <i className="fa fa-shopping-bag"></i> PRODUCTS
            </Link>
          </li>

          <li>
            <Link
              className={
                activeRoute[1] === "photos"
                  ? "nav-link active text-uppercase"
                  : "nav-link text-uppercase"
              }
              to="/photos"
            >
              <i className="fa fa-shopping-bag"></i> GALLERY
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
