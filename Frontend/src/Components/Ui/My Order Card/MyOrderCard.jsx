import "./MyOrderCard.css";
import {
    FiCheck,
    FiCheckCircle,
    FiClock,
    FiPackage,
    FiTruck,
    FiXCircle
} from "react-icons/fi";

const MyOrderCard = ({ order, onClick }) => {

    const statuses = [
        {
            value: "pending",
            label: "Pending",
            icon: <FiClock />
        },
        {
            value: "confirmed",
            label: "Confirmed",
            icon: <FiCheck />
        },
        {
            value: "preparing",
            label: "Preparing",
            icon: <FiPackage />
        },
        {
            value: "out_for_delivery",
            label: "Out for Delivery",
            icon: <FiTruck />
        },
        {
            value: "delivered",
            label: "Delivered",
            icon: <FiCheckCircle />
        }
    ];

    const selectedIndex = statuses.findIndex(
        (status) => status.value === order.status
    );

    const isCancelled = order.status === "cancelled";

    const isCompleted = (index) => {
        if (isCancelled) return false;
        return index < selectedIndex;
    };

    const getStatusContent = () => {

        const statusContent = {
            pending: {
                title: "Order placed",
                description: "Your order has been placed successfully.",
                icon: <FiClock />
            },

            confirmed: {
                title: "Order confirmed",
                description: "The restaurant has confirmed your order.",
                icon: <FiCheck />
            },

            preparing: {
                title: "Food is being prepared",
                description: "Your order is being prepared by the restaurant.",
                icon: <FiPackage />
            },

            out_for_delivery: {
                title: "Your order is on the way",
                description: "Your order is out for delivery.",
                icon: <FiTruck />
            },

            delivered: {
                title: "Delivered Successfully",
                description: "Your order has been delivered.",
                icon: <FiCheckCircle />
            },

            cancelled: {
                title: "Order Cancelled",
                description: "This order has been cancelled.",
                icon: <FiXCircle />
            }
        };

        return statusContent[order.status];
    };

    const statusContent = getStatusContent();

    return (

        <article
            className="my-order-card"
            onClick={() => onClick?.(order)}
        >

            {/* Header */}
            <div className="my-order-card-header">

                <div className="my-order-restaurant">

                    <div className="my-order-restaurant-image">
                        <img
                            src={order.restaurant?.restaurantId?.image}
                            alt={order.restaurant?.restaurantName}
                        />
                    </div>

                    <div>
                        <h3>
                            {order.restaurant?.restaurantName}
                        </h3>

                        <p>
                            {new Date(order.createdAt).toLocaleDateString(
                                "en-IN",
                                {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric"
                                }
                            )}

                            <span>•</span>

                            {new Date(order.createdAt).toLocaleTimeString(
                                "en-IN",
                                {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                }
                            )}
                        </p>
                    </div>

                </div>

                <div className="my-order-card-amount">

                    <strong>
                        ₹{order.pricing?.totalAmount}
                    </strong>

                    <span>
                        {order.paymentMethod}
                    </span>

                </div>

            </div>

            {/* Progress */}
            <div className="my-order-progress">

                {statuses.map((status, index) => {

                    const completed = isCompleted(index);
                    const current = !isCancelled && status.value === order.status;

                    return (
                        <div
                            className="my-order-progress-step"
                            key={status.value}
                        >

                            <div
                                className={`
                                    my-order-progress-circle
                                    ${completed ? "completed" : ""}
                                    ${current ? "current" : ""}
                                `}
                            >
                                {completed ? <FiCheck /> : status.icon}
                            </div>

                            <span>
                                {status.label}
                            </span>

                            {index < statuses.length - 1 && (
                                <div
                                    className={`
                                        my-order-progress-line
                                        ${completed ? "completed" : ""}
                                    `}
                                />
                            )}

                        </div>
                    );

                })}

            </div>

            {/* Current Status */}
            <div
                className={`
                    my-order-status-message
                    my-order-status-${order.status}
                `}
            >

                <div className="my-order-status-icon">
                    {statusContent.icon}
                </div>

                <div className="my-order-status-content">

                    <strong>
                        {statusContent.title}
                    </strong>

                    <p>
                        {statusContent.description}
                    </p>

                </div>

                <span className="my-order-status-arrow">
                    →
                </span>

            </div>

        </article>
    );
};

export default MyOrderCard;