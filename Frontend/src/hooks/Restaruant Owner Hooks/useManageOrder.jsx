import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const useManageOrder = () => {

    const {
        restaurantOrders,
        restaurantOrdersLoading
    } = useSelector((state) => state.order);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [dateFilter, setDateFilter] = useState("");

    // Stats
    const totalOrders = restaurantOrders.length;

    const pendingOrders = restaurantOrders.filter(
        (order) => order.status === "pending"
    ).length;

    const preparingOrders = restaurantOrders.filter(
        (order) => order.status === "preparing"
    ).length;

    const outForDeliveryOrders = restaurantOrders.filter(
        (order) => order.status === "out_for_delivery"
    ).length;

    const deliveredOrders = restaurantOrders.filter(
        (order) => order.status === "delivered"
    ).length;

    // Filter orders
    const filteredOrders = useMemo(() => {

        return restaurantOrders.filter((order) => {

            const searchValue = search.toLowerCase().trim();

            const matchesSearch =
                !searchValue ||
                order._id?.toLowerCase().includes(searchValue) ||
                order.user?.fullName?.toLowerCase().includes(searchValue);

            const matchesStatus =
                !status || order.status === status;

            const matchesPayment =
                !paymentMethod ||
                order.paymentMethod === paymentMethod;

            let matchesDate = true;

            if (dateFilter) {
                const orderDate = new Date(order.createdAt);
                const today = new Date();

                today.setHours(0, 0, 0, 0);
                orderDate.setHours(0, 0, 0, 0);

                const difference =
                    (today - orderDate) / (1000 * 60 * 60 * 24);

                if (dateFilter === "today") {
                    matchesDate = difference === 0;
                }

                if (dateFilter === "yesterday") {
                    matchesDate = difference === 1;
                }

                if (dateFilter === "7days") {
                    matchesDate = difference >= 0 && difference <= 7;
                }

                if (dateFilter === "30days") {
                    matchesDate = difference >= 0 && difference <= 30;
                }
            }

            return (
                matchesSearch &&
                matchesStatus &&
                matchesPayment &&
                matchesDate
            );
        });

    }, [
        restaurantOrders,
        search,
        status,
        paymentMethod,
        dateFilter
    ]);

    const resetFilters = () => {
        setSearch("");
        setStatus("");
        setPaymentMethod("");
        setDateFilter("");
    };

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

    return {
        restaurantOrdersLoading,

        search,
        setSearch,

        status,
        setStatus,

        paymentMethod,
        setPaymentMethod,

        dateFilter,
        setDateFilter,

        filteredOrders,

        totalOrders,
        pendingOrders,
        preparingOrders,
        outForDeliveryOrders,
        deliveredOrders,

        resetFilters,
        getStatusLabel
    };
};

export default useManageOrder;