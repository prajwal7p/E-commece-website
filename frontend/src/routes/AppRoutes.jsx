import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Orders from "../pages/Orders/Orders";
import Admin from "../pages/Admin/Admin";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "../components/AdminRoute/AdminRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
