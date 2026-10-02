import EditRestaurantForm from '../../../Components/Forms/Edit Restaurant Form/EditRestaurantForm';
import ButtonLoader from '../../../Components/Loaders/ButtonLoader/ButtonLoader';
import useAddFoodItem from '../../../hooks/Restaruant Owner Hooks/useFoodItems';
import AddFoodItemForm from '../Add Food Item Form/AddFoodItemForm';
import ViewFoodItem from '../View Food Item/ViewFoodItem';
import { FiX, FiUser, FiMapPin, FiCreditCard, FiPackage } from "react-icons/fi";
import './RestaurantOwnerFormModal.css'
import ChangeOrderStatusForm from '../../../Components/Ui/Change Order Status Form/ChangeOrderStatusForm';

const RestaurantOwnerFormModal = (props) => {

    // destructure console
    const { isOpen, onClose, type, mode, data, } = props

    const {
        handleDeleteFoodItem,
        deleteFoodItemLoading
    } = useAddFoodItem({ onClose, mode, data });

    // if modal closed
    if (!isOpen) {
        return null;
    }

    return (

        <>
            <div className="restaurantOwner-modal-overlay">

                {/* if type is not equal to exit restaurant */}
                {type === "addFoodItem" && (
                    <AddFoodItemForm
                        onClose={onClose}
                        mode={mode}
                        data={data}
                    />
                )}

                {/* if form is edit restaurant form */}
                {type === "editRestaurant" && mode === "edit" && (
                    <EditRestaurantForm
                        onClose={onClose}
                        data={data}
                    />
                )}

                {/* if type is viewFoodItem  */}
                {type === "viewFoodItem" && mode === "view" && (
                    <ViewFoodItem
                        data={data}
                        onClose={onClose}
                    />
                )}

                {/* delete food item */}
                {type === "deleteFoodItem" && mode === "delete" && (

                    <div className="delete-food-modal">

                        {/* Header */}
                        <div className="delete-food-header">

                            <h2>Delete Food Item</h2>

                            <button
                                type="button"
                                className="delete-food-close"
                                onClick={onClose}
                            >
                                ×
                            </button>

                        </div>

                        <div className="delete-food-body">

                            <p>
                                Are you sure you want to delete this food item?
                            </p>

                            <div className="delete-food-actions">

                                <button
                                    type="button"
                                    className="delete-food-cancel"
                                    disabled={deleteFoodItemLoading}
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="delete-food-confirm"
                                    onClick={() => handleDeleteFoodItem(data._id)}
                                    disabled={deleteFoodItemLoading}
                                >
                                    {deleteFoodItemLoading ? <ButtonLoader /> : "Delete"}
                                </button>

                            </div>

                        </div>

                    </div>
                )}

                {/* View Order */}
                {type === "viewOrder" && mode === "view" && data && (

                    <div className="view-order-modal">

                        {/* Header */}
                        <div className="view-order-header">

                            <div>
                                <h2>Order Details</h2>

                                <p>
                                    Order #{data._id}
                                </p>
                            </div>

                            <button
                                type="button"
                                className="view-order-close"
                                onClick={onClose}
                            >
                                <FiX />
                            </button>

                        </div>


                        {/* Order Summary */}
                        <div className="view-order-summary">

                            <div className="view-order-summary-item">
                                <span>Order Date</span>
                                <strong>
                                    {new Date(data.createdAt).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </strong>
                            </div>

                            <div className="view-order-summary-item">
                                <span>Order Time</span>
                                <strong>
                                    {new Date(data.createdAt).toLocaleTimeString("en-IN", {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </strong>
                            </div>

                            <div className="view-order-summary-item">
                                <span>Status</span>

                                <span className={`view-order-status view-order-status-${data.status}`}>
                                    <span></span>
                                    {data.status === "pending"
                                        ? "New"
                                        : data.status === "out_for_delivery"
                                            ? "Out for Delivery"
                                            : data.status?.replaceAll("_", " ")}
                                </span>
                            </div>

                            <div className="view-order-summary-item">
                                <span>Payment</span>
                                <strong>{data.paymentMethod}</strong>
                            </div>

                        </div>


                        {/* Customer + Restaurant */}
                        <div className="view-order-section">

                            <div className="view-order-section-title">
                                <FiUser />
                                <h3>Customer Details</h3>
                            </div>

                            <div className="view-order-customer">

                                <div className="view-order-customer-avatar">
                                    {data.user?.fullName?.charAt(0)?.toUpperCase() || "C"}
                                </div>

                                <div>
                                    <h4>
                                        {data.user?.fullName || "Customer"}
                                    </h4>

                                    <p>
                                        {data.user?.mobileNumber ||
                                            data.user?.email ||
                                            "No contact information"}
                                    </p>
                                </div>

                            </div>

                        </div>


                        {/* Restaurant */}
                        <div className="view-order-section">

                            <div className="view-order-section-title">
                                <FiPackage />
                                <h3>Restaurant</h3>
                            </div>

                            <p className="view-order-restaurant-name">
                                {data.restaurant?.restaurantName || "Restaurant"}
                            </p>

                        </div>


                        {/* Ordered Items */}
                        <div className="view-order-section">

                            <div className="view-order-section-title">
                                <FiPackage />
                                <h3>Ordered Items</h3>
                            </div>

                            <div className="view-order-items">

                                {data.items?.map((item) => (

                                    <div
                                        className="view-order-item"
                                        key={item.foodId}
                                    >

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                        />

                                        <div className="view-order-item-details">

                                            <div className="view-order-item-name">

                                                <span
                                                    className={
                                                        item.isVeg
                                                            ? "view-order-veg"
                                                            : "view-order-nonveg"
                                                    }
                                                >
                                                    {item.isVeg ? "●" : "▲"}
                                                </span>

                                                <h4>{item.name}</h4>

                                            </div>

                                            <p>
                                                ₹{item.price} × {item.quantity}
                                            </p>

                                        </div>

                                        <strong>
                                            ₹{item.price * item.quantity}
                                        </strong>

                                    </div>

                                ))}

                            </div>

                        </div>


                        {/* Delivery Address */}
                        <div className="view-order-section">

                            <div className="view-order-section-title">
                                <FiMapPin />
                                <h3>Delivery Address</h3>
                            </div>

                            <div className="view-order-address">

                                <p>
                                    {data.deliveryAddress?.houseNumber}
                                </p>

                                <p>
                                    {data.deliveryAddress?.area}
                                </p>

                                <p>
                                    {data.deliveryAddress?.city} -{" "}
                                    {data.deliveryAddress?.pincode}
                                </p>

                            </div>

                        </div>


                        {/* Pricing */}
                        <div className="view-order-section">

                            <div className="view-order-section-title">
                                <FiCreditCard />
                                <h3>Bill Details</h3>
                            </div>

                            <div className="view-order-bill">

                                <div>
                                    <span>Item Total</span>
                                    <strong>₹{data.pricing?.itemTotal}</strong>
                                </div>

                                <div>
                                    <span>Delivery Fee</span>
                                    <strong>₹{data.pricing?.deliveryFee}</strong>
                                </div>

                                <div>
                                    <span>Taxes</span>
                                    <strong>₹{data.pricing?.taxes}</strong>
                                </div>

                                <div className="view-order-total">
                                    <span>Total Amount</span>
                                    <strong>₹{data.pricing?.totalAmount}</strong>
                                </div>

                            </div>

                        </div>


                        {/* Footer */}
                        <div className="view-order-footer">

                            <button
                                type="button"
                                onClick={onClose}
                            >
                                Close
                            </button>

                        </div>

                    </div>

                )}

                {type === "changeOrderStatus" && mode === "edit" && (
                    <ChangeOrderStatusForm
                        data={data}
                        onClose={onClose}
                    />
                )}

            </div>
        </>

    )

}

export default RestaurantOwnerFormModal