import { useNavigate } from "react-router-dom";
import DeliveryAssignmentCard from "../../../Components/Ui/Delivery Assignment Card/DeliveryAssignmentCard";
import useDeliveryBoy from "../../../hooks/Delivery Boy Hooks/useDeliveryBoyHook";
import "./DeliveryBoyDashboard.css";

const DeliveryBoyDashboard = () => {
    const navigate = useNavigate();
    
    const {
        isDeliveryBoyActive,
        deliveryBoyStatusLoading,
        handleStatusChange,
        assignments,
        assignmentsLoading,
        acceptAssignmentLoading,
        handleAcceptAssignment
    } = useDeliveryBoy();

    const handleAcceptAndOpenDetails = async (assignmentId) => {
        const accepted = await handleAcceptAssignment(assignmentId);
        if (accepted) navigate("/delivery-boy/order/" + assignmentId);
    };

    return (
        <div className="delivery-dashboard">

            {/* Delivery Boy Status */}
            <div
                className={`delivery-status-card ${isDeliveryBoyActive ? "online" : "offline"}`}
            >
                <div className="delivery-status-info">
                    <span className="delivery-status-dot"></span>

                    <div>
                        <h3>
                            {isDeliveryBoyActive
                                ? "You are Online"
                                : "You are Offline"}
                        </h3>

                        <p>
                            {isDeliveryBoyActive
                                ? "You will receive new orders"
                                : "Go online to receive delivery orders"}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    className={`delivery-status-toggle ${deliveryBoyStatusLoading ? "loading" : ""
                        }`}
                    onClick={handleStatusChange}
                    disabled={deliveryBoyStatusLoading}
                    role="switch"
                    aria-checked={isDeliveryBoyActive}
                    aria-label="Toggle delivery availability"
                >
                    <span className="delivery-status-toggle-knob">
                        {deliveryBoyStatusLoading && (
                            <span className="delivery-status-loader"></span>
                        )}
                    </span>
                </button>
            </div>

            {/* Available Delivery Assignments */}
            <section className="available-assignments-section">

                <div className="available-assignments-heading">
                    <div>
                        <h2>Available Orders</h2>
                        <p>Delivery opportunities near you</p>
                    </div>

                    <span className="available-assignments-count">
                        {assignments.length} Orders
                    </span>
                </div>

                {!isDeliveryBoyActive ? (
                    <div className="assignments-empty-state">
                        <h3>You are offline</h3>
                        <p>Go online to receive delivery assignments.</p>
                    </div>
                ) : assignmentsLoading ? (
                    <div className="assignments-empty-state">
                        <span className="assignments-loader"></span>
                        <p>Loading available orders...</p>
                    </div>
                ) : assignments.length === 0 ? (
                    <div className="assignments-empty-state">
                        <h3>No orders available</h3>
                        <p>
                            There are no delivery assignments available right now.
                        </p>
                    </div>
                ) : (
                    <div className="available-assignments-list">
                        {assignments.map((assignment) => (
                            <DeliveryAssignmentCard
                                key={assignment._id}
                                assignment={assignment}
                                onAccept={handleAcceptAndOpenDetails}
                                acceptLoading={acceptAssignmentLoading}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default DeliveryBoyDashboard;