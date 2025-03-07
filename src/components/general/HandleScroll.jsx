// src/components/general/HandleScroll.jsx

import { useEffect } from "react";

const HandleScroll = ({ setIsFixed, toTopRef }) => {
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

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setIsFixed, toTopRef]);

  return null; // This component doesn't render anything, it just manages the scroll logic.
};

export default HandleScroll;
