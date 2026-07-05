import { Routes, Route } from "react-router-dom";
import Splash from "../Pages/Splash/Splash";
import Auth from "../Pages/Auth/Auth";
import Home from "../Pages/Home/Home";

function AppRoutes() {

  return (

    // routes for the app
    <Routes>

      {/* default splash route */}
      {/* <Route path="/" element={<Splash />} /> */}
      <Route
        path="/"
        element={<h1 style={{ color: "red" }}>ROOT PAGE</h1>}
      />

      {/* auth route */}
      <Route path="/auth" element={<Auth />} />

      {/* home route */}
      <Route path="/home" element={<Home />} />

    </Routes>

  );
}

export default AppRoutes;