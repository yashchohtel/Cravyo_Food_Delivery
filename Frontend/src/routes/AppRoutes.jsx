import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "../Pages/Auth/Auth";
import Home from "../Pages/Home/Home";
import { useSelector } from "react-redux";

function AppRoutes() {

  // Get auth state from Redux store
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (

    // // routes for the app
    // <Routes>

    //   {/* default splash route */}
    //   <Route path="/" element={<Splash />} />

    //   {/* auth route */}
    //   <Route path="/auth" element={<Auth />} />

    //   {/* home route */}
    //   <Route path="/home" element={<Home />} />

    // </Routes>

    <Routes>

      <Route path="/" element={ isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/auth" replace /> } />

      <Route path="/auth" element={ isAuthenticated ? <Navigate to="/home" replace /> : <Auth /> } />

      <Route path="/home" element={ isAuthenticated ? <Home /> : <Navigate to="/auth" replace /> } />

    </Routes>

  );
}

export default AppRoutes;

