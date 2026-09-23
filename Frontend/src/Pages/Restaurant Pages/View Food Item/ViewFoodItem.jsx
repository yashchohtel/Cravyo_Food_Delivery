import { FiX, FiClock, FiStar, FiShoppingBag, FiMessageSquare } from "react-icons/fi";
import { FaLeaf } from "react-icons/fa";
import "./ViewFoodItem.css";

const ViewFoodItem = ({ data, onClose }) => {

    if (!data) return null;

    return (
        <div className="view-food-overlay">

            <div className="view-food-modal">

                {/* Header */}
                <div className="view-food-header">
                    <h2>Food Item Details</h2>

                    <button
                        type="button"
                        className="view-food-close"
                        onClick={onClose}
                    >
                        <FiX />
                    </button>
                </div>


                {/* Content */}
                <div className="view-food-content">

                    {/* Image */}
                    <div className="view-food-image-section">
                        <img
                            src={data.image}
                            alt={data.name}
                            className="view-food-image"
                        />
                    </div>


                    {/* Details */}
                    <div className="view-food-details">

                        {/* Name + Status */}
                        <div className="view-food-title-section">

                            <h3>{data.name}</h3>

                            <div className="view-food-badges">

                                <span
                                    className={`food-type-badge ${data.isVeg
                                        ? "veg-badge"
                                        : "nonveg-badge"
                                        }`}
                                >
                                    <FaLeaf />
                                    {data.isVeg ? "Veg" : "Non-Veg"}
                                </span>

                                <span
                                    className={`availability-badge ${data.isAvailable
                                        ? "available-badge"
                                        : "unavailable-badge"
                                        }`}
                                >
                                    <span className="status-dot"></span>
                                    {data.isAvailable
                                        ? "Available"
                                        : "Unavailable"}
                                </span>

                            </div>

                        </div>


                        {/* Description */}
                        <div className="view-food-row description-row">

                            <span className="view-food-label">
                                Description
                            </span>

                            <p className="view-food-value description-value">
                                {data.description || "No description available"}
                            </p>

                        </div>


                        {/* Category */}
                        <div className="view-food-row">

                            <span className="view-food-label">
                                Category
                            </span>

                            <span className="view-food-value">
                                <span className="category-badge">
                                    {data.category}
                                </span>
                            </span>

                        </div>


                        {/* Price */}
                        <div className="view-food-row">

                            <span className="view-food-label">
                                Price
                            </span>

                            <strong className="view-food-price">
                                ₹{data.price}
                            </strong>

                        </div>


                        {/* Discount */}
                        <div className="view-food-row">

                            <span className="view-food-label">
                                Discount
                            </span>

                            <span className="view-food-discount">
                                {data.discount || 0}%
                            </span>

                        </div>


                        {/* Preparation Time */}
                        <div className="view-food-row">

                            <span className="view-food-label">
                                <FiClock />
                                Preparation Time
                            </span>

                            <span className="view-food-value">
                                {data.preparationTime} minutes
                            </span>

                        </div>


                        {/* Total Orders */}
                        <div className="view-food-row">

                            <span className="view-food-label">
                                <FiShoppingBag />
                                Total Orders
                            </span>

                            <span className="view-food-value">
                                {data.totalOrders || 0}
                            </span>

                        </div>


                        {/* Rating */}
                        <div className="view-food-row">

                            <span className="view-food-label">
                                <FiStar />
                                Rating
                            </span>

                            <span className="view-food-value rating-value">
                                {data.rating || 0}
                                <FiStar />
                            </span>

                        </div>


                        {/* Total Reviews */}
                        <div className="view-food-row">

                            <span className="view-food-label">
                                <FiMessageSquare />
                                Total Reviews
                            </span>

                            <span className="view-food-value">
                                {data.totalReviews || 0}
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ViewFoodItem;