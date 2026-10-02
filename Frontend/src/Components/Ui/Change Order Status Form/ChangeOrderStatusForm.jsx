/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { FiX, FiClock, FiCheck, FiCheckCircle, FiTruck, FiPackage, FiXCircle} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import "./ChangeOrderStatusForm.css";
import { updateOrderStatus } from "../../../features/order/orderThunk";
import ButtonLoader from "../../Loaders/ButtonLoader/ButtonLoader";

const ChangeOrderStatusForm = ({ onClose, data }) => {

    const dispatch = useDispatch();

    const { updateOrderStatusLoading } = useSelector(
        (state) => state.order
    );

    const [selectedStatus, setSelectedStatus] = useState(
        data?.status || "pending"
    );

    useEffect(() => {
        setSelectedStatus(data?.status || "pending");
    }, [data]);

    const statuses = [
        {
            value: "pending",
            label: "Pending",
            description: "Order placed by customer",
            icon: <FiClock />
        },
        {
            value: "confirmed",
            label: "Confirmed",
            description: "Order confirmed by restaurant",
            icon: <FiCheck />
        },
        {
            value: "preparing",
            label: "Preparing",
            description: "Food is being prepared",
            icon: <FiPackage />
        },
        {
            value: "out_for_delivery",
            label: "Out for Delivery",
            description: "Order is out for delivery",
            icon: <FiTruck />
        },
        {
            value: "delivered",
            label: "Delivered",
            description: "Order delivered successfully",
            icon: <FiCheckCircle />
        },
        {
            value: "cancelled",
            label: "Cancelled",
            description: "Order has been cancelled",
            icon: <FiXCircle />
        }
    ];

    const currentIndex = statuses.findIndex(
        (status) => status.value === data?.status
    );

    const selectedIndex = statuses.findIndex(
        (status) => status.value === selectedStatus
    );

    const handleUpdateStatus = async () => {

        if (!selectedStatus || selectedStatus === data?.status) {
            return;
        }

        const result = await dispatch(
            updateOrderStatus({
                orderId: data._id,
                status: selectedStatus
            })
        );

        if (updateOrderStatus.fulfilled.match(result)) {
            onClose();
        }
    };

    const isStepCompleted = (index) => {

        if (selectedStatus === "cancelled") {
            return false;
        }

        return index < selectedIndex;
    };

    return (

        <form
            className="change-order-status-form"
            onSubmit={(e) => {
                e.preventDefault();
                handleUpdateStatus();
            }}
        >

            {/* Header */}

            <div className="change-order-status-header">

                <div>
                    <h2>Change Order Status</h2>

                    <p>
                        Order #{data?._id}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="change-order-status-close"
                >
                    <FiX />
                </button>

            </div>


            {/* Status Steps */}

            <div className="change-order-status-content">

                <div className="change-order-status-title">

                    <div>
                        <h3>Update Order Status</h3>
                        <p>Select the current order status</p>
                    </div>

                </div>


                <div className="order-status-progress">

                    {statuses.map((status, index) => {

                        const isSelected =
                            selectedStatus === status.value;

                        const isCompleted =
                            isStepCompleted(index);

                        const isCancelled =
                            status.value === "cancelled";

                        return (

                            <div
                                key={status.value}
                                className="order-status-step-wrapper"
                            >

                                <button
                                    type="button"
                                    className={`
                                        order-status-step
                                        ${isSelected ? "selected" : ""}
                                        ${isCompleted ? "completed" : ""}
                                        ${isCancelled ? "cancelled-step" : ""}
                                    `}
                                    onClick={() =>
                                        setSelectedStatus(status.value)
                                    }
                                >

                                    <div className="order-status-step-icon">
                                        {isCompleted
                                            ? <FiCheck />
                                            : status.icon}
                                    </div>

                                    <div className="order-status-step-info">

                                        <div className="order-status-step-top">

                                            <strong>
                                                {status.label}
                                            </strong>

                                            {status.value === data?.status && (
                                                <span className="current-status-label">
                                                    Current
                                                </span>
                                            )}

                                        </div>

                                        <p>
                                            {status.description}
                                        </p>

                                    </div>

                                </button>

                                {index < statuses.length - 1 && (
                                    <div
                                        className={`
                                            order-status-line
                                            ${isCompleted ? "completed" : ""}
                                        `}
                                    />
                                )}

                            </div>

                        );

                    })}

                </div>

            </div>


            {/* Footer */}

            <div className="change-order-status-footer">

                <button
                    type="button"
                    className="change-order-status-cancel"
                    onClick={onClose}
                    disabled={updateOrderStatusLoading}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="change-order-status-submit"
                    disabled={
                        updateOrderStatusLoading ||
                        selectedStatus === data?.status
                    }
                >

                    {updateOrderStatusLoading ? (
                        <ButtonLoader />
                    ) : (
                        "Update Order Status"
                    )}

                </button>

            </div>

        </form>

    );
};

export default ChangeOrderStatusForm;