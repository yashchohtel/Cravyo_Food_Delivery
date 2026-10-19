import { useState } from "react";
import { LuMapPin, LuClock3, LuWallet, LuChevronDown, LuChevronUp } from "react-icons/lu";
import "./DeliveryAssignmentCard.css";

const DeliveryAssignmentCard = ({ assignment, onAccept, acceptLoading }) => {

    const [showDetails, setShowDetails] = useState(false);

    // Get order and shop details
    const order = assignment.order;
    const shop = assignment.shop;
    const deliveryAddress = order?.deliveryAddress;
    const items = order?.items || [];

    // Format customer delivery address
    const customerAddress = deliveryAddress
        ? `${deliveryAddress.houseNumber}, ${deliveryAddress.area}, ${deliveryAddress.city} - ${deliveryAddress.pincode}`
        : "Delivery address unavailable";

    // Calculate estimated delivery time
    const estimatedMinutes = Math.round((assignment.distance || 0) * 4 + 5);

    return (

        <article className="delivery-assignment-card">

            {/* Shop Details */}
            <div className="assignment-shop-details">

                <div className="assignment-shop-image">
                    {shop?.image && (
                        <img
                            src={shop.image}
                            alt={shop?.name || "Shop"}
                        />
                    )}
                </div>

                <div className="assignment-shop-info">
                    <h3>{shop?.name || "Restaurant"}</h3>

                    <p>
                        <LuMapPin />
                        {shop?.address?.city || shop?.address?.street || "Shop address unavailable"}
                    </p>

                    <span className="assignment-order-id">
                        Order #{order?._id?.slice(-6).toUpperCase()}
                    </span>
                </div>

            </div>

            {/* Order Items */}
            <div className="assignment-items">

                <h4>Order Items ({items.length})</h4>

                {items.slice(0, 2).map((item) => (
                    <div className="assignment-item" key={item._id}>
                        <span>{item.name} × {item.quantity}</span>
                        <span>₹{item.price * item.quantity}</span>
                    </div>
                ))}

                {items.length > 2 && (
                    <p className="assignment-more-items">
                        +{items.length - 2} more items
                    </p>
                )}

            </div>

            {/* Delivery Address */}
            <div className="assignment-delivery-address">
                <span className="assignment-location-icon">
                    <LuMapPin />
                </span>

                <div>
                    <p>Deliver to</p>
                    <strong>{customerAddress}</strong>
                </div>
            </div>

            {/* Distance, Time and Earning */}
            <div className="assignment-stats">

                <div className="assignment-stat">
                    <LuMapPin />
                    <div>
                        <strong>{Number(assignment.distance || 0).toFixed(2)} km</strong>
                        <span>Distance</span>
                    </div>
                </div>

                <div className="assignment-stat">
                    <LuClock3 />
                    <div>
                        <strong>{estimatedMinutes} min</strong>
                        <span>Est. time</span>
                    </div>
                </div>

                <div className="assignment-stat">
                    <LuWallet />
                    <div>
                        <strong>₹{assignment.deliveryEarning ?? 0}</strong>
                        <span>Your earning</span>
                    </div>
                </div>

            </div>

            {/* View Details */}
            <button
                type="button"
                className="assignment-details-btn"
                onClick={() => setShowDetails((previous) => !previous)}
            >
                {showDetails ? "Hide Details" : "View Details"}

                {showDetails ? <LuChevronUp /> : <LuChevronDown />}
            </button>

            {/* Expanded Details */}
            {showDetails && (
                <div className="assignment-expanded-details">

                    <h4>All Order Items</h4>

                    {items.map((item) => (
                        <div className="assignment-item" key={item._id}>
                            <span>{item.name} × {item.quantity}</span>
                            <span>₹{item.price * item.quantity}</span>
                        </div>
                    ))}

                    <div className="assignment-full-address">
                        <strong>Pickup Address</strong>
                        <p>
                            {shop?.address?.street}, {shop?.address?.city},{" "}
                            {shop?.address?.state} - {shop?.address?.pincode}
                        </p>

                        <strong>Delivery Address</strong>
                        <p>{customerAddress}</p>
                    </div>

                </div>
            )}

            {/* Accept Order */}
            <button
                type="button"
                className="assignment-accept-btn"
                onClick={() => onAccept(assignment._id)}
                disabled={acceptLoading}
            >
                {acceptLoading ? "Accepting..." : "Accept Order"}
            </button>

        </article>

    );
};

export default DeliveryAssignmentCard;
