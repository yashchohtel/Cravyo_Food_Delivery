import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  LuArrowLeft,
  LuCheck,
  LuChevronDown,
  LuChevronUp,
  LuClock3,
  LuMapPin,
  LuNavigation,
  LuPackage,
  LuPhone,
  LuStore,
  LuWallet,
} from "react-icons/lu";
import "./DeliveryOrderDetails.css";
import useDeliveryBoy from "../../../hooks/Delivery Boy Hooks/useDeliveryBoyHook";

const DeliveryOrderDetails = () => {
  const navigate = useNavigate();
  const { assignmentId } = useParams();
  const [itemsExpanded, setItemsExpanded] = useState(false);

  const {
    selectedAssignment,
    assignmentDetailsLoading,
    acceptAssignmentLoading,
    assignmentErrorMessage,
    handleGetDeliveryAssignment,
    handleAcceptAssignment,
  } = useDeliveryBoy();

  useEffect(() => {
    if (assignmentId) {
      handleGetDeliveryAssignment(assignmentId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignmentId]);

  const assignment =
    selectedAssignment?._id === assignmentId
      ? selectedAssignment
      : null;

  const order = assignment?.order;
  const shop = assignment?.shop;
  const customer = order?.user;
  const address = order?.deliveryAddress;

  const isAccepted =
    assignment?.status === "assigned" ||
    Boolean(assignment?.assignedTo);

  const formatAddress = (value) => {
    if (!value) return "";

    if (typeof value === "string") return value;

    return [
      value.houseNumber,
      value.area,
      value.street,
      value.city,
      value.state,
      value.pincode,
    ]
      .filter(Boolean)
      .join(", ");
  };

  const orderId = order?._id
    ? order._id.slice(-8).toUpperCase()
    : "N/A";

  const shopAddress = formatAddress(shop?.address);
  const customerAddress = formatAddress(address);
  const items = order?.items || [];

  const handleAccept = async () => {
    if (!assignment?._id || acceptAssignmentLoading || isAccepted) {
      return;
    }

    await handleAcceptAssignment(assignment._id);
  };

  if (assignmentDetailsLoading && !assignment) {
    return (
      <div className="delivery-details-state">
        <div className="delivery-details-spinner" />
        <p>Loading assignment...</p>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="delivery-details-state">
        <LuPackage />
        <h2>Assignment not found</h2>
        <p>
          {assignmentErrorMessage ||
            "Unable to load this assignment."}
        </p>
        <button
          type="button"
          onClick={() => navigate("/delivery-boy")}
        >
          <LuArrowLeft /> Back to dashboard
        </button>
      </div>
    );
  }

  return (
    <section className="delivery-order-details">
      {/* Header */}
      <header className="delivery-details-header">
        <button
          type="button"
          className="delivery-details-back"
          onClick={() => navigate("/delivery-boy")}
          aria-label="Back to dashboard"
        >
          <LuArrowLeft />
        </button>

        <h1>Order #{orderId}</h1>

        <span
          className={`delivery-details-status ${isAccepted ? "is-accepted" : "is-pending"
            }`}
        >
          {isAccepted ? "Accepted" : "View only"}
        </span>
      </header>

      {/* Progress */}
      <section className="delivery-progress-card">
        <div className="delivery-progress-steps">
          <div className="delivery-progress-step active">
            <span className="delivery-step-icon">
              {isAccepted ? <LuCheck /> : <LuStore />}
            </span>
            <strong>Pickup</strong>
            <p>{isAccepted ? "Accepted" : "At restaurant"}</p>
          </div>

          <div
            className={`delivery-progress-line ${isAccepted ? "active" : ""
              }`}
          />

          <div
            className={`delivery-progress-step ${isAccepted ? "active" : ""
              }`}
          >
            <span className="delivery-step-icon">
              <LuMapPin />
            </span>
            <strong>Deliver</strong>
            <p>To customer</p>
          </div>

          <div className="delivery-progress-line" />

          <div className="delivery-progress-step">
            <span className="delivery-step-icon">
              <LuCheck />
            </span>
            <strong>Completed</strong>
            <p>Final step</p>
          </div>
        </div>
      </section>

      {/* Restaurant */}
      <section className="delivery-details-card delivery-place-card">
        {shop?.image ? (
          <img
            src={shop.image}
            alt={shop.name || "Restaurant"}
            className="delivery-restaurant-image"
          />
        ) : (
          <div className="delivery-place-placeholder">
            <LuStore />
          </div>
        )}

        <div className="delivery-place-content">
          <h2>{shop?.name || "Restaurant"}</h2>
          <p>{shopAddress || "Restaurant address unavailable"}</p>
        </div>

        {shop?.owner?.mobileNumber && (
          <a
            href={`tel:${shop.owner.mobileNumber}`}
            className="delivery-call-button"
            aria-label="Call restaurant"
          >
            <LuPhone />
          </a>
        )}
      </section>

      {/* Map placeholder */}
      <section className="delivery-map-placeholder">
        <div className="delivery-map-route">
          <span className="delivery-map-pin pickup">
            <LuStore />
          </span>
          <span className="delivery-map-path" />
          <span className="delivery-map-pin dropoff">
            <LuMapPin />
          </span>
        </div>
        <p>Restaurant → Customer</p>
        <span>Route map will be available here</span>
      </section>

      {/* Distance and ETA */}
      <div className="delivery-route-summary">
        <div className="delivery-route-stat">
          <LuNavigation />
          <div>
            <strong>
              {assignment.distance != null
                ? `${Number(assignment.distance).toFixed(1)} km`
                : "—"}
            </strong>
            <span>Distance</span>
          </div>
        </div>

        <div className="delivery-route-divider" />

        <div className="delivery-route-stat">
          <LuClock3 />
          <div>
            <strong>
              {shop?.deliveryTime || "—"}
            </strong>
            <span>Estimated time</span>
          </div>
        </div>
      </div>

      {/* Collapsible order items */}
      <section className="delivery-details-card delivery-items-card">
        <button
          type="button"
          className="delivery-items-toggle"
          onClick={() => setItemsExpanded((value) => !value)}
          aria-expanded={itemsExpanded}
        >
          <span>
            Order Items ({items.length})
          </span>
          {itemsExpanded ? <LuChevronUp /> : <LuChevronDown />}
        </button>

        {itemsExpanded && (
          <div className="delivery-order-items">
            {items.length ? (
              items.map((item, index) => (
                <div
                  className="delivery-order-item"
                  key={item._id || item.foodId || index}
                >
                  {item.image ? (
                    <img src={item.image} alt={item.name || "Food"} />
                  ) : (
                    <div className="delivery-item-placeholder">
                      <LuPackage />
                    </div>
                  )}

                  <div className="delivery-item-info">
                    <strong>{item.name || "Food item"}</strong>
                    <span>× {item.quantity || 1}</span>
                  </div>

                  <strong>
                    ₹{Number(item.price || 0) *
                      Number(item.quantity || 1)}
                  </strong>
                </div>
              ))
            ) : (
              <p className="delivery-muted-text">
                No item details available.
              </p>
            )}
          </div>
        )}

        <div className="delivery-earning-row">
          <span>
            <LuWallet /> Your earning
          </span>
          <strong>₹{assignment.deliveryEarning ?? 0}</strong>
        </div>

        <div className="delivery-payment-row">
          Payment method: <strong>{order?.paymentMethod || "—"}</strong>
        </div>
      </section>

      {/* Customer */}
      <section className="delivery-details-card">
        <h2 className="delivery-card-title">Delivery Address</h2>

        <div className="delivery-customer-info">
          <span className="delivery-customer-avatar">
            <LuMapPin />
          </span>

          <div className="delivery-customer-content">
            <h3>{customer?.fullName || "Customer"}</h3>
            <p>{customerAddress || "Address unavailable"}</p>
          </div>

          {customer?.mobileNumber && (
            <a
              href={`tel:${customer.mobileNumber}`}
              className="delivery-call-button"
              aria-label="Call customer"
            >
              <LuPhone />
            </a>
          )}
        </div>

        {address?.instructions && (
          <div className="delivery-instructions">
            <strong>Customer instructions</strong>
            <p>{address.instructions}</p>
          </div>
        )}
      </section>

      {assignmentErrorMessage && (
        <p className="delivery-details-error">
          {assignmentErrorMessage}
        </p>
      )}

      {/* Bottom action */}
      <div className="delivery-details-actions">
        {isAccepted ? (
          <div className="delivery-accepted-message">
            <LuCheck />
            <div>
              <strong>Assignment accepted</strong>
              <p>Assignment is now linked to you.</p>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="delivery-accept-button"
            onClick={handleAccept}
            disabled={acceptAssignmentLoading}
          >
            {acceptAssignmentLoading
              ? "Accepting..."
              : "Accept Order"}
          </button>
        )}
      </div>
    </section>
  );
};

export default DeliveryOrderDetails;