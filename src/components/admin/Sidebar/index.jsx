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
import { FaUsersGear } from "react-icons/fa6";
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
        `group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
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
          className={`flex items-center p-2 text-sm font-medium rounded-md ${
            activeRoute[2] === "dashboard"
              ? "text-white bg-gray-700"
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
          to="/admin/dashboard"
        >
          <img src={Logo} alt="Logo" />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z" />
          </svg>
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
                <FaMagic className="mr-2" /> CONTENT MANAGEMENT
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
                          open ? "bg-graydark" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleDropdown(1); // Open/close dropdown on click
                        }}
                      >
                        <GiPencilBrush />
                        Contents
                        <IoIosArrowDropdownCircle
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                        />
                      </NavLink>
                      <div
                        className={`translate transform overflow-hidden ${
                          openDropdown === 1 ? "" : "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-9">
                          {hasAnyPermission(["categories.index"]) && (
                            <li>
                              <div className="flex item-center">
                                <TbCategoryPlus className="text-white" />
                                {renderNavLink(
                                  "/admin/categories",
                                  "Categories"
                                )}
                              </div>
                            </li>
                          )}
                          {hasAnyPermission(["posts.index"]) && (
                            <li>
                              <div className="flex item-center">
                                <MdPostAdd className="text-white" />
                                {renderNavLink("/admin/posts", "Posts")}
                              </div>
                            </li>
                          )}
                          {hasAnyPermission(["pages.index"]) && (
                            <li>{renderNavLink("/admin/pages", "Pages")}</li>
                          )}
                          {hasAnyPermission(["products.index"]) && (
                            <li>
                              <div className="flex item-center">
                                <MdOutlineProductionQuantityLimits className="text-white" />
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
                <MdManageHistory className="mr-2" /> MEDIA MANAGEMENT
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
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 hover:bg-graydark ${
                          open ? "bg-graydark" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleDropdown(2); // Open/close dropdown on click
                        }}
                      >
                        <SiOpenmediavault />
                        Media
                        <IoIosArrowDropdownCircle
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                        />
                      </NavLink>
                      <div
                        className={`translate transform overflow-hidden ${
                          openDropdown === 2 ? "" : "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-9">
                          <li>
                            <div className="flex item-center gap-2">
                              <MdOutlinePermMedia className="text-white" />
                              {renderNavLink("/admin/photos", "Photos")}
                            </div>
                          </li>
                          <li>
                            <div className="flex item-center gap-2">
                              <TiMediaFastForward className="text-white" />
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
                      <FaUsersCog />
                      Users
                      <IoIosArrowDropdownCircle
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
                            <div className="flex items-center gap-2">
                              <MdOutlineSecurity className="text-white" />
                              {renderNavLink("/admin/roles", "Roles")}
                            </div>
                          </li>
                        )}
                        {hasAnyPermission(["permissions.index"]) && (
                          <li>
                            <div className="flex items-center gap-2">
                              <CiUnlock className="text-white" />
                              {renderNavLink(
                                "/admin/permissions",
                                "Permissions"
                              )}
                            </div>
                          </li>
                        )}
                        {hasAnyPermission(["users.index"]) && (
                          <li>
                            <div className="flex items-center gap-2">
                              <FaRegUser className="text-white" />
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
