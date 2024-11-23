//import react router dom
import { Routes, Route } from "react-router-dom";

//======================================================
// view admin
//======================================================

//import view login
import Login from "../views/Auth/Login";
//import view forbidden
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
// import Products
import ProductsIndex from "../views/Admin/Products/Index";
import ProductsCreate from "../views/Admin/Products/Create";
import ProductsEdit from "../views/Admin/Products/Edit";
// import Photos
import PhotosIndex from "../views/Admin/Photos/Index";
import PhotosCreate from "../views/Admin/Photos/Create";
// import Sliders
import SlidersIndex from "../views/Admin/Sliders/Index";
// import Aparaturs
import AparatursIndex from "../views/Admin/Aparaturs/Index";
import AparatursEdit from "../views/Admin/Aparaturs/Edit";
import AparatursCreate from "../views/Admin/Aparaturs/Create";

// PUBLIC
// import Home
import Home from "../views/Home/Index";

export default function RoutesIndex() {
  return (
    <Routes>
      {/* route "/login" */}
      <Route path="/login" element={<Login />} />

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

      {/* route "/admin/pages/products" */}
      <Route
        path="/admin/products"
        element={
          <PrivateRoutes>
            <ProductsIndex />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/products/create" */}
      <Route
        path="/admin/products/create"
        element={
          <PrivateRoutes>
            <ProductsCreate />
          </PrivateRoutes>
        }
      />

      {/* route "admin/products/edit" */}
      <Route
        path="/admin/products/edit/:id"
        element={
          <PrivateRoutes>
            <ProductsEdit />
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

      {/* route */}
      <Route
        path="/admin/photos/create"
        element={
          <PrivateRoutes>
            <PhotosCreate />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/sliders" */}
      <Route
        path="/admin/sliders"
        element={
          <PrivateRoutes>
            <SlidersIndex />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/aparaturs" */}
      <Route
        path="/admin/aparaturs"
        element={
          <PrivateRoutes>
            <AparatursIndex />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/aparturs/edit/:id" */}
      <Route
        path="/admin/aparaturs/edit/:id"
        element={
          <PrivateRoutes>
            <AparatursEdit />
          </PrivateRoutes>
        }
      />

      {/* route "/admin/aparaturs" */}
      <Route
        path="/admin/aparaturs/create"
        element={
          <PrivateRoutes>
            <AparatursCreate />
          </PrivateRoutes>
        }
      />

      {/* PUBLIC Route */}

      {/* route "/" */}
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
