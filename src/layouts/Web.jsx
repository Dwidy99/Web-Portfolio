//import css
import "../assets/web/css/index.css";
import "../assets/web/css/tailwind.css";

//import js
import "../assets/web/js/script.js";

import Navbar from "../components/web/Navbar.jsx";
import Footer from "../components/web/Footer.jsx";

export default function Web({ children }) {
  return (
    <>
      <Navbar />
      {children ? children : <p>Children are missing</p>}
      <Footer />
    </>
  );
}
