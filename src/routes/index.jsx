//import react router dom
import { Routes, Route, useLocation } from "react-router-dom";
import "../assets/admin/css/style.css";
import "../assets/admin/css/satoshi.css";

import { useEffect, useState } from "react";
import Loader from "../components/general/Loader";

//======================================================
// view admin
//======================================================

//import privateRoute
import PrivateRoutes from "./PrivateRoutes";

//import Dashboard
import Dashboard from "../views/Admin/Dashboard/Index";
//import Permissions
import PermissionsIndex from "../views/Admin/Permissions/Index";
// import RolesIndex
import RolesIndex from "../views/Admin/Roles/Index";
import RolesCreate from "../views/Admin/Roles/Create";
import RolesEdit from "../views/Admin/Roles/Edit";
// import UsersIndex
import UsersIndex from "../views/Admin/Users/Index";
import UsersCreate from "../views/Admin/Users/Create";
import UsersEdit from "../views/Admin/Users/Edit";
// import UsersIndex
import ProfilesIndex from "../views/Admin/Profiles/Index";
// import Categories
import CategoriesIndex from "../views/Admin/Categories/Index";
import CategoriesCreate from "../views/Admin/Categories/Create";
import CategoriesEdit from "../views/Admin/Categories/Edit";
// import Posts
import PostsIndex from "../views/Admin/Posts/Index";
import PostsCreate from "../views/Admin/Posts/Create";
import PostEdit from "../views/Admin/Posts/Edit";
// import Projects
import ProjectsIndex from "../views/Admin/Projects/Index";
import ProjectsCreate from "../views/Admin/Projects/Create";
import ProjectsEdit from "../views/Admin/Projects/Edit";
// import Experiences
import ExperiencesIndex from "../views/Admin/Experiences/Index";
import ExperiencesCreate from "../views/Admin/Experiences/Create";
import ExperiencesEdit from "../views/Admin/Experiences/Edit";
// import Contacts
import ContactsIndex from "../views/Admin/Contacts/Index";
import ContactsCreate from "../views/Admin/Contacts/Create";
import ContactsEdit from "../views/Admin/Contacts/Edit";

//======================================================
// view public
//======================================================
// PUBLIC

//import view login
import Login from "../views/Auth/Login";
//import view Forgot
import Forgot from "../views/Auth/Forgot";
//import view forbidden
import ResetPassword from "../views/Auth/ResetPassword";

import Forbidden from "../views/Auth/Forbidden";

// import Home
import Home from "../views/Web/Home/Index";
// import Blogs
import BlogsIndex from "../views/Web/Post/Index";
import BlogsShow from "../views/Web/Post/Show";
import CategoryPostsIndex from "../views/Web/Post/CategoryPostsIndex";
// import About
import AboutIndex from "../views/Web/About/Index";
// import Projects
import ProjectsHome from "../views/Web/Projects/Index";

export default function RoutesIndex() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  // Reset scroll position on route change
  useEffect(() => {
    console.log("Current path:", pathname);

    window.scrollTo(0, 0);
  }, [pathname]);

  // Simulasi loading selama 1 detik
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Anda bisa menyesuaikan durasi di sini
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      {/* route "/" */}
      <Route path="/" element={<Home />} />

      {/* route "/admin/dashboard" */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/permissions" */}
      <Route
        path="/admin/permissions"
        element={
          <PrivateRoutes>
            <PermissionsIndex />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/roles" */}
      <Route
        path="/admin/roles"
        element={
          <PrivateRoutes>
            <RolesIndex />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/roles/create" */}
      <Route
        path="/admin/roles/create"
        element={
          <PrivateRoutes>
            <RolesCreate />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/roles/edit" */}
      <Route
        path="/admin/roles/edit/:id"
        element={
          <PrivateRoutes>
            <RolesEdit />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/users" */}
      <Route
        path="/admin/users"
        element={
          <PrivateRoutes>
            <UsersIndex />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/users/create" */}
      <Route
        path="/admin/users/create"
        element={
          <PrivateRoutes>
            <UsersCreate />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/users/edit/:id" */}
      <Route
        path="/admin/users/edit/:id"
        element={
          <PrivateRoutes>
            <UsersEdit />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/profiles" */}
      <Route
        path="/admin/profiles/"
        element={
          <PrivateRoutes>
            <ProfilesIndex />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/categories" */}
      <Route
        path="/admin/categories"
        element={
          <PrivateRoutes>
            <CategoriesIndex />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/categories/create" */}
      <Route
        path="/admin/categories/create"
        element={
          <PrivateRoutes>
            <CategoriesCreate />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/categories/edit/:id" */}
      <Route
        path="/admin/categories/edit/:id"
        element={
          <PrivateRoutes>
            <CategoriesEdit />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/posts" */}
      <Route
        path="/admin/posts"
        element={
          <PrivateRoutes>
            <PostsIndex />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/posts/create" */}
      <Route
        path="/admin/posts/create"
        element={
          <PrivateRoutes>
            <PostsCreate />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/posts/edit" */}
      <Route
        path="/admin/posts/edit/:id"
        element={
          <PrivateRoutes>
            <PostEdit />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/projects" */}
      <Route
        path="/admin/projects"
        element={
          <PrivateRoutes>
            <ProjectsIndex />
          </PrivateRoutes>
        }
      />

      {/* route /admin/projects/create" */}
      <Route
        path="/admin/projects/create"
        element={
          <PrivateRoutes>
            <ProjectsCreate />
          </PrivateRoutes>
        }
      />

      {/* route /admin/projects/edit/:id" */}
      <Route
        path="/admin/projects/edit/:id"
        element={
          <PrivateRoutes>
            <ProjectsEdit />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/pages/experiences" */}
      <Route
        path="/admin/experiences"
        element={
          <PrivateRoutes>
            <ExperiencesIndex />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/experiences/create" */}
      <Route
        path="/admin/experiences/create"
        element={
          <PrivateRoutes>
            <ExperiencesCreate />
          </PrivateRoutes>
        }
      />

      {/* route "admin/experiences/edit" */}
      <Route
        path="/admin/experiences/edit/:id"
        element={
          <PrivateRoutes>
            <ExperiencesEdit />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/contacts" */}
      <Route
        path="/admin/contacts"
        element={
          <PrivateRoutes>
            <ContactsIndex />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/contacts/create" */}
      <Route
        path="/admin/contacts/create"
        element={
          <PrivateRoutes>
            <ContactsCreate />
          </PrivateRoutes>
        }
      />

      {/* route "admin/contacts/edit" */}
      <Route
        path="/admin/contacts/edit/:id"
        element={
          <PrivateRoutes>
            <ContactsEdit />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/categories/edit/:id" */}
      <Route
        path="/admin/categories/edit/:id"
        element={
          <PrivateRoutes>
            <CategoriesEdit />
          </PrivateRoutes>
        }
      />

      {/* PUBLIC Route */}

      {/* route "/login" */}
      <Route path="/login" element={<Login />} />
      {/* route "/Forgot" */}
      <Route path="/forgot-password" element={<Forgot />} />
      {/* route "/Reset" */}
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* route "/forbidden" */}
      <Route path="/forbidden" element={<Forbidden />} />

      {/* route "/public/blog" */}
      <Route path="/blog" element={<BlogsIndex />} />
      {/* route "/public/blog/:slug" */}
      <Route path="/blog/:slug" element={<BlogsShow />} />
      <Route path="/blog/category/:slug" element={<CategoryPostsIndex />} />

      {/* route "/public/about" */}
      <Route path="/about" element={<AboutIndex />} />

      {/* route "/public/projects" */}
      <Route path="/projects" element={<ProjectsHome />} />
    </Routes>
  );
}
