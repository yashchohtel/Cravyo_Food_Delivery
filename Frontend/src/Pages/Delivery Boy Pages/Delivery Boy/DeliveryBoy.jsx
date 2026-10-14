import "./DeliveryBoy.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAvailableAssignments } from "../../../features/delivery Assignment/deliveryAssignmentThunk";
import { Outlet } from "react-router-dom";
import DeliveryBoyBottomNav from "../../../Components/Navbars/Delivery Boy Bottom Nav/DeliveryBoyBottomNav";
import { LuBell } from "react-icons/lu";

const DeliveryBoy = () => {

    // initilize dispatch
    const dispatch = useDispatch();

    // Get auth state from Redux store
    const { user } = useSelector((state) => state.auth);

    // getting data form store
    const { assignments } = useSelector((state) => state.deliveryAssignment);

    // Fetch available delivery assignments
    useEffect(() => {
        dispatch(getAvailableAssignments());
    }, [dispatch]);

    // Log available assignments
    useEffect(() => {
        console.log(assignments);
    }, [assignments]);

    return (

        <>

            <div className="delivery-boy-layout">

                {/* header */}
                <header className="delivery-dashboard-header">

                    <div className="delivery-profile">
                        <img
                            src={user?.profileImage}
                            alt={user?.fullName || "Delivery Partner"}
                            className="delivery-profile-image"
                        />

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

                <main className="delivery-boy-content container">
                    <Outlet />
                </main>

                <DeliveryBoyBottomNav />

            </div>

        </>
    );
};

export default DeliveryBoy;