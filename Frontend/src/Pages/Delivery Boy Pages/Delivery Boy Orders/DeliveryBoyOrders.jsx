import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LuClipboardList, LuPackageCheck } from "react-icons/lu";
import DeliveryAssignmentCard from "../../../Components/Ui/Delivery Assignment Card/DeliveryAssignmentCard";
import DeliveryOrderCard from "../../../Components/Ui/Delivery Order Card/DeliveryOrderCard";
import useDeliveryBoy from "../../../hooks/Delivery Boy Hooks/useDeliveryBoyHook";
import {
    getAvailableAssignments,
    getMyDeliveryAssignments
} from "../../../features/delivery Assignment/deliveryAssignmentThunk";
import "./DeliveryBoyOrders.css";

const orderTabs = [
    { id: "broadcasted", label: "Broadcasted" },
    { id: "ongoing", label: "Ongoing" },
    { id: "completed", label: "Completed" }
];

const EMPTY_ASSIGNMENTS = Object.freeze([]);

const emptyStateByTab = {
    broadcasted: {
        title: "No available orders",
        message: "New delivery opportunities will appear here."
    },
    ongoing: {
        title: "No ongoing deliveries",
        message: "Orders you accept will show up here while you deliver them."
    },
    completed: {
        title: "No completed orders yet",
        message: "Delivered and cancelled assignments will appear here."
    }
};

const DeliveryBoyOrders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Start on the list of available assignments.
    const [activeTab, setActiveTab] = useState("broadcasted");

    const {
        assignments,
        assignmentsLoading,
        assignmentsError,
        myAssignments,
        myAssignmentsLoading,
        myAssignmentsError
    } = useSelector((state) => state.deliveryAssignment);

    const { acceptAssignmentLoading, handleAcceptAssignment } = useDeliveryBoy();

    // Load this delivery boy's accepted and historical assignments on page open.
    useEffect(() => {
        dispatch(getMyDeliveryAssignments());
    }, [dispatch]);

    const ownedAssignments = Array.isArray(myAssignments)
        ? myAssignments
        : EMPTY_ASSIGNMENTS;
    const broadcastedAssignments = Array.isArray(assignments)
        ? assignments
        : EMPTY_ASSIGNMENTS;

    // Picked-up assignments stay ongoing until the backend marks them completed.
    const ongoingAssignments = useMemo(
        () => ownedAssignments.filter((assignment) => assignment.status === "assigned"),
        [ownedAssignments]
    );
    const completedAssignments = useMemo(
        () => ownedAssignments.filter((assignment) =>
            ["completed", "cancelled"].includes(assignment.status)
        ),
        [ownedAssignments]
    );

    const isBroadcastedTab = activeTab === "broadcasted";
    const selectedAssignments = {
        broadcasted: broadcastedAssignments,
        ongoing: ongoingAssignments,
        completed: completedAssignments
    }[activeTab];
    const isLoading = isBroadcastedTab ? assignmentsLoading : myAssignmentsLoading;
    const error = isBroadcastedTab ? assignmentsError : myAssignmentsError;

    // Retry the request that provides the selected tab.
    const handleRetry = () => {
        if (isBroadcastedTab) {
            dispatch(getAvailableAssignments());
            return;
        }

        dispatch(getMyDeliveryAssignments());
    };

    // Open details only after the existing accept action succeeds.
    const handleAcceptAndOpenDetails = async (assignmentId) => {
        const accepted = await handleAcceptAssignment(assignmentId);

        if (accepted) {
            navigate("/delivery-boy/order/" + assignmentId);
        }
    };

    // Keep panel states separate from the page header and tabs.
    const renderPanelContent = () => {
        if (isLoading) {
            return (
                <div className="delivery-orders-state" role="status">
                    <span className="delivery-orders-spinner" aria-hidden="true" />
                    <p>
                        Loading {isBroadcastedTab ? "available" : "your"} orders…
                    </p>
                </div>
            );
        }

        if (error) {
            return (
                <div
                    className="delivery-orders-state delivery-orders-state-error"
                    role="alert"
                >
                    <div className="delivery-orders-state-icon">
                        <LuPackageCheck />
                    </div>
                    <h2>Orders couldn’t be loaded</h2>
                    <p>{error}</p>
                    <button
                        type="button"
                        className="delivery-orders-retry"
                        onClick={handleRetry}
                    >
                        Try again
                    </button>
                </div>
            );
        }

        if (selectedAssignments.length === 0) {
            const emptyState = emptyStateByTab[activeTab];

            return (
                <div className="delivery-orders-state">
                    <div className="delivery-orders-state-icon">
                        <LuClipboardList />
                    </div>
                    <h2>{emptyState.title}</h2>
                    <p>{emptyState.message}</p>
                </div>
            );
        }

        return (
            <div
                className={
                    "delivery-orders-list " +
                    (isBroadcastedTab ? "broadcasted" : "")
                }
            >
                {selectedAssignments.map((assignment) => (
                    isBroadcastedTab ? (
                        <DeliveryAssignmentCard
                            key={assignment._id}
                            assignment={assignment}
                            onAccept={handleAcceptAndOpenDetails}
                            acceptLoading={acceptAssignmentLoading}
                        />
                    ) : (
                        <DeliveryOrderCard
                            key={assignment._id}
                            assignment={assignment}
                        />
                    )
                ))}
            </div>
        );
    };

    return (
        <section className="delivery-orders-page">
            <header className="delivery-orders-heading">
                <p className="delivery-orders-eyebrow">DELIVERY PARTNER</p>
                <h1>My Orders</h1>
                <p className="delivery-orders-intro">
                    Track your delivery assignments in one place.
                </p>
            </header>

            <div
                className="delivery-orders-tabs"
                role="tablist"
                aria-label="Order status"
            >
                {orderTabs.map(({ id, label }) => (
                    <button
                        key={id}
                        type="button"
                        role="tab"
                        id={"delivery-orders-tab-" + id}
                        aria-selected={activeTab === id}
                        aria-controls="delivery-orders-panel"
                        className={
                            "delivery-orders-tab " +
                            (activeTab === id ? "active" : "")
                        }
                        onClick={() => setActiveTab(id)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div
                className="delivery-orders-panel"
                id="delivery-orders-panel"
                role="tabpanel"
                aria-labelledby={"delivery-orders-tab-" + activeTab}
                aria-busy={isLoading}
            >
                {renderPanelContent()}
            </div>
        </section>
    );
};

export default DeliveryBoyOrders;
