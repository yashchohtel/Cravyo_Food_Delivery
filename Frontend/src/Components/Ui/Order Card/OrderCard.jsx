import { FiChevronDown, FiEye, FiPackage} from "react-icons/fi";
import "./OrderCard.css";

const OrderCard = ({ order }) => {

    const getStatusLabel = (status) => {
        const labels = {
            pending: "New",
            confirmed: "Confirmed",
            preparing: "Preparing",
            out_for_delivery: "Out for Delivery",
            delivered: "Delivered",
            cancelled: "Cancelled"
        };

        return labels[status] || status;
    };

    const handleStatusChange = (e) => {
        console.log("Change status:", order._id, e.target.value);
    };

    const totalItems = order.items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <div className="order-card">

            {/* Header */}
            <div className="order-card-header">

                <div>
                    <h3>
                        #{order._id.slice(-8).toUpperCase()}
                    </h3>

                    <p>
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                        })}

                        <span>•</span>

                        {new Date(order.createdAt).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                    </p>
                </div>

                <span className={`order-status order-status-${order.status}`}>
                    <span></span>
                    {getStatusLabel(order.status)}
                </span>

            </div>

            {/* Customer */}
            <div className="order-customer">

                <div className="order-customer-avatar">
                    {order.user?.fullName?.charAt(0)?.toUpperCase()}
                </div>

                <div>
                    <h4>
                        {order.user?.fullName || "Customer"}
                    </h4>

                    <p>
                        {order.user?.mobileNumber || "No phone number"}
                    </p>
                </div>

            </div>

            {/* Food Images */}
            <div className="order-food-images">

                {order.items.slice(0, 3).map((item) => (
                    <div
                        className="order-food-image"
                        key={item._id}
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                        />
                    </div>
                ))}

                {order.items.length > 3 && (
                    <div className="order-more-items">
                        +{order.items.length - 3}
                    </div>
                )}

            </div>

            {/* Order Info */}
            <div className="order-card-info">

                <div className="order-items-count">
                    <FiPackage />
                    {totalItems} Items
                </div>

                <strong>
                    ₹{order.pricing?.totalAmount}
                </strong>

                <span
                    className={`order-payment order-payment-${order.paymentMethod.toLowerCase()}`}
                >
                    {order.paymentMethod}
                </span>

            </div>

            {/* Actions */}
            <div className="order-card-actions">

                <button className="order-view-btn">
                    <FiEye />
                    View Details
                </button>

                <div className="order-status-change">
                    <select
                        value={order.status}
                        onChange={handleStatusChange}
                    >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="preparing">Preparing</option>
                        <option value="out_for_delivery">
                            Out for Delivery
                        </option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    <FiChevronDown />
                </div>

            </div>

        </div>
    );
};

export default OrderCard;