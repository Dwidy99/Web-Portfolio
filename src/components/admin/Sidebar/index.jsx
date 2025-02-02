import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import Logo from "../../../assets/admin/images/logo/logo.svg";

// Import js-cookie
import Cookies from "js-cookie";

// Import permissions
import hasAnyPermission from "../../../utils/Permissions";
import { FaMagic, FaRegUser, FaUsersCog } from "react-icons/fa";
import {
  MdManageHistory,
  MdOutlinePermMedia,
  MdOutlineProductionQuantityLimits,
  MdOutlineSecurity,
  MdPostAdd,
} from "react-icons/md";
import {
  FaCircleArrowDown,
  FaCircleChevronDown,
  FaUsersGear,
} from "react-icons/fa6";
import { CiUnlock } from "react-icons/ci";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { SiOpenmediavault } from "react-icons/si";
import { TiMediaFastForward } from "react-icons/ti";
import { GiPencilBrush } from "react-icons/gi";
import { TbCategoryPlus } from "react-icons/tb";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  // Split pathname to get active route
  const activeRoute = pathname.split("/");

  // Get user data from cookies
  const user = JSON.parse(Cookies.get("user"));

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  const [openDropdown, setOpenDropdown] = useState(null); // To track which dropdown is open

  // Close sidebar on click outside
  useEffect(() => {
    const clickHandler = (event) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(event.target) ||
        trigger.current.contains(event.target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen]);

  // Close sidebar on ESC key press
  useEffect(() => {
    const keyHandler = (event) => {
      if (!sidebarOpen || event.keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index); // Toggle dropdown
  };

  const renderNavLink = (to, label, activeCondition) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group relative flex items-center rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
          isActive || activeCondition ? "!text-white " : ""
        }`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link
          className={`flex items-center p-2 font-extrabold text-lg tablet:text-sm rounded-md ${
            activeRoute[2] === "dashboard"
              ? "text-white bg-gray-700"
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
          to="/admin/dashboard"
        >
          My Portfolio Website
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <i className="fa-solid fa-arrow-left text-white"></i>
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* CONTENT MANAGEMENT */}
          {(hasAnyPermission(["photos.index"]) ||
            hasAnyPermission(["sliders.index"])) && (
            <>
              <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2 flex items-center">
                <i className="fa-solid fa-wand-magic-sparkles mr-2"></i> CONTENT
                MANAGEMENT
              </h3>
              <ul className="mb-6 flex flex-col gap-1.5">
                {/* Contents Link */}
                <SidebarLinkGroup
                  activeCondition={activeRoute[2] === "dashboard"}
                >
                  {(handleClick, open) => (
                    <>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 hover:bg-graydark ${
                          open ? "" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <i className="fa-solid fa-wand-sparkles"></i>
                        Contents
                        <FaCircleChevronDown
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                        />
                      </NavLink>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-9">
                          {hasAnyPermission(["categories.index"]) && (
                            <li>
                              <div className="flex items-center">
                                <i className="fa-solid fa-layer-group text-white"></i>
                                {renderNavLink(
                                  "/admin/categories",
                                  "Categories"
                                )}
                              </div>
                            </li>
                          )}
                          {hasAnyPermission(["posts.index"]) && (
                            <li>
                              <div className="flex items-center">
                                <i className="fa-solid fa-file-circle-plus text-white"></i>
                                {renderNavLink("/admin/posts", "Posts")}
                              </div>
                            </li>
                          )}
                          {hasAnyPermission(["pages.index"]) && (
                            <li>{renderNavLink("/admin/pages", "Pages")}</li>
                          )}
                          {hasAnyPermission(["products.index"]) && (
                            <li>
                              <div className="flex items-center">
                                <i className="fa-solid fa-bars text-white"></i>
                                {renderNavLink("/admin/products", "Products")}
                              </div>
                            </li>
                          )}
                        </ul>
                      </div>
                    </>
                  )}
                </SidebarLinkGroup>
              </ul>
            </>
          )}

          {/* MEDIA MANAGEMENT */}
          {hasAnyPermission(["sliders.index"]) && (
            <>
              <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2 flex items-center">
                <i className="fa-solid fa-bars-progress mr-2"></i> MEDIA
                MANAGEMENT
              </h3>
              <ul className="mb-6 flex flex-col gap-1.5">
                {/* Media Link */}
                <SidebarLinkGroup
                  activeCondition={activeRoute[2] === "dashboard"}
                >
                  {(handleClick, open) => (
                    <>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          open ? "" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <SiOpenmediavault />
                        Media
                        <FaCircleChevronDown
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                        />
                      </NavLink>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-9">
                          <li>
                            <div className="flex items-center">
                              <i className="fa-solid fa-images text-white"></i>
                              {renderNavLink("/admin/photos", "Photos")}
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center">
                              <i className="fa-solid fa-photo-film text-white"></i>
                              {renderNavLink("/admin/sliders", "Sliders")}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                </SidebarLinkGroup>
              </ul>
            </>
          )}

          {/* USERS MANAGEMENT */}
          <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2 flex items-center">
            <FaUsersGear className="mr-2" /> USERS MANAGEMENT
          </h3>

          {hasAnyPermission(["roles.index"]) ||
          hasAnyPermission(["permissions.index"]) ||
          hasAnyPermission(["users.index"]) ? (
            <ul className="mb-6 flex flex-col gap-1.5">
              <SidebarLinkGroup activeCondition={activeRoute[2] === "users"}>
                {(handleClick, open) => (
                  <>
                    <NavLink
                      to="#"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        open ? "" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        sidebarExpanded
                          ? handleClick()
                          : setSidebarExpanded(true);
                      }}
                    >
                      <i className="fa-solid fa-users-gear"></i>
                      Users
                      <FaCircleChevronDown
                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                          open && "rotate-180"
                        }`}
                      />
                    </NavLink>
                    <div
                      className={`translate transform overflow-hidden ${
                        !open && "hidden"
                      }`}
                    >
                      <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-9">
                        {hasAnyPermission(["roles.index"]) && (
                          <li>
                            <div className="flex items-center">
                              <i className="fa-solid fa-user-shield text-white"></i>
                              {renderNavLink("/admin/roles", "Roles")}
                            </div>
                          </li>
                        )}
                        {hasAnyPermission(["permissions.index"]) && (
                          <li>
                            <div className="flex items-center">
                              <i className="fa-solid fa-building-lock text-white"></i>
                              {renderNavLink(
                                "/admin/permissions",
                                "Permissions"
                              )}
                            </div>
                          </li>
                        )}
                        {hasAnyPermission(["users.index"]) && (
                          <li>
                            <div className="flex items-center">
                              <i className="fa-solid fa-users text-white"></i>
                              {renderNavLink("/admin/users", "Users")}
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>
                  </>
                )}
              </SidebarLinkGroup>
            </ul>
          ) : null}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
