import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleProtectedRoute = ({ children, requiredRole }) => {

    // getting required data from global store using useSelector
    const { user } = useSelector((state) => state.auth);

    const hasRole = user?.roles?.includes(requiredRole);

    if (!hasRole) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default RoleProtectedRoute;