import { Routes, Route } from "react-router-dom";
import Auth from "../Pages/Auth/Auth";
import Home from "../Pages/Home/Home.jsx";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../Pages/Forgot Password/ForgotPassword";
import ResetPassword from "../Pages/Reset Password/ResetPassword";
import DeliveryBoy from "../Pages/Delivery Boy/DeliveryBoy";
import RoleProtectedRoute from "./RoleProtectedRoute";
import Page404 from "../Pages/Page404/Page404";
import LocationPage from "../Pages/Location Page/LocationPage";
import MapPage from "../Pages/Map Page/MapPage";
import AdminPanel from "../Pages/Admin Panel Pages/Admin Panel/AdminPanel";
import AdminDashboard from "../Pages/Admin Panel Pages/Admin Dashboard/AdminDashboard";
import FoodCategories from "../Pages/Admin Panel Pages/Food Categories/FoodCategories";
import PromotionBanners from "../Pages/Admin Panel Pages/Promotion Banners/PromotionBanners";
import CreateRestaurant from "../Pages/Restaurant Pages/Create Restaurant/CreateRestaurant.jsx";
import RestaurantCreateProtectedRoute from "./RestaurantCreateProtectedRoute.jsx";
import RestaurantOwnerAdminPenal from "../Pages/Restaurant Pages/Restaurant Owner Admin Penal/RestaurantOwnerAdminPenal.jsx";
import RestaurantOwnerDashboard from "../Pages/Restaurant Pages/Restaurant Owner Dashboard/RestaurantOwnerDashboard.jsx";
import Orders from "../Pages/Restaurant Pages/Orders/Orders.jsx";
import FoodItems from "../Pages/Restaurant Pages/Food Items/FoodItems.jsx";
import MyRestaurant from "../Pages/Restaurant Pages/My Restaurant/MyRestaurant.jsx";

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

      {/* Location Page */}
      <Route path="/location" element={<ProtectedRoute> <LocationPage /> </ProtectedRoute>} />

      {/* Map Page */}
      <Route path="/map" element={<ProtectedRoute> <MapPage /> </ProtectedRoute>} />

      {/* delivery route */}
      <Route path="/delivery" element={
        <ProtectedRoute>
          <RoleProtectedRoute requiredRole="deliveryBoy"> <DeliveryBoy /> </RoleProtectedRoute>
        </ProtectedRoute>
      } />

      {/* admin panel page */}
      <Route path="/admin"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute requiredRole="admin"> <AdminPanel /> </RoleProtectedRoute>
          </ProtectedRoute>
        }
      >

        {/* main index page of admin panel */}
        <Route index element={<AdminDashboard />} />

        {/* promotion banners page */}
        <Route path="banners" element={<PromotionBanners />} />

        {/* food categories */}
        <Route path="food-categories" element={<FoodCategories />} />

      </Route>

      {/* restaurant create route */}
      <Route
        path="/restaurant/create"
        element={
          <ProtectedRoute>
            <RestaurantCreateProtectedRoute>
              <CreateRestaurant />
            </RestaurantCreateProtectedRoute>
          </ProtectedRoute>
        }
      />

      {/* restaurant owner admin panel */}
      <Route
        path="/restaurant/admin-panel"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute requiredRole="restaurantOwner">
              <RestaurantOwnerAdminPenal />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      >

        {/* default page */}
        <Route index element={<RestaurantOwnerDashboard />} />

        {/* my restaurant */}
        <Route path="my-restaurant" element={<MyRestaurant />} />

        {/* food items */}
        <Route path="food-items" element={<FoodItems />} />

        {/* orders */}
        <Route path="orders" element={<Orders />} />

      </Route>

      {/* non existing url 404 */}
      <Route path="*" element={<Page404 />} />

    </Routes>

  );

}

export default AppRoutes;