import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState, useEffect, useRef } from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { IoSunnySharp } from "react-icons/io5";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const toTopRef = useRef(null); // Reference for the to-top button

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle scroll to fix the navbar and toggle "to-top" button visibility
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      const fixedNav = header.offsetTop;
      const scrollTop = window.scrollY;

      if (scrollTop > fixedNav) {
        setIsFixed(true);
        toTopRef.current.classList.remove("hidden");
        toTopRef.current.classList.add("flex");
      } else {
        setIsFixed(false);
        toTopRef.current.classList.add("hidden");
        toTopRef.current.classList.remove("flex");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close the mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <header
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 shadow-lg ${
          isFixed ? "bg-transparent navbar-fixed" : ""
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between relative font-bold lg:mx-25.5">
            <div className="my-6">
              <a
                href="#home"
                className="text-lg text-meta-12 flex items-center"
              >
                <DotLottieReact
                  src="https://lottie.host/2e6f2bd3-568d-48c9-ac85-2f837e3a35c5/DRkd0qtHGo.lottie"
                  loop
                  autoplay
                  style={{ width: "20%", height: "20%", lineHeight: "0" }}
                />
                dwiYulianto
              </a>
            </div>

            <div className="flex items-center px-4">
              {/* Hamburger Button for Mobile */}
              <button
                ref={buttonRef}
                type="button"
                className={`block absolute right-4 lg:hidden ${isOpen ? "hamburger-active" : ""}`}
                aria-label="hamburger"
                onClick={toggleMenu}
              >
                <span className="hamburger-line transition duration-300 ease-in-out origin-top-left"></span>
                <span className="hamburger-line transition duration-300 ease-in-out"></span>
                <span className="hamburger-line transition duration-300 ease-in-out origin-bottom-left"></span>
              </button>

              {/* Navigation Menu */}
              <nav
                ref={menuRef}
                className={`absolute rounded-lg py-4 dark:bg-dark dark:shadow-slate-500 lg:static lg:block lg:max-w-full lg:rounded-none lg:bg-transparent lg:shadow-none lg:dark:bg-transparent ${
                  isOpen
                    ? "block bg-white drop-shadow-xl border-spacing-1 right-4 top-full w-full max-w-[250px]"
                    : "hidden "
                }`}
              >
                <ul className="block lg:flex">
                  <li className="group">
                    <a
                      href="#home"
                      className="text-base text-dark py-2 mx-8 group-hover:text-primary dark:text-white"
                    >
                      Beranda
                    </a>
                  </li>
                  <li className="group">
                    <a
                      href="#about"
                      className="text-base text-dark py-2 mx-8 group-hover:text-primary dark:text-white"
                    >
                      About
                    </a>
                  </li>
                  <li className="group">
                    <a
                      href="#portfolio"
                      className="text-base text-dark py-2 mx-8 group-hover:text-primary dark:text-white"
                    >
                      Portfolio
                    </a>
                  </li>
                  <li className="group">
                    <a
                      href="#blog"
                      className="text-base text-dark py-2 mx-8 group-hover:text-primary dark:text-white"
                    >
                      Blog
                    </a>
                  </li>
                  {/* Dark Mode Toggle */}
                  <li className="mt-1 items-center pl-8 lg:mt-0">
                    <div className="flex">
                      <span className="mr-2 text-sm text-slate-500 dark:text-slate-200">
                        <IoSunnySharp />
                      </span>
                      <input
                        type="checkbox"
                        className="hidden"
                        aria-label="dark-mode"
                        id="dark-toggle"
                      />
                      <label htmlFor="dark-toggle">
                        <div className="flex h-5 w-9 cursor-pointer items-center rounded-full bg-slate-500 p-1">
                          <div className="toggle-circle h-4 w-4 rounded-full bg-white transition duration-300 ease-in-out"></div>
                        </div>
                      </label>
                      <span className="ml-2 text-sm text-slate-500 dark:text-slate-200">
                        <BsMoonStarsFill />
                      </span>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* To-Top Button */}
      <button
        ref={toTopRef}
        id="to-top"
        className="hidden fixed bottom-6 right-6 p-3 bg-primary text-white rounded-full shadow-lg transition-all duration-300 ease-in-out"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
    </>
  );
}
