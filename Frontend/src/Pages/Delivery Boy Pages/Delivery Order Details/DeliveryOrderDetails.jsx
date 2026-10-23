import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  LuArrowLeft,
  LuBike,
  LuCheck,
  LuChevronRight,
  LuCircleCheck,
  LuClock3,
  LuFileText,
  LuMapPin,
  LuNavigation,
  LuPackage,
  LuPhone,
  LuStore,
  LuUserRound,
  LuWallet
} from "react-icons/lu";
import useDeliveryBoy from "../../../hooks/Delivery Boy Hooks/useDeliveryBoyHook.jsx";
import "./DeliveryOrderDetails.css";

// Format order amounts as Indian rupees.
const formatMoney = (value) => {
  const amount = Number(value);
  return "₹" + (Number.isFinite(amount) ? amount.toLocaleString("en-IN", {
    maximumFractionDigits: 0
  }) : "0");
};

// Join only the address fields that are available.
const joinAddressParts = (...parts) => parts.filter(Boolean).join(", ");

// Turn a phone number into a tap-to-call link.
const getPhoneHref = (phone) => {
  if (!phone) return "";
  return "tel:" + String(phone).replace(/[^\d+]/g, "");
};

const DeliveryOrderDetails = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();

  const {
    selectedAssignment,
    assignmentDetailsLoading,
    assignmentErrorMessage,
    acceptAssignmentLoading,
    markOrderPickedUpLoading,
    markOrderDeliveredLoading,
    cancelDeliveryOrderLoading,
    handleGetDeliveryAssignment,
    handleAcceptAssignment,
    handleMarkOrderPickedUp,
    handleMarkOrderDelivered,
    handleCancelDeliveryOrder
  } = useDeliveryBoy();

  // Load details for the assignment in the current route.
  useEffect(() => {
    if (assignmentId) {
      handleGetDeliveryAssignment(assignmentId);
    }
    // The request should run only when the route assignment changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignmentId]);

  if (assignmentDetailsLoading && !selectedAssignment) {
    return (
      <section className="delivery-details-state">
        <span className="delivery-details-spinner" aria-hidden="true"></span>
        <p>Loading order details…</p>
      </section>
    );
  }

  if (!selectedAssignment) {
    return (
      <section className="delivery-details-state delivery-details-error-state">
        <div className="delivery-details-state-icon"><LuPackage /></div>
        <h1>Order details unavailable</h1>
        <p>{assignmentErrorMessage || "This delivery assignment could not be found."}</p>
        <button type="button" className="delivery-secondary-button" onClick={() => navigate("/delivery-boy")}>
          <LuArrowLeft /> Back to dashboard
        </button>
      </section>
    );
  }

  // Derive the active delivery stage from backend assignment/order data.
  const assignment = selectedAssignment;
  const order = assignment.order || {};
  const shop = assignment.shop || {};
  const customer = order.user || {};
  const address = order.deliveryAddress || {};
  const items = Array.isArray(order.items) ? order.items : [];
  const assignmentStatus = assignment.status || "broadcasted";
  const isAccepted = Boolean(assignment.assignedTo) ||
    ["assigned", "completed", "cancelled"].includes(assignmentStatus);
  const isPickedUp = Boolean(assignment.orderPicked);
  const isDelivered = assignmentStatus === "completed" || order.status === "delivered";
  const isCancelled = assignmentStatus === "cancelled" || order.status === "cancelled";
  const isOutForDelivery = isPickedUp && !isDelivered && !isCancelled;
  const activeStep = isDelivered ? 3 : isPickedUp ? 2 : isAccepted ? 1 : 0;
  const shopPhone = shop.mobileNumber;
  const customerPhone = customer.mobileNumber;
  const orderShortId = String(order._id || assignment._id || "").slice(-6).toUpperCase();
  const shopAddress = joinAddressParts(
    shop.address?.street,
    shop.address?.city,
    shop.address?.state
  );
  const customerAddress = joinAddressParts(
    address.houseNumber,
    address.area,
    address.city,
    address.pincode
  );
  const estimate = shop.deliveryTime || "30–40 min";
  const displayDistance = isAccepted ? assignment.distance : assignment.distanceToShop;
  const originName = isAccepted ? (shop.name || "Restaurant") : "Your location";
  const destinationName = isAccepted ? (address.area || "Customer") : (shop.name || "Restaurant");

  // Confirm before cancelling the active delivery.
  const handleCancel = () => {
    const confirmed = window.confirm("Cancel this delivery order?");
    if (confirmed) {
      handleCancelDeliveryOrder(assignment._id);
    }
  };

  // Keep the timeline stages and icons in display order.
  const progressSteps = [
    { label: "Accept", detail: "Order", Icon: LuStore },
    { label: "Pickup", detail: "at restaurant", Icon: LuBike },
    { label: "Deliver", detail: "to customer", Icon: LuUserRound },
    { label: "Completed", detail: "", Icon: LuCheck }
  ];

  return (
    <section className="delivery-order-details">
      <header className="delivery-details-topbar">
        <button
          type="button"
          className="delivery-back-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <LuArrowLeft />
        </button>
        <h1>Order #{orderShortId || "—"}</h1>
        <span className={"delivery-status-chip " + (
          isDelivered ? "is-delivered" :
            isCancelled ? "is-cancelled" :
              isOutForDelivery ? "is-out-for-delivery" :
                isAccepted ? "is-accepted" : "is-pending"
        )}>
          {isDelivered ? "Delivered" :
            isCancelled ? "Cancelled" :
              isOutForDelivery ? "On the way" :
                isAccepted ? "Accepted" : "New order"}
        </span>
      </header>

      <div className="delivery-progress" aria-label="Delivery progress">
        {progressSteps.map(({ label, detail, Icon }, index) => {
          const isComplete = isDelivered || index < activeStep;
          const isActive = !isDelivered && !isCancelled && index === activeStep;
          const stepClass = [
            "delivery-progress-step",
            isComplete ? "is-complete" : "",
            isActive ? "is-active" : "",
            isCancelled && index === activeStep ? "is-cancelled" : ""
          ].filter(Boolean).join(" ");

          return (
            <div className={stepClass} key={label}>
              {index > 0 && (
                <span
                  className={"delivery-progress-line " + (isComplete || index <= activeStep ? "is-complete" : "")}
                  aria-hidden="true"
                ></span>
              )}
              <span className="delivery-progress-icon"><Icon /></span>
              <strong>{label}</strong>
              {detail && <span className="delivery-progress-detail">{detail}</span>}
              {isComplete && <small>Completed</small>}
            </div>
          );
        })}
      </div>

      {isDelivered ? (
        <div className="delivery-state-banner is-success">
          <LuCircleCheck />
          <div>
            <strong>Order delivered</strong>
            <span>{assignment.updatedAt ? new Date(assignment.updatedAt).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short"
            }) : "This delivery is complete."}</span>
          </div>
        </div>
      ) : isCancelled ? (
        <div className="delivery-state-banner is-cancelled">
          <LuPackage />
          <div>
            <strong>Delivery cancelled</strong>
            <span>This assignment is no longer active.</span>
          </div>
        </div>
      ) : null}

      {assignmentErrorMessage && (
        <div className="delivery-inline-message is-error" role="alert">
          {assignmentErrorMessage}
        </div>
      )}


      <article className="delivery-detail-card delivery-shop-card">
        <div className="delivery-shop-image">
          {shop.image ? (
            <img src={shop.image} alt={shop.name || "Restaurant"} />
          ) : (
            <LuStore aria-hidden="true" />
          )}
        </div>
        <div className="delivery-shop-copy">
          <h2>{shop.name || "Restaurant"}</h2>
          <p>{shopAddress || "Restaurant address unavailable"}</p>
        </div>
        {shopPhone && (
          <a className="delivery-icon-action" href={getPhoneHref(shopPhone)} aria-label={"Call " + (shop.name || "restaurant")}>
            <LuPhone />
          </a>
        )}
      </article>

      <section
        className={"delivery-route-map " + (!isAccepted ? "before-accept" : "")}
        aria-label={"Route from " + originName + " to " + destinationName}
      >
        <svg className="delivery-route-art" viewBox="0 0 520 210" preserveAspectRatio="none" aria-hidden="true">
          <path className="delivery-map-road" d="M-20 35 C80 70 112 10 190 52 S304 111 354 60 S460 22 548 70" />
          <path className="delivery-map-road" d="M-20 155 C72 118 104 192 194 154 S315 76 369 141 S475 191 544 144" />
          <path className="delivery-map-road" d="M55 -20 C91 35 48 89 104 132 S174 197 153 230" />
          <path className="delivery-map-road" d="M310 -20 C278 31 348 66 302 102 S266 173 328 230" />
          <path className="delivery-map-route" d="M72 142 C150 145 152 111 214 120 S286 157 333 101 S406 54 448 60" />
        </svg>
        <div className="delivery-map-marker start">
          {isAccepted ? <LuStore /> : <LuNavigation />}
          <span>{originName}</span>
        </div>
        <div className="delivery-map-marker end">
          {isAccepted ? <LuMapPin /> : <LuStore />}
          <span>{destinationName}</span>
        </div>
        <div className="delivery-map-caption">
          <LuNavigation />
          <span>{isAccepted ? "Restaurant to delivery address" : "Your location to restaurant"}</span>
        </div>
      </section>

      <div className="delivery-route-metrics">
        <div className="delivery-metric">
          <LuClock3 />
          <div>
            <strong>{displayDistance == null ? "—" : Number(displayDistance).toFixed(1) + " km"}</strong>
            <span>{isAccepted ? "Delivery distance" : "To restaurant"}</span>
          </div>
        </div>
        <div className="delivery-metric-divider" aria-hidden="true"></div>
        <div className="delivery-metric">
          <LuClock3 />
          <div>
            <strong>{estimate}</strong>
            <span>Est. time</span>
          </div>
        </div>
      </div>

      <section className="delivery-detail-card delivery-items-card">
        <header className="delivery-card-heading">
          <h2>Order Items ({items.length})</h2>
          <LuChevronRight aria-hidden="true" />
        </header>
        <ul className="delivery-items-list">
          {items.map((item, index) => (
            <li className="delivery-order-item" key={item._id || item.foodId || item.name + index}>
              <div className="delivery-item-image">
                {item.image ? <img src={item.image} alt="" /> : <LuPackage />}
              </div>
              <div className="delivery-item-copy">
                <strong>{item.name || "Food item"}</strong>
                <span>{formatMoney(item.price)} each</span>
              </div>
              <span className="delivery-item-quantity">× {item.quantity || 1}</span>
              <strong className="delivery-item-total">
                {formatMoney(Number(item.price || 0) * Number(item.quantity || 1))}
              </strong>
            </li>
          ))}
          {items.length === 0 && (
            <li className="delivery-empty-items">No item details available.</li>
          )}
        </ul>
      </section>

      <section className="delivery-detail-card delivery-payment-card">
        <div className="delivery-payment-main">
          <span className="delivery-payment-icon"><LuWallet /></span>
          <div className="delivery-payment-label">
            <strong>Payment Method</strong>
            <span>{order.paymentMethod === "ONLINE" ? "Paid online" : "Cash on Delivery (COD)"}</span>
          </div>
          <strong className="delivery-payment-total">{formatMoney(order.pricing?.totalAmount)}</strong>
        </div>
        <div className="delivery-payment-breakdown">
          <span>Item total <strong>{formatMoney(order.pricing?.itemTotal)}</strong></span>
          <i aria-hidden="true"></i>
          <span>Delivery fee <strong>{formatMoney(order.pricing?.deliveryFee)}</strong></span>
          <i aria-hidden="true"></i>
          <span>Taxes <strong>{formatMoney(order.pricing?.taxes)}</strong></span>
        </div>
      </section>

      {isAccepted && !isCancelled && (
        <section className="delivery-earning-card">
          <span className="delivery-earning-icon"><LuWallet /></span>
          <div>
            <strong>Your Earning</strong>
            <span>Delivery fee + bonus</span>
          </div>
          <strong className="delivery-earning-total">{formatMoney(assignment.deliveryEarning)}</strong>
        </section>
      )}

      <section className="delivery-customer-section">
        <h2 className="delivery-section-title">Customer Details</h2>
        <article className="delivery-detail-card delivery-customer-card">
          <div className="delivery-customer-avatar"><LuUserRound /></div>
          <div className="delivery-customer-copy">
            <strong>{customer.fullName || "Customer"}</strong>
            <span>{customerAddress || "Delivery address unavailable"}</span>
          </div>
          {customerPhone && (
            <a className="delivery-icon-action" href={getPhoneHref(customerPhone)} aria-label={"Call " + (customer.fullName || "customer")}>
              <LuPhone />
            </a>
          )}
        </article>
      </section>

      <section className="delivery-detail-card delivery-instructions-card">
        <span className="delivery-instructions-icon"><LuFileText /></span>
        <div>
          <strong>Customer Instructions</strong>
          <p>{order.deliveryInstructions || order.instructions || "No delivery instructions provided."}</p>
        </div>
      </section>

      {!isDelivered && !isCancelled && (
        <footer className="delivery-action-bar">
          {!isAccepted ? (
            <button
              type="button"
              className="delivery-primary-button"
              onClick={() => handleAcceptAssignment(assignment._id)}
              disabled={acceptAssignmentLoading}
            >
              {acceptAssignmentLoading ? "Accepting order…" : "Accept Order"}
            </button>
          ) : !isPickedUp ? (
            <button
              type="button"
              className="delivery-primary-button"
              onClick={() => handleMarkOrderPickedUp(assignment._id)}
              disabled={markOrderPickedUpLoading}
            >
              {markOrderPickedUpLoading ? "Updating order…" : "Mark as Picked Up"}
            </button>
          ) : (
            <>
              {customerPhone && (
                <a className="delivery-secondary-button" href={getPhoneHref(customerPhone)}>
                  <LuPhone /> Call Customer
                </a>
              )}
              <button
                type="button"
                className="delivery-primary-button"
                onClick={() => handleMarkOrderDelivered(assignment._id)}
                disabled={markOrderDeliveredLoading}
              >
                {markOrderDeliveredLoading ? "Updating order…" : "Mark as Delivered"}
              </button>
              <button
                type="button"
                className="delivery-cancel-button"
                onClick={handleCancel}
                disabled={cancelDeliveryOrderLoading}
              >
                {cancelDeliveryOrderLoading ? "Cancelling…" : "Cancel Order"}
              </button>
            </>
          )}
        </footer>
      )}
    </section>
  );
};

export default DeliveryOrderDetails;
