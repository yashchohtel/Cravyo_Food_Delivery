import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuChevronRight,
  LuClock3,
  LuMapPin,
  LuPackage,
  LuStore
} from "react-icons/lu";
import "./DeliveryOrderCard.css";

const statusDetails = (assignment) => {
  if (assignment.status === "assigned") {
    return assignment.orderPicked
      ? { label: "Out for Delivery", className: "out-for-delivery" }
      : { label: "Assigned", className: "assigned" };
  }

  if (assignment.status === "completed") {
    return { label: "Delivered", className: "delivered" };
  }

  if (assignment.status === "cancelled") {
    return { label: "Cancelled", className: "cancelled" };
  }

  return { label: "Status unavailable", className: "unknown" };
};

const formatAmount = (value) => {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return "Amount unavailable";
  return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
};

const formatEta = (deliveryTime) => {
  if (deliveryTime === null || deliveryTime === undefined || deliveryTime === "") {
    return "Time unavailable";
  }
  return typeof deliveryTime === "number" ? `${deliveryTime} min` : String(deliveryTime);
};

const DeliveryOrderCard = ({ assignment }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const order = assignment?.order && typeof assignment.order === "object"
    ? assignment.order
    : {};
  const shop = assignment?.shop && typeof assignment.shop === "object"
    ? assignment.shop
    : {};
  const items = Array.isArray(order.items) ? order.items : [];
  const itemCount = items.reduce((count, item) => {
    const quantity = Number(item?.quantity);
    return count + (Number.isFinite(quantity) && quantity > 0 ? quantity : 1);
  }, 0);
  const address = order.deliveryAddress || {};
  const destination = [address.area, address.city].filter(Boolean).join(", ") || "Location unavailable";
  const orderId = order._id ||
    (typeof assignment?.order === "string" ? assignment.order : assignment?._id) || "";
  const orderNumber = String(orderId).slice(-6).toUpperCase();
  const status = statusDetails(assignment || {});
  const hasShopImage = shop.image && !imageFailed;

  return (
    <article className="delivery-order-card">
      <Link
        className="delivery-order-card-link"
        to={`/delivery-boy/order/${assignment?._id}`}
        aria-label={`Order ${orderNumber || "details"} from ${shop.name || "Shop"}, ${status.label}. Open delivery details.`}
      >
        <div className="delivery-order-card-topline">
          <span className="delivery-order-number">Order #{orderNumber || "—"}</span>
          <span className={`delivery-order-status ${status.className}`}>
            {status.label}
          </span>
        </div>

        <div className="delivery-order-card-main">
          <div className="delivery-order-shop-image" aria-hidden="true">
            {hasShopImage ? (
              <img src={shop.image} alt="" onError={() => setImageFailed(true)} />
            ) : (
              <LuStore />
            )}
          </div>

          <div className="delivery-order-shop-info">
            <h2>{shop.name || "Shop unavailable"}</h2>
            <p>{itemCount} {itemCount === 1 ? "item" : "items"}</p>
          </div>
          <LuChevronRight className="delivery-order-chevron" aria-hidden="true" />
        </div>

        <div className="delivery-order-facts">
          <div className="delivery-order-fact">
            <span>Order total</span>
            <strong>{formatAmount(order.pricing?.totalAmount)}</strong>
          </div>
          <div className="delivery-order-fact">
            <span>Estimated time</span>
            <strong><LuClock3 aria-hidden="true" />{formatEta(shop.deliveryTime)}</strong>
          </div>
        </div>

        <div className="delivery-order-destination">
          <LuMapPin aria-hidden="true" />
          <span>{destination}</span>
        </div>

        <span className="delivery-order-open-hint">
          <LuPackage aria-hidden="true" /> View delivery details
        </span>
      </Link>
    </article>
  );
};

export default DeliveryOrderCard;
