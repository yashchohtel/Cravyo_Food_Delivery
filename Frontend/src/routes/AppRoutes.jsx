import { Routes, Route } from "react-router-dom";
import Auth from "../Pages/Auth/Auth";
import Home from "../Pages/Home/Home";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../Pages/Forgot Password/ForgotPassword";
import ResetPassword from "../Pages/Reset Password/ResetPassword";

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

    </Routes>

  );

}

export default AppRoutes;

