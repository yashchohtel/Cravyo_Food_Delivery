import { FiArrowRight, FiBox, FiCheck, FiTruck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./ActiveOrderFloatingBar.css";

const ActiveOrderFloatingBar = () => {

    const navigate = useNavigate();

    const { orders } = useSelector((state) => state.order);

    const [isExpanded, setIsExpanded] = useState(false);

    const activeOrders = orders.filter((order) =>
        ["pending", "confirmed", "preparing", "out_for_delivery"]
            .includes(order.status)
    );

    if (activeOrders.length === 0) {
        return null;
    }

    const latestOrder = activeOrders[0];

    const getStatusContent = (status) => {

        const content = {
            pending: {
                title: "Your order has been placed",
                description: "We'll confirm it soon",
                icon: <FiBox />
            },

            confirmed: {
                title: "Order confirmed",
                description: "Restaurant is preparing",
                icon: <FiCheck />
            },

            preparing: {
                title: "Food is being prepared",
                description: "Your order is being prepared",
                icon: <FiBox />
            },

            out_for_delivery: {
                title: "Your order is on the way!",
                description: "Arriving soon",
                icon: <FiTruck />
            }
        };

        return content[status];
    };

    const getOrderIdentifier = (order) => {

        const items = order.items || [];

        if (items.length === 0) {
            return order.restaurant?.restaurantName || "Your order";
        }

        const firstItem = items[0];

        const remainingItems = items.length - 1;

        return `${firstItem.name}${remainingItems > 0
            ? ` + ${remainingItems} more`
            : ""
            }`;
    };

    const handleOrderClick = (event, order) => {

        event.stopPropagation();

        navigate(`/order/${order._id}`, {
            state: { order }
        });
    };

    const latestStatus = getStatusContent(latestOrder.status);

    return (
        <>
            {/* Overlay */}
            {isExpanded && (
                <div
                    className="active-order-overlay"
                    onClick={() => setIsExpanded(false)}
                />
            )}

            <div
                className={`active-order-floating-wrapper ${isExpanded ? "expanded" : ""
                    }`}
            >

                {/* Expanded Orders */}
                {isExpanded && activeOrders.length > 1 && (

                    <div
                        className="active-orders-expanded-list"
                        onClick={(event) => event.stopPropagation()}
                    >

                        {activeOrders.map((order) => {

                            const status = getStatusContent(order.status);

                            return (
                                <button
                                    type="button"
                                    className="active-order-expanded-item"
                                    key={order._id}
                                    onClick={(event) =>
                                        handleOrderClick(event, order)
                                    }
                                >

                                    <span className="active-order-expanded-icon">
                                        {status.icon}
                                    </span>

                                    <span className="active-order-expanded-content">

                                        <strong>
                                            {status.title}
                                        </strong>

                                        <small>
                                            {order.restaurant?.restaurantName}
                                            {" • "}
                                            {getOrderIdentifier(order)}
                                        </small>

                                    </span>

                                    <FiArrowRight />

                                </button>
                            );

                        })}

                        <button
                            type="button"
                            className="active-order-view-orders"
                            onClick={() => navigate("/my-order")}
                        >
                            View All Orders
                            <FiArrowRight />
                        </button>

                    </div>

                )}

                {/* Floating Bar */}
                <div
                    className="active-order-floating-bar"
                    onClick={() => {

                        if (activeOrders.length > 1) {
                            setIsExpanded((prev) => !prev);
                        }

                    }}
                >

                    <div className="active-order-icon">
                        {latestStatus.icon}
                    </div>

                    <div className="active-order-content">

                        <strong>
                            {latestStatus.title}
                        </strong>

                        <span>
                            {latestOrder.restaurant?.restaurantName}
                            {" • "}
                            {getOrderIdentifier(latestOrder)}
                        </span>

                        {activeOrders.length > 1 && (
                            <small>
                                +{activeOrders.length - 1} more active orders
                            </small>
                        )}

                    </div>

                    {activeOrders.length === 1 ? (

                        <button
                            type="button"
                            className="active-order-track-button"
                            onClick={(event) =>
                                handleOrderClick(event, latestOrder)
                            }
                        >
                            Track Order
                            <FiArrowRight />
                        </button>

                    ) : (

                        <span className="active-order-expand-icon">
                            <FiArrowRight />
                        </span>

                    )}

                </div>

            </div>
        </>
    );
};

export default ActiveOrderFloatingBar;