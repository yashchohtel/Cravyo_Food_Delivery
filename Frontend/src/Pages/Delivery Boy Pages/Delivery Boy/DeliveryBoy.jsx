import "./DeliveryBoy.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAvailableAssignments } from "../../../features/delivery Assignment/deliveryAssignmentThunk";
import { Outlet, useLocation } from "react-router-dom";
import DeliveryBoyBottomNav from "../../../Components/Navbars/Delivery Boy Bottom Nav/DeliveryBoyBottomNav";
// eslint-disable-next-line no-unused-vars
import { LuBell, LuArrowLeft } from "react-icons/lu";
import { FiUser } from "react-icons/fi";

const DeliveryBoy = () => {

    // Initialize dispatch
    const dispatch = useDispatch();

    // Get current route
    const location = useLocation();
    const isOrderDetailsPage = /^\/delivery-boy\/order\/[^/]+$/.test(
        location.pathname
    );

    // Get auth state from Redux store
    const { user } = useSelector((state) => state.auth);

    // Get available assignments
    const { assignments } = useSelector((state) => state.deliveryAssignment);

    const [isProfileImageError, setIsProfileImageError] = useState(false);

    // Fetch available delivery assignments
    useEffect(() => {
        dispatch(getAvailableAssignments());
    }, [dispatch]);

    // Log available assignments
    useEffect(() => {
        console.log(assignments);
    }, [assignments]);

    return (

        <div className="delivery-boy-layout">

            {!isOrderDetailsPage && (
                <>
                    {/* Header */}
                    <header className="delivery-dashboard-header">
                        <div className="delivery-profile">
                            <div className="delivery-profile-image-container">
                                {user?.profileImage && !isProfileImageError ? (
                                    <img
                                        src={user.profileImage}
                                        alt={user?.fullName || "Delivery Partner"}
                                        className="delivery-profile-image"
                                        onError={() => setIsProfileImageError(true)}
                                    />
                                ) : (
                                    <FiUser className="delivery-profile-fallback" />
                                )}
                            </div>

                            <div className="delivery-profile-info">
                                <h2>{user?.fullName || "Delivery Partner"}</h2>
                                <p>Delivery Partner</p>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="delivery-notification-btn"
                            aria-label="Notifications"
                        >
                            <LuBell />
                        </button>
                    </header>
                </>
            )}

            {/* Page Content */}
            <main
                className={`delivery-boy-content container ${isOrderDetailsPage ? "delivery-details-content" : ""}`}
            >
                <Outlet />
            </main>

            {!isOrderDetailsPage && <DeliveryBoyBottomNav />}
        </div>
    );
};

export default DeliveryBoy;