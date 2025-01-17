import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/webPorto/img/media.gif";

export default function Navbar() {
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const theme = localStorage.getItem("theme");
    return (
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      const fixedNav = header.offsetTop;

      if (window.scrollY > fixedNav) {
        setIsNavbarFixed(true);
      } else {
        setIsNavbarFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    const html = document.querySelector("html");

    if (!isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  };

  return (
    <header
      className={`bg-transparent absolute top-0 left-0 w-full flex items-center z-10 lg:px-16 lg:mx-16 ${
        isNavbarFixed ? "navbar-fixed" : ""
      }`}
    >
      <div className="container mx-auto px-4 lg:px-16">
        <div className="flex items-center justify-between relative">
          <div className="px-4">
            <Link
              href="#home"
              className="font-bold text-lg text-black block py-2 grayscale opacity-60 transition duration-500 hover:grayscale-0 hover:opacity-100 hover:text-primary dark:text-dark"
            >
              <img src={logo} className="logo-small" alt="logo" />
              Dwi
            </Link>
          </div>
          <div className="flex items-center px-4">
            <button
              id="hamburger"
              name="hamburger"
              type="button"
              className="block absolute right-4 lg:hidden"
              aria-label="hamburger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="hamburger-line transition duration-300 ease-in-out origin-top-left"></span>
              <span className="hamburger-line transition duration-300 ease-in-out"></span>
              <span className="hamburger-line transition duration-300 ease-in-out origin-bottom-left"></span>
            </button>

            <nav
              id="nav-menu"
              className={`absolute right-4 top-full hidden w-full max-w-[250px] rounded-lg lg:px-16 lg:mx-16 dark:bg-dark dark:shadow-slate-500 lg:static lg:block lg:max-w-full lg:rounded-none lg:bg-transparent lg:shadow-none lg:dark:bg-transparent ${
                isMenuOpen ? "block" : ""
              }`}
            >
              <ul className="block lg:flex">
                <li className="group">
                  <Link
                    to="/"
                    className="text-base text-black font-bold mx-3 group-hover:text-primary dark:text-dark"
                  >
                    Beranda
                  </Link>
                </li>
                <li className="group">
                  <Link
                    to="/about"
                    className="text-base text-black font-bold mx-3 group-hover:text-primary dark:text-dark"
                  >
                    About
                  </Link>
                </li>
                <li className="group">
                  <Link
                    to="/portfolio"
                    className="text-base text-black font-bold mx-3 group-hover:text-primary dark:text-dark"
                  >
                    Portfolio
                  </Link>
                </li>
                <li className="group">
                  <Link
                    to="/blog"
                    className="text-base text-black font-bold mx-3 group-hover:text-primary dark:text-dark"
                  >
                    Blog
                  </Link>
                </li>
                <li className="mt-1 items-center pl-8 lg:mt-0">
                  <div className="flex">
                    <span className="mr-2 text-sm text-slate-500 dark:text-dark">
                      <span>| </span>light
                    </span>
                    <input
                      type="checkbox"
                      className="hidden"
                      aria-label="dark-mode"
                      id="dark-toggle"
                      checked={isDarkMode}
                      onChange={toggleDarkMode}
                    />
                    <label htmlFor="dark-toggle">
                      <div className="flex h-5 w-9 cursor-pointer items-center rounded-full bg-slate-500 p-1">
                        <div className="toggle-circle h-4 w-4 rounded-full bg-white transition duration-300 ease-in-out"></div>
                      </div>
                    </label>
                    <span className="ml-2 text-sm text-slate-500 dark:text-dark">
                      dark
                    </span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
