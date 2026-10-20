import useDeliveryBoy from "../../../hooks/Delivery Boy Hooks/useDeliveryBoyHook";
import "./DeliveryBoyDashboard.css";

const DeliveryBoyDashboard = () => {

    // get state and funcion from hook
    const {
        isDeliveryBoyActive,
        deliveryBoyStatusLoading,
        handleStatusChange
    } = useDeliveryBoy();

    console.log(isDeliveryBoyActive);

    return (

        <div className="delivery-dashboard">

            {/* Delivery Boy Status */}
            <div className={`delivery-status-card ${isDeliveryBoyActive ? "online" : "offline"}`}>

                <div className="delivery-status-info">

                    <span className="delivery-status-dot"></span>

                    <div>
                        <h3>
                            {isDeliveryBoyActive ? "You are Online" : "You are Offline"}
                        </h3>

                        <p>
                            {isDeliveryBoyActive
                                ? "You will receive new orders"
                                : "You won't receive new orders"}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    className={`delivery-status-toggle ${deliveryBoyStatusLoading ? "loading" : ""}`}
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
                    <h2>Available Orders</h2>
                    <span>{assignments.length} Orders</span>
                </div>

                {!isDeliveryBoyActive ? (

                    <p className="assignments-empty-message">
                        Go online to receive delivery assignments.
                    </p>

                ) : assignmentsLoading ? (

                    <p className="assignments-empty-message">
                        Loading available orders...
                    </p>

                ) : assignments.length === 0 ? (

                    <p className="assignments-empty-message">
                        No delivery assignments available right now.
                    </p>

                ) : (

                    <div className="available-assignments-list">

                        {assignments.map((assignment) => (
                            <DeliveryAssignmentCard
                                key={assignment._id}
                                assignment={assignment}
                                onAccept={handleAcceptAssignment}
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
