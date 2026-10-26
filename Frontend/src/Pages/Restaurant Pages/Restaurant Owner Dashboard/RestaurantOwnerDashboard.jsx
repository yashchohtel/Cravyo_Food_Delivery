import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LuArrowRight, LuCircleDollarSign, LuClock3, LuPackage, LuShoppingBag, LuStore, LuUtensilsCrossed } from "react-icons/lu";
import "./RestaurantOwnerDashboard.css";

const formatCurrency = (amount) => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
}).format(amount || 0);

const RestaurantOwnerDashboard = () => {
  const { restaurant, getRestaurantLoading } = useSelector((state) => state.restaurant);
  const { restaurantOrders, restaurantOrdersLoading } = useSelector((state) => state.order);
  const [imageFailed, setImageFailed] = useState(false);

  if (getRestaurantLoading || restaurantOrdersLoading) {
    return <div className="restaurant-dashboard-loading">Loading your restaurant dashboard...</div>;
  }

  if (!restaurant) {
    return (
      <div className="restaurant-dashboard-empty">
        <LuStore aria-hidden="true" />
        <h1>Restaurant not found</h1>
        <p>Your restaurant information is not available yet.</p>
      </div>
    );
  }

  const foodItems = restaurant.foodItems || [];
  const orders = restaurantOrders || [];
  const activeOrders = orders.filter((order) => ["pending", "confirmed", "preparing"].includes(order.status)).length;
  const deliveredOrders = orders.filter((order) => order.status === "delivered");
  const completedOrderValue = deliveredOrders.reduce((total, order) => total + (order.pricing?.totalAmount || 0), 0);
  const recentOrders = [...orders]
    .sort((firstOrder, secondOrder) => new Date(secondOrder.createdAt) - new Date(firstOrder.createdAt))
    .slice(0, 4);

  return (
    <div className="restaurant-owner-dashboard">
      <section className="restaurant-dashboard-hero">
        <div className="restaurant-dashboard-image">
          {restaurant.image && !imageFailed ? (
            <img src={restaurant.image} alt={restaurant.name} onError={() => setImageFailed(true)} />
          ) : <LuStore aria-hidden="true" />}
        </div>

        <div className="restaurant-dashboard-hero-copy">
          <span className={`restaurant-dashboard-status ${restaurant.isOpen ? "is-open" : "is-closed"}`}>
            <i aria-hidden="true" /> {restaurant.isOpen ? "Open now" : "Closed"}
          </span>
          <h1>{restaurant.name}</h1>
          <p>{restaurant.description || "Manage your restaurant, menu and customer orders."}</p>
          <div className="restaurant-dashboard-meta">
            <span><LuClock3 aria-hidden="true" /> {restaurant.openingTime} - {restaurant.closingTime}</span>
            <span>{restaurant.address?.city || "Restaurant location"}</span>
          </div>
        </div>

        <Link className="restaurant-dashboard-hero-link" to="/restaurant/admin-panel/my-restaurant">
          Manage restaurant <LuArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="restaurant-dashboard-stats" aria-label="Restaurant summary">
        <article className="restaurant-dashboard-stat-card"><span><LuShoppingBag aria-hidden="true" /></span><div><small>Total orders</small><strong>{orders.length}</strong></div></article>
        <article className="restaurant-dashboard-stat-card"><span><LuClock3 aria-hidden="true" /></span><div><small>Active orders</small><strong>{activeOrders}</strong></div></article>
        <article className="restaurant-dashboard-stat-card"><span><LuUtensilsCrossed aria-hidden="true" /></span><div><small>Food items</small><strong>{foodItems.length}</strong></div></article>
        <article className="restaurant-dashboard-stat-card revenue"><span><LuCircleDollarSign aria-hidden="true" /></span><div><small>Delivered order value</small><strong>{formatCurrency(completedOrderValue)}</strong></div></article>
      </section>

      <section className="restaurant-dashboard-grid">
        <article className="restaurant-dashboard-panel">
          <div className="restaurant-dashboard-panel-heading">
            <div><h2>Recent orders</h2><p>Latest customer orders for your restaurant.</p></div>
            <Link to="/restaurant/admin-panel/orders">View all <LuArrowRight aria-hidden="true" /></Link>
          </div>

          {recentOrders.length ? (
            <div className="restaurant-dashboard-orders">
              {recentOrders.map((order) => (
                <div className="restaurant-dashboard-order" key={order._id}>
                  <span className="restaurant-dashboard-order-icon"><LuPackage aria-hidden="true" /></span>
                  <div><strong>Order #{order._id.slice(-6).toUpperCase()}</strong><span>{order.user?.fullName || "Customer"} · {order.items?.length || 0} items</span></div>
                  <span className={`restaurant-dashboard-order-status ${order.status}`}>{order.status?.replaceAll("_", " ")}</span>
                  <strong className="restaurant-dashboard-order-total">{formatCurrency(order.pricing?.totalAmount)}</strong>
                </div>
              ))}
            </div>
          ) : (
            <div className="restaurant-dashboard-no-orders"><LuShoppingBag aria-hidden="true" /><p>New customer orders will appear here.</p></div>
          )}
        </article>

        <article className="restaurant-dashboard-panel restaurant-dashboard-menu-panel">
          <div className="restaurant-dashboard-panel-heading"><div><h2>Menu overview</h2><p>Keep your menu ready for customers.</p></div></div>
          <div className="restaurant-dashboard-menu-summary"><strong>{foodItems.filter((item) => item.isAvailable).length}</strong><span>items currently available</span></div>
          <Link className="restaurant-dashboard-menu-link" to="/restaurant/admin-panel/food-items">Manage food items <LuArrowRight aria-hidden="true" /></Link>
        </article>
      </section>
    </div>
  );
};

export default RestaurantOwnerDashboard;
