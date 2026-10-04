import { FiArrowLeft, FiCheck, FiCheckCircle, FiClock, FiMapPin, FiPackage, FiTruck, FiXCircle } from "react-icons/fi";
import "./OrderDetails.css";
import { useLocation, useNavigate } from "react-router-dom";

const OrderDetails = () => {

    const navigate = useNavigate();

    const { state } = useLocation();

    const order = state?.order;

    if (!order) return null;

    const isCancelled = order.status === "cancelled";
    const isDelivered = order.status === "delivered";

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

    const isStepCompleted = (index) => {

        if (isCancelled) {
            return false;
        }

        if (isDelivered) {
            return true;
        }

        return index < selectedIndex;
    };

    const getStatusContent = () => {

        if (isCancelled) {
            return {
                title: "Order Cancelled",
                description: "This order has been cancelled.",
                icon: <FiXCircle />
            };
        }

        if (isDelivered) {
            return {
                title: "Delivered Successfully",
                description: "Your order has been delivered.",
                icon: <FiCheckCircle />
            };
        }

        const content = {
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
                title: "Out for Delivery",
                description: "Your order is on the way.",
                icon: <FiTruck />
            }

        };

        return content[order.status];
    };

    const statusContent = getStatusContent();

    const getStatusBannerClass = () => {

        if (isCancelled) {
            return "order-details-status-cancelled";
        }

        if (isDelivered) {
            return "order-details-status-delivered";
        }

        return "order-details-status-active";
    };

    return (

        <main className="order-details-page container">

            {/* Header */}
            <header className="order-details-header">

                <button
                    type="button"
                    className="order-details-back-button"
                    onClick={() => navigate(-1)}
                >
                    <FiArrowLeft />
                </button>

                <h1>Order Details</h1>

            </header>

            {/* Restaurant */}
            <section className="order-details-restaurant">

                <div className="order-details-restaurant-image">

                    <img
                        src={order.restaurant?.restaurantId?.image}
                        alt={order.restaurant?.restaurantName}
                    />

                </div>

                <div className="order-details-restaurant-info">

                    <h2>
                        {order.restaurant?.restaurantName}
                    </h2>

                    <p>
                        {order.deliveryAddress?.area},{" "}
                        {order.deliveryAddress?.city}
                    </p>

                </div>

                <button
                    type="button"
                    className="order-details-rate-button"
                >
                    Rate
                </button>

            </section>

            {/* Status Banner */}
            <section
                className={`order-details-status-banner ${getStatusBannerClass()}`}
            >

                <div className="order-details-status-icon">
                    {statusContent.icon}
                </div>

                <div>

                    <h3>
                        {statusContent.title}
                    </h3>

                    <p>
                        {statusContent.description}
                    </p>

                    <span>
                        {new Date(order.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                                day: "numeric",
                                month: "short",
                                year: "numeric"
                            }
                        )}
                        {" • "}
                        {new Date(order.createdAt).toLocaleTimeString(
                            "en-IN",
                            {
                                hour: "2-digit",
                                minute: "2-digit"
                            }
                        )}
                    </span>

                </div>

            </section>

            {/* Progress */}
            {!isCancelled && (
                <section className="order-details-progress">

                    {statuses.map((status, index) => {

                        const completed = isStepCompleted(index);

                        const current =
                            !isDelivered &&
                            status.value === order.status;

                        return (
                            <div
                                className="order-details-progress-step"
                                key={status.value}
                            >
                                <div
                                    className={`
                            order-details-progress-circle
                            ${completed ? "completed" : ""}
                            ${current ? "current" : ""}
                        `}
                                >
                                    {completed
                                        ? <FiCheck />
                                        : status.icon}
                                </div>

                                <span>{status.label}</span>

                                {index < statuses.length - 1 && (
                                    <div
                                        className={`
                                order-details-progress-line
                                ${completed ? "completed" : ""}
                            `}
                                    />
                                )}
                            </div>
                        );
                    })}

                </section>
            )}

            {/* Preparing Information */}
            {!isDelivered && !isCancelled && order.status !== "out_for_delivery" && (

                <section className="order-details-info-banner">

                    <div className="order-details-info-icon">
                        <FiPackage />
                    </div>

                    <div>

                        <strong>
                            {order.status === "preparing"
                                ? "The restaurant is preparing your food"
                                : "Your order is being processed"}
                        </strong>

                        <p>
                            {order.status === "preparing"
                                ? "Your delicious food is being prepared with care."
                                : "We'll update you when your order moves to the next step."}
                        </p>

                    </div>

                </section>

            )}

            {/* Order Items */}
            <section className="order-details-card">

                <div className="order-details-section-title">

                    <h2>
                        Order Items ({order.items?.length || 0})
                    </h2>

                </div>

                <div className="order-details-items">

                    {order.items?.map((item) => (

                        <div
                            className="order-details-item"
                            key={item._id}
                        >

                            <div className="order-details-item-image">

                                <img
                                    src={item.image}
                                    alt={item.name}
                                />

                            </div>

                            <div className="order-details-item-info">

                                <h3>
                                    {item.name}
                                </h3>

                                <p>
                                    × {item.quantity}
                                </p>

                            </div>

                            <strong>
                                ₹{item.price * item.quantity}
                            </strong>

                        </div>

                    ))}

                </div>

            </section>

            {/* Payment Summary */}
            <section className="order-details-card">

                <h2>
                    Payment Summary
                </h2>

                <div className="order-details-price-row">
                    <span>Item Total</span>
                    <span>₹{order.pricing?.itemTotal}</span>
                </div>

                <div className="order-details-price-row">
                    <span>Delivery Fee</span>
                    <span>₹{order.pricing?.deliveryFee}</span>
                </div>

                <div className="order-details-price-row">
                    <span>Taxes</span>
                    <span>₹{order.pricing?.taxes}</span>
                </div>

                <div className="order-details-total-row">
                    <strong>Total Paid</strong>
                    <strong>₹{order.pricing?.totalAmount}</strong>
                </div>

            </section>

            {/* Payment Method */}
            <section className="order-details-info-card">

                <div className="order-details-info-card-icon payment">
                    💳
                </div>

                <div>
                    <strong>Payment Method</strong>
                    <p>{order.paymentMethod}</p>

                    <span>
                        {order.paymentMethod === "COD"
                            ? "Cash on Delivery"
                            : "Online Payment"}
                    </span>
                </div>

            </section>

            {/* Delivery Address */}
            <section className="order-details-info-card">

                <div className="order-details-info-card-icon address">
                    <FiMapPin />
                </div>

                <div>

                    <strong>Delivery Address</strong>

                    <p>
                        {order.deliveryAddress?.houseNumber},{" "}
                        {order.deliveryAddress?.area}
                    </p>

                    <span>
                        {order.deliveryAddress?.city},{" "}
                        MP {order.deliveryAddress?.pincode}
                    </span>

                </div>

            </section>

            {/* Cancelled Help */}
            {isCancelled && (

                <section className="order-details-help">

                    <div className="order-details-help-icon">
                        <FiXCircle />
                    </div>

                    <div>
                        <strong>Need Help?</strong>
                        <p>
                            Contact our support team for any queries.
                        </p>
                    </div>

                    <span>›</span>

                </section>

            )}

        </main>

    );
};

export default OrderDetails;