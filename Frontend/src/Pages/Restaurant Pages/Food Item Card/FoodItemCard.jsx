import { FaStar, FaClock, FaEye, FaCommentDots, FaEdit, FaTrash, FaLeaf, FaDrumstickBite } from "react-icons/fa";
import "./FoodItemCard.css";

const FoodItemCard = ({ item }) => {

    return (

        <div className="food-item-card">

            {/* Food Image */}
            <div className="food-item-image-wrapper">
                <img
                    src={item.image}
                    alt={item.name}
                    className="food-item-image"
                />

                {/* Veg / Non-Veg */}
                <div
                    className={`food-type-icon ${item.isVeg ? "veg-icon" : "nonveg-icon"}`}
                    title={item.isVeg ? "Vegetarian" : "Non Vegetarian"}
                >
                    {item.isVeg ? <FaLeaf /> : <FaDrumstickBite />}
                </div>

                {/* Rating */}
                <div className="food-item-rating">
                    <FaStar />
                    <span>{item.rating}</span>
                    <small>({item.totalReviews})</small>
                </div>
            </div>

            {/* Card Content */}
            <div className="food-item-content">

                <div className="food-item-title-row">
                    <h3>{item.name}</h3>
                </div>

                <p className="food-item-description">
                    {item.description}
                </p>

                <div className="food-item-meta">

                    <span className="food-item-category">
                        {item.category}
                    </span>

                    <span className="food-item-time">
                        <FaClock />
                        {item.preparationTime} min
                    </span>

                </div>

                <div className="food-item-price-row">

                    <div className="food-item-price">
                        ₹{item.price}

                        {item.originalPrice &&item.originalPrice > item.price && (<del>₹{item.originalPrice}</del>)}
                    </div>

                    {item.discount > 0 && (
                        <span className="food-item-discount">
                            {item.discount}% OFF
                        </span>
                    )}

                </div>

                {/* Availability */}
                <div
                    className={`food-item-availability ${item.isAvailable
                        ? "availability-available"
                        : "availability-unavailable"
                        }`}
                >
                    <span className="availability-dot"></span>

                    {item.isAvailable ? "Available" : "Unavailable"}
                </div>

                {/* Actions */}
                <div className="food-item-actions">

                    <button type="button">
                        <FaEye />
                        View
                    </button>

                    <button type="button">
                        <FaCommentDots />
                        Reviews
                    </button>

                    <button
                        type="button"
                        className="icon-action-button"
                        title="Edit"
                    >
                        <FaEdit />
                    </button>

                    <button
                        type="button"
                        className="icon-action-button delete-action"
                        title="Delete"
                    >
                        <FaTrash />
                    </button>

                </div>

            </div>
        </div>
    );
};

export default FoodItemCard;