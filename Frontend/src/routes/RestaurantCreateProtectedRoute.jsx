import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RestaurantCreateProtectedRoute = ({ children }) => {

    const { user } = useSelector((state) => state.auth);

    // Already restaurant owner
    if (user?.roles?.includes("restaurantOwner")) {
        return <Navigate to="/restaurant/admin-panel" replace />;
    }

    // Allow restaurant creation
    return children;
};

export default RestaurantCreateProtectedRoute;