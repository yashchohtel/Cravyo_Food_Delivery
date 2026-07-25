import { Routes, Route } from "react-router-dom";
import Auth from "../Pages/Auth/Auth";
import Home from "../Pages/Home/Home";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../Pages/Forgot Password/ForgotPassword";
import ResetPassword from "../Pages/Reset Password/ResetPassword";
import RestaurantOwner from "../Pages/Restaurant Owner/RestaurantOwner";
import DeliveryBoy from "../Pages/Delivery Boy/DeliveryBoy";
import RoleProtectedRoute from "./RoleProtectedRoute";
import Page404 from "../Pages/Page404/Page404";

function AppRoutes() {

  return (

    // routes for the app
    <Routes>

      {/* auth route */}
      <Route path="/" element={<PublicRoute> <Auth /> </PublicRoute>} />

      {/* forgot password page */}
      <Route path="/forgotPass" element={<PublicRoute> <ForgotPassword /> </PublicRoute>} />

      {/* reset password page */}
      <Route path="/reset-password/:token" element={<PublicRoute> <ResetPassword /></PublicRoute>} />

      {/* home route */}
      <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />

      {/* restaurant route */}
      <Route path="/restaurant" element={
        <ProtectedRoute>
          <RoleProtectedRoute requiredRole="restaurantOwner"> <RestaurantOwner /> </RoleProtectedRoute>
        </ProtectedRoute>
      } />

      {/* delivery route */}
      <Route path="/delivery" element={
        <ProtectedRoute>
          <RoleProtectedRoute requiredRole="deliveryBoy"> <DeliveryBoy /> </RoleProtectedRoute>
        </ProtectedRoute>
      } />

      {/* non existing url 404 */}
      <Route path="*" element={<Page404 />} />

    </Routes>

  );

}

export default AppRoutes;

