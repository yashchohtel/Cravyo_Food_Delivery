import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { getMyOrders } from "../../features/order/orderThunk";
import MyOrderCard from "../../Components/Ui/My Order Card/MyOrderCard";
import { useNavigate } from "react-router-dom";

import "./MyOrders.css";
import MyOrderCardSkeleton from "../../Components/Skeletons/My Order Card Skeleton/MyOrderCardSkeleton";

const MyOrders = () => {

    // initialize navigate
    const navigate = useNavigate();

    // initialize dispatch 
    const dispatch = useDispatch();

    // get orders and loading state from redux store
    const { orders, ordersLoading } = useSelector((state) => state.order);

    // local state to manage active tab
    const [activeTab, setActiveTab] = useState("all");

    // fetch user's orders on component mount
    useEffect(() => {

        if (orders.length === 0) {
            dispatch(getMyOrders());
        }

    }, [dispatch, orders.length]);

    // useMemo to filter orders based on active tab
    const filteredOrders = useMemo(() => {

        if (activeTab === "all") {
            return orders;
        }

        if (activeTab === "active") {
            return orders.filter((order) =>
                [
                    "pending",
                    "confirmed",
                    "preparing",
                    "out_for_delivery"
                ].includes(order.status)
            );
        }

        if (activeTab === "completed") {
            return orders.filter(
                (order) => order.status === "delivered"
            );
        }

        if (activeTab === "cancelled") {
            return orders.filter(
                (order) => order.status === "cancelled"
            );
        }

        return orders;

    }, [orders, activeTab]);

    return (

        <main className="my-orders-page container">

            {/* Header */}
            <header className="my-orders-header">

                <button
                    type="button"
                    className="my-orders-back-button"
                    onClick={() => navigate(-1)}
                >
                    <FiArrowLeft />
                </button>

                <h1>My Orders</h1>

            </header>

            {/* Tabs */}
            <div className="my-orders-tabs">

                {[
                    { value: "all", label: "All" },
                    { value: "active", label: "Active" },
                    { value: "completed", label: "Completed" },
                    { value: "cancelled", label: "Cancelled" }
                ].map((tab) => (

                    <button
                        key={tab.value}
                        type="button"
                        className={
                            activeTab === tab.value
                                ? "active"
                                : ""
                        }
                        onClick={() => setActiveTab(tab.value)}
                    >
                        {tab.label}
                    </button>

                ))}

            </div>

            {/* Orders */}
            <section className="my-orders-list">

                {ordersLoading ? (

                    Array.from({ length: 5 }).map((_, index) => (
                        <MyOrderCardSkeleton key={index} />
                    ))

                ) : filteredOrders.length > 0 ? (

                    filteredOrders.map((order) => (

                        <MyOrderCard
                            key={order._id}
                            order={order}
                            onClick={(order) => navigate(`/order/${order._id}`, {
                                state: { order }
                            })}
                        />

                    ))

                ) : (

                    <div className="my-orders-empty">
                        <h2>No Orders Found</h2>
                        <p>
                            You don't have any orders in this section.
                        </p>
                    </div>

                )}

            </section>
        </main>

    );
};

export default MyOrders;