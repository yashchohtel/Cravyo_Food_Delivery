import { FiCheckCircle, FiChevronDown, FiClock, FiGrid, FiPackage, FiRefreshCw, FiSearch, FiTruck } from "react-icons/fi";
import AdminStatsCard from "../../../Components/Admin/Admin Stats Card/AdminStatsCard";
import OrderCard from "../../../Components/Ui/Order Card/OrderCard";
import useManageOrder from "../../../hooks/Restaruant Owner Hooks/useManageOrder";
import "./Orders.css";
import RestaurantOwnerFormModal from "../Restaurant Owner Form Modal/RestaurantOwnerFormModal";
import { useState } from "react";

const Orders = () => {

  const {
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

    resetFilters
  } = useManageOrder();

  /* -------------------------------------- */

  // modal state
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    mode: null,
    data: null,
  });

  // open modal
  const openModal = (type, mode, data = null) => {
    setModal({
      isOpen: true,
      type,
      mode,
      data,
    });
  };

  // close modal
  const closeModal = () => {
    setModal({
      isOpen: false,
      type: null,
      mode: null,
      data: null,
    });
  };

  return (

    <div className="orders-page">

      <RestaurantOwnerFormModal
        isOpen={modal.isOpen}
        type={modal.type}
        mode={modal.mode}
        data={modal.data}
        onClose={closeModal}
      />

      {/* Stats */}
      <div className="orders-stats-grid">

        <AdminStatsCard
          icon={<FiGrid />}
          title="Total Orders"
          value={totalOrders}
          variant="total"
        />

        <AdminStatsCard
          icon={<FiClock />}
          title="New / Pending"
          value={pendingOrders}
          variant="top"
        />

        <AdminStatsCard
          icon={<FiPackage />}
          title="Preparing"
          value={preparingOrders}
          variant="active"
        />

        <AdminStatsCard
          icon={<FiTruck />}
          title="Out for Delivery"
          value={outForDeliveryOrders}
          variant="top"
        />

        <AdminStatsCard
          icon={<FiCheckCircle />}
          title="Delivered"
          value={deliveredOrders}
          variant="active"
        />

      </div>

      {/* Search + Filters */}
      <div className="orders-search-filter">

        <div className="orders-search-box">

          <FiSearch className="orders-search-icon" />

          <input
            type="text"
            placeholder="Search by Order ID or customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="orders-filter-right">

          <div className="orders-filter-box">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="pending">New / Pending</option>
              <option value="preparing">Preparing</option>
              <option value="out_for_delivery"> Out for Delivery </option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <FiChevronDown className="orders-filter-icon" />
          </div>

          <div className="orders-filter-box">
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">All Payments</option>
              <option value="COD">COD</option>
              <option value="ONLINE">Online</option>
            </select>

            <FiChevronDown className="orders-filter-icon" />
          </div>

          <div className="orders-filter-box">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="">Select Date</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
            </select>

            <FiChevronDown className="orders-filter-icon" />
          </div>

          <button
            className="orders-action-btn"
            onClick={resetFilters}
          >
            <FiRefreshCw />
            Reset
          </button>

        </div>

      </div>

      {/* Orders */}
      {!restaurantOrdersLoading && filteredOrders.length > 0 && (

        <div className="orders-grid">

          {filteredOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onView={(order) => openModal("viewOrder", "view", order)}
              onChangeStatus={(order) => openModal("changeOrderStatus", "edit", order)}
            />
          ))}

        </div>

      )}

      {!restaurantOrdersLoading && filteredOrders.length === 0 && (
        <div className="orders-empty-state">

          <FiPackage />

          <h2>No Orders Found</h2>

          <p>
            {search || status || paymentMethod || dateFilter
              ? "No orders match your current filters."
              : "Orders will appear here when customers place orders."}
          </p>

        </div>
      )}

    </div>
  );
};

export default Orders;