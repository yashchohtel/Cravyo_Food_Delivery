
import { useState } from "react";
import "./DeliveryBoyDashboard.css";

const DeliveryBoyDashboard = () => {
    const [isOnline, setIsOnline] = useState(false);

    return (
        <div className="delivery-dashboard">

            {/* delivery boy page  */}
            <div className={`delivery-status-card ${isOnline ? "online" : "offline"}`}>
                <div className="delivery-status-info">
                    <span className="delivery-status-dot"></span>

                    <div>
                        <h3>
                            {isOnline ? "You are Online" : "You are Offline"}
                        </h3>
                        <p>
                            {isOnline
                                ? "You will receive new orders"
                                : "You won't receive new orders"}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    className="delivery-status-toggle"
                    onClick={() => setIsOnline((prev) => !prev)}
                    role="switch"
                    aria-checked={isOnline}
                    aria-label="Toggle delivery availability"
                >
                    <span className="delivery-status-toggle-knob"></span>
                </button>
            </div>
            
        </div>
    );
};

export default DeliveryBoyDashboard;
