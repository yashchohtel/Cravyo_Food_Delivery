import { Routes, Route } from "react-router-dom";
import Auth from "../Pages/Auth/Auth";
import Home from "../Pages/Home/Home";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import About from "../Pages/about";
import Services from "../Pages/services";

function AppRoutes() {

  return (

    // routes for the app
    <Routes>

      {/* auth route */}
      <Route path="/" element={<PublicRoute> <Auth /> </PublicRoute>} />

      {/* home route */}
      <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />

      <Route path="/about" element={<PublicRoute> <About /> </PublicRoute>} />

      <Route path="/services" element={<PublicRoute><Services /></PublicRoute>} />

    </Routes>


  );
}

export default AppRoutes;

