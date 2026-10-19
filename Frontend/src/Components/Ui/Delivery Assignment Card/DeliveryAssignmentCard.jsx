
import { useNavigate } from "react-router-dom";
import { LuMapPin, LuWallet, LuArrowUpRight } from "react-icons/lu";
import "./DeliveryAssignmentCard.css";

const DeliveryAssignmentCard = ({
    assignment,
    onAccept,
    acceptLoading
}) => {

    // Initialize navigation
    const navigate = useNavigate();

    // Get order and shop details
    const order = assignment.order;
    const shop = assignment.shop;
    const deliveryAddress = order?.deliveryAddress;

    // Open order details page
    const handleViewDetails = () => {
        navigate(`/delivery-boy/order/${order._id}`);
    };

    return (

        <article className="delivery-assignment-card">

            {/* Shop Details */}
            <div className="assignment-card-header">

                <div className="assignment-card-image">
                    {shop?.image && (
                        <img
                            src={shop.image}
                            alt={shop.name}
                        />
                    )}
                </div>

                <div className="assignment-card-shop">
                    <h3>{shop?.name || "Shop"}</h3>

                    <p>
                        <LuMapPin />
                        {deliveryAddress?.area}, {deliveryAddress?.city}
                    </p>

                    <span>
                        {order?.items?.length || 0} items
                    </span>
                </div>

            </div>

            {/* Distance and Earning */}
            <div className="assignment-card-info">

                <div className="assignment-card-stat">
                    <LuMapPin />
                    <div>
                        <strong>
                            {Number(assignment.distance || 0).toFixed(2)} km
                        </strong>
                        <span>Delivery distance</span>
                    </div>
                </div>

                <div className="assignment-card-stat">
                    <LuWallet />
                    <div>
                        <strong>₹{assignment.deliveryEarning ?? 0}</strong>
                        <span>Your earning</span>
                    </div>
                </div>

            </div>

            {/* Card Actions */}
            <div className="assignment-card-actions">

                <button
                    type="button"
                    className="assignment-view-btn"
                    onClick={handleViewDetails}
                >
                    View Order Details
                    <LuArrowUpRight />
                </button>

                <button
                    type="button"
                    className="assignment-accept-btn"
                    onClick={() => onAccept(assignment._id)}
                    disabled={acceptLoading}
                >
                    {acceptLoading ? "Accepting..." : "Accept Order"}
                </button>

            </div>

        </article>

    );
};

export default DeliveryAssignmentCard;
