//import css
import "../assets/web/css/index.css";
import "../assets/web/css/tailwind.css";

//import js
import "../assets/web/js/script.js";

import Navbar from "../components/web/Navbar.jsx";
import Footer from "../components/web/Footer.jsx";
import SnowEffect from "../components/general/SnowEffect.jsx";
import PropTypes from "prop-types";

export default function Web({ children }) {
  return (
    <>
      <Navbar />
      <SnowEffect />
      {children ?? <p>Children are missing</p>}
      <Footer />
    </>
  );
}

// Tambahkan propTypes untuk validasi props di JavaScript
Web.propTypes = {
  children: PropTypes.node,
};
