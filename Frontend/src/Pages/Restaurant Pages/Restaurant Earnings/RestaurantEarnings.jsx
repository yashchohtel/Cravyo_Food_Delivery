import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  LuCalendarDays,
  LuChartNoAxesColumnIncreasing,
  LuPackageCheck,
  LuTrendingUp,
  LuWalletCards
} from "react-icons/lu";
import "./RestaurantEarnings.css";

const EMPTY_ORDERS = Object.freeze([]);

const formatMonthKey = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${date.getFullYear()}-${month}`;
};

const getDateKey = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

const getOrderDate = (order) => {
  const date = new Date(order.createdAt);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getOrderAmount = (order) => {
  const amount = Number(order.pricing?.totalAmount);
  return Number.isFinite(amount) ? amount : 0;
};

const sumOrderAmount = (orders) => orders.reduce(
  (total, order) => total + getOrderAmount(order),
  0
);

const formatCurrency = (amount) => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
}).format(amount);

const formatMonthLabel = (monthKey) => {
  const [year, month] = monthKey.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric"
  });
};

const buildChartData = (orders, monthKey) => {
  const [year, month] = monthKey.split("-").map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstChartDay = Math.max(1, daysInMonth - 6);

  const bars = Array.from({ length: 7 }, (_, index) => {
    const day = firstChartDay + index;
    const date = new Date(year, month - 1, day);
    const dateKey = getDateKey(date);

    return {
      label: date.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      value: sumOrderAmount(orders.filter((order) => getDateKey(order.date) === dateKey))
    };
  });

  const maximum = Math.max(...bars.map((bar) => bar.value), 0);
  const highestIndex = bars.findIndex((bar) => bar.value === maximum && maximum > 0);

  return bars.map((bar, index) => ({
    ...bar,
    height: maximum ? (bar.value / maximum) * 100 : 0,
    highlighted: index === highestIndex
  }));
};

const RestaurantEarnings = () => {
  const { restaurantOrders, restaurantOrdersLoading } = useSelector((state) => state.order);
  const [selectedMonth, setSelectedMonth] = useState(formatMonthKey(new Date()));
  const orders = Array.isArray(restaurantOrders) ? restaurantOrders : EMPTY_ORDERS;

  const deliveredOrders = useMemo(() => orders
    .filter((order) => order.status === "delivered")
    .map((order) => ({ ...order, date: getOrderDate(order) }))
    .filter((order) => order.date)
    .sort((firstOrder, secondOrder) => secondOrder.date - firstOrder.date), [orders]);

  const monthOptions = useMemo(() => {
    const monthKeys = new Set([formatMonthKey(new Date())]);
    deliveredOrders.forEach((order) => monthKeys.add(formatMonthKey(order.date)));

    return [...monthKeys]
      .sort((first, second) => second.localeCompare(first))
      .map((value) => ({ value, label: formatMonthLabel(value) }));
  }, [deliveredOrders]);

  const todayKey = getDateKey(new Date());
  const monthOrders = deliveredOrders.filter(
    (order) => formatMonthKey(order.date) === selectedMonth
  );
  const todayOrders = deliveredOrders.filter(
    (order) => getDateKey(order.date) === todayKey
  );
  const todayEarnings = sumOrderAmount(todayOrders);
  const monthEarnings = sumOrderAmount(monthOrders);
  const averageOrderValue = monthOrders.length ? monthEarnings / monthOrders.length : 0;
  const chartData = buildChartData(monthOrders, selectedMonth);
  const recentOrders = monthOrders.slice(0, 5);
  const selectedMonthLabel = formatMonthLabel(selectedMonth);

  if (restaurantOrdersLoading && orders.length === 0) {
    return (
      <section className="restaurant-earnings-page" aria-busy="true">
        <div className="restaurant-earnings-loading">
          <span aria-hidden="true" />
          Loading your earnings...
        </div>
      </section>
    );
  }

  return (
    <section className="restaurant-earnings-page">
      <header className="restaurant-earnings-heading">
        <div>
          <span>RESTAURANT PERFORMANCE</span>
          <h1>Earnings overview</h1>
          <p>Track the value of orders successfully delivered from your restaurant.</p>
        </div>

        <label className="restaurant-earnings-month-select">
          <LuCalendarDays aria-hidden="true" />
          <select
            aria-label="Select earnings month"
            value={selectedMonth}
            onChange={(event) => setSelectedMonth(event.target.value)}
          >
            {monthOptions.map((month) => (
              <option key={month.value} value={month.value}>{month.label}</option>
            ))}
          </select>
        </label>
      </header>

      <div className="restaurant-earnings-stats">
        <article className="restaurant-earnings-featured-stat">
          <span className="restaurant-earnings-stat-icon"><LuWalletCards aria-hidden="true" /></span>
          <div>
            <p>Today's earnings</p>
            <strong>{formatCurrency(todayEarnings)}</strong>
            <small>{todayOrders.length} delivered order{todayOrders.length === 1 ? "" : "s"} today</small>
          </div>
        </article>

        <article className="restaurant-earnings-stat">
          <span className="restaurant-earnings-stat-icon purple"><LuChartNoAxesColumnIncreasing aria-hidden="true" /></span>
          <div><p>{selectedMonthLabel}</p><strong>{formatCurrency(monthEarnings)}</strong><small>Delivered order value</small></div>
        </article>

        <article className="restaurant-earnings-stat">
          <span className="restaurant-earnings-stat-icon orange"><LuPackageCheck aria-hidden="true" /></span>
          <div><p>Orders delivered</p><strong>{monthOrders.length}</strong><small>in {selectedMonthLabel}</small></div>
        </article>

        <article className="restaurant-earnings-stat">
          <span className="restaurant-earnings-stat-icon green"><LuTrendingUp aria-hidden="true" /></span>
          <div><p>Average order value</p><strong>{formatCurrency(averageOrderValue)}</strong><small>per delivered order</small></div>
        </article>
      </div>

      <section className="restaurant-earnings-chart-card">
        <div className="restaurant-earnings-section-heading">
          <div><h2>Last 7 days of {selectedMonthLabel}</h2><p>Delivered order value by day.</p></div>
          <span>{formatCurrency(monthEarnings)} total</span>
        </div>

        <div
          className="restaurant-earnings-chart"
          role="img"
          aria-label={`Earnings chart: ${chartData.map((bar) => `${bar.label} ${formatCurrency(bar.value)}`).join(", ")}`}
        >
          <div className="restaurant-earnings-bars">
            {chartData.map((bar) => (
              <div className="restaurant-earnings-bar-column" key={bar.label}>
                <div className="restaurant-earnings-bar-track">
                  {bar.value > 0 && <span className="restaurant-earnings-bar-value">{formatCurrency(bar.value)}</span>}
                  <span
                    className={`restaurant-earnings-bar ${bar.highlighted ? "highlighted" : ""}`}
                    style={{ "--bar-height": `${bar.height}%` }}
                  />
                </div>
                <small>{bar.label}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="restaurant-earnings-recent-card">
        <div className="restaurant-earnings-section-heading">
          <div><h2>Recent delivered orders</h2><p>Completed orders included in these earnings.</p></div>
          <span>{monthOrders.length} total</span>
        </div>

        {recentOrders.length ? (
          <div className="restaurant-earnings-order-list">
            {recentOrders.map((order) => (
              <article className="restaurant-earnings-order" key={order._id}>
                <span className="restaurant-earnings-order-icon"><LuPackageCheck aria-hidden="true" /></span>
                <div className="restaurant-earnings-order-copy">
                  <strong>Order #{String(order._id).slice(-6).toUpperCase()}</strong>
                  <span>{order.user?.fullName || "Customer"} · {order.items?.length || 0} items</span>
                </div>
                <time>{order.date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</time>
                <strong className="restaurant-earnings-order-amount">{formatCurrency(getOrderAmount(order))}</strong>
              </article>
            ))}
          </div>
        ) : (
          <div className="restaurant-earnings-empty"><LuWalletCards aria-hidden="true" /><p>No delivered orders in {selectedMonthLabel} yet.</p></div>
        )}
      </section>
    </section>
  );
};

export default RestaurantEarnings;
