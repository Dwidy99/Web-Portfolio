//import react router dom
import { Routes, Route, useLocation } from "react-router-dom";
import "../assets/admin/css/style.css";
import "../assets/admin/css/satoshi.css";

//======================================================
// view admin
//======================================================

//import view login
import Login from "../views/Auth/Login";
//import view Forgot
import Forgot from "../views/Auth/Forgot";
//import view forbidden
import ResetPassword from "../views/Auth/ResetPassword";

import Forbidden from "../views/Auth/Forbidden";
//import privateRoute
import PrivateRoutes from "./PrivateRoutes";

//import Dashboard
import Dashboard from "../views/Admin/Dashboard";
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
// import Pages
import PagesIndex from "../views/Admin/Pages/Index";
import PagesCreate from "../views/Admin/Pages/Create";
import PagesEdit from "../views/Admin/Pages/Edit";
// import Photos
import PhotosIndex from "../views/Admin/Photos/Index";
import PhotosCreate from "../views/Admin/Photos/Create";
import PhotosEdit from "../views/Admin/Photos/Edit";
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
// import Home

import { useEffect, useState } from "react";
import Loader from "../components/general/Loader";

// import Home
import Home from "../views/Web/Home/Index";
// import Blogs
import BlogsIndex from "../views/Web/Post/Index";
import BlogsShow from "../views/Web/Post/Show";
import CategoryPostsIndex from "../views/Web/Post/CategoryPostsIndex";
// import About
import AboutIndex from "../views/Web/About/Index";
// import Projects
import ProjectsIndex from "../views/Web/Projects/Index";

export default function RoutesIndex() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  // Reset scroll position on route change
  useEffect(() => {
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
      {/* route "/login" */}
      <Route path="/login" element={<Login />} />
      {/* route "/Forgot" */}
      <Route path="/forgot-password" element={<Forgot />} />
      {/* route "/Reset" */}
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* route "/forbidden" */}
      <Route path="/forbidden" element={<Forbidden />} />

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

      {/* route "/admin/pages" */}
      <Route
        path="/admin/pages"
        element={
          <PrivateRoutes>
            <PagesIndex />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/pages/create" */}
      <Route
        path="/admin/pages/create"
        element={
          <PrivateRoutes>
            <PagesCreate />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/pages/edit/:id" */}
      <Route
        path="/admin/pages/edit/:id"
        element={
          <PrivateRoutes>
            <PagesEdit />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/photos" */}
      <Route
        path="/admin/photos"
        element={
          <PrivateRoutes>
            <PhotosIndex />
          </PrivateRoutes>
        }
      />

      {/* route /admin/photos/create" */}
      <Route
        path="/admin/photos/create"
        element={
          <PrivateRoutes>
            <PhotosCreate />
          </PrivateRoutes>
        }
      />

      {/* route /admin/photos/edit/:id" */}
      <Route
        path="/admin/photos/edit/:id"
        element={
          <PrivateRoutes>
            <PhotosEdit />
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

      {/* PUBLIC Route */}

      {/* route "/" */}
      <Route path="/" element={<Home />} />

      {/* route "/admin/categories/edit/:id" */}
      <Route
        path="/admin/categories/edit/:id"
        element={
          <PrivateRoutes>
            <CategoriesEdit />
          </PrivateRoutes>
        }
      />

      {/* route "/public/blog" */}
      <Route path="/blog" element={<BlogsIndex />} />
      {/* route "/public/blog/:slug" */}
      <Route path="/blog/:slug" element={<BlogsShow />} />
      <Route path="/blog/category/:slug" element={<CategoryPostsIndex />} />

      {/* route "/public/about" */}
      <Route path="/about" element={<AboutIndex />} />

      {/* route "/public/projects" */}
      <Route path="/projects" element={<ProjectsIndex />} />
    </Routes>
  );
}
