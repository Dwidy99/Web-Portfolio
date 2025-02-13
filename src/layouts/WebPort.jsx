//import css
import "../assets/webPorto/css/index.css";
// import "../assets/webPorto/css/tailwind.css";

//import js
import "../assets/webPorto/js/script.js";

import Navbar from "../components/webPort/NavbarPort.jsx";
import Footer from "../components/webPort/FooterPort.jsx";

export default function Web({ children }) {
  return (
    <>
      <Navbar />
      {children ? children : <p>Children are missing</p>}
      <Footer />
    </>
  );
}
