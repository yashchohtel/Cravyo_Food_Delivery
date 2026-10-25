import { Routes, Route } from "react-router-dom";
import Auth from "../Pages/Auth/Auth";
import Home from "../Pages/Home/Home.jsx";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../Pages/Forgot Password/ForgotPassword";
import ResetPassword from "../Pages/Reset Password/ResetPassword";
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
import AllRestaurants from "../Pages/Restaurant Pages/All Restaurants/AllRestaurants.jsx";
import AllPopularFood from "../Pages/All Popular Food/AllPopularFood.jsx";
import RestaurantDetail from "../Pages/Restaurant Pages/Restaurant Detail/RestaurantDetail.jsx";
import CartPage from "../Pages/Cart Page/CartPage.jsx";
import CheckoutPage from "../Pages/Checkout Page/CheckoutPage.jsx";
import OrderSuccess from "../Pages/Order Success/OrderSuccess.jsx";
import MyOrders from "../Pages/My Orders/MyOrders.jsx";
import OrderDetails from "../Pages/Order Details/OrderDetails.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import DeliveryBoyDashboard from "../Pages/Delivery Boy Pages/Delivery Boy Dashboard/DeliveryBoyDashboard.jsx";
import DeliveryBoyOrders from "../Pages/Delivery Boy Pages/Delivery Boy Orders/DeliveryBoyOrders.jsx";
import DeliveryBoyEarnings from "../Pages/Delivery Boy Pages/Delivery Boy Earnings/DeliveryBoyEarnings.jsx";
import DeliveryBoyProfile from "../Pages/Delivery Boy Pages/Delivery Boy Profile/DeliveryBoyProfile.jsx";
import DeliveryOrderDetails from "../Pages/Delivery Boy Pages/Delivery Order Details/DeliveryOrderDetails.jsx";
import DeliveryBoy from "../Pages/Delivery Boy Pages/Delivery Boy/DeliveryBoy.jsx";
import CustomerProfile from "../Pages/Customer Profile/CustomerProfile.jsx";
import BecomeDeliveryPartner from "../Pages/Become Delivery Partner/BecomeDeliveryPartner.jsx";

function AppRoutes() {

  return (

    <>

      {/* scroll to top */}
      <ScrollToTop />

      {/* routes for the app */}
      <Routes>

        {/* non existing url 404 */}
        <Route path="*" element={<Page404 />} />

        {/* auth route */}
        <Route path="/" element={<PublicRoute> <Auth /> </PublicRoute>} />

        {/* forgot password page */}
        <Route path="/forgotPass" element={<ForgotPassword />} />

        {/* reset password page */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* home route */}
        <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />

        {/* Location Page */}
        <Route path="/location" element={<ProtectedRoute> <LocationPage /> </ProtectedRoute>} />

        {/* Map Page */}
        <Route path="/map" element={<ProtectedRoute> <MapPage /> </ProtectedRoute>} />

        {/* pupular restaurent near you */}
        <Route path="/restaurants" element={<ProtectedRoute> <AllRestaurants /> </ProtectedRoute>} />

        {/* pupular restaurent near you */}
        <Route path="/popular-food" element={<ProtectedRoute> <AllPopularFood /> </ProtectedRoute>} />

        {/* restaurant detail page */}
        <Route path="/restaurant/:restaurantId" element={<ProtectedRoute> <RestaurantDetail /> </ProtectedRoute>} />

        {/* cart page */}
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />

        {/* checkout page */}
        <Route path="/checkout" element={<ProtectedRoute> <CheckoutPage /> </ProtectedRoute>} />

        {/* order success page */}
        <Route path="/order-success" element={<ProtectedRoute> <OrderSuccess /> </ProtectedRoute>} />

        {/* order My orders page */}
        <Route path="/my-order" element={<ProtectedRoute> <MyOrders /> </ProtectedRoute>} />

        {/* order details page */}
        <Route path="/order/:orderId" element={<ProtectedRoute> <OrderDetails /> </ProtectedRoute>} />

        {/* customer profile page */}
        <Route path="/profile" element={<ProtectedRoute> <CustomerProfile /> </ProtectedRoute>} />

        {/* become delivery partner */}
        <Route path="/delivery-boy/join" element={<ProtectedRoute> <BecomeDeliveryPartner /> </ProtectedRoute>} />

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
        <Route path="/restaurant/create"
          element={
            <ProtectedRoute>
              <RestaurantCreateProtectedRoute>
                <CreateRestaurant />
              </RestaurantCreateProtectedRoute>
            </ProtectedRoute>
          }
        />


        {/* restaurant owner admin panel */}
        <Route path="/restaurant/admin-panel"
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


        {/* Delivery Boy Routes */}
        <Route path="/delivery-boy"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute requiredRole="deliveryBoy">
                <DeliveryBoy />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        >

          {/* Dashboard */}
          <Route index element={<DeliveryBoyDashboard />} />

          {/* Delivery Boy Orders */}
          <Route path="my-orders" element={<DeliveryBoyOrders />} />

          {/* Earnings */}
          <Route path="earnings" element={<DeliveryBoyEarnings />} />

          {/* Profile */}
          <Route path="profile" element={<DeliveryBoyProfile />} />

          {/* Order Details */}
          <Route path="order/:assignmentId" element={<DeliveryOrderDetails />} />

        </Route>

      </Routes>

    </>

  );

}










export default AppRoutes;
