import { FiX, FiUpload, FiClock } from "react-icons/fi";
import { FaLeaf, FaDrumstickBite } from "react-icons/fa";
import "./AddFoodItemForm.css";
import useAddFoodItem from "../../../hooks/Restaruant Owner Hooks/useFoodItems";
import ButtonLoader from "../../../Components/Loaders/ButtonLoader/ButtonLoader";

const AddFoodItemForm = ({ onClose }) => {

    const {
        formData,
        errors,
        categoryType,
        createFoodItemLoading,
        handleChange,
        handleFoodTypeChange,
        handleCategoryTypeChange,
        handleImageChange,
        handleCreateFoodItem
    } = useAddFoodItem({ onClose });

    return (
        <form
            className="add-food-form"
            onSubmit={handleCreateFoodItem}
        >

            {/* Header */}
            <div className="add-food-header">
                <h2>Add New Food Item</h2>

                <button type="button" onClick={onClose}>
                    <FiX />
                </button>
            </div>

            {/* Main Content */}
            <div className="add-food-content">

                {/* Left Section */}
                <div className="add-food-left">
                    {/* Image */}
                    <div className="add-food-image-section">
                        <label>Food Image</label>

                        <input
                            type="file"
                            id="food-image"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={handleImageChange}
                            hidden
                        />

                        <label
                            htmlFor="food-image"
                            className="add-food-upload"
                        >
                            {formData.imagePreview ? (
                                <img
                                    src={formData.imagePreview}
                                    alt="Food preview"
                                    className="food-image-preview"
                                />
                            ) : (
                                <>
                                    <FiUpload />

                                    <p>Click to upload or drag & drop</p>

                                    <span>
                                        PNG, JPG, WEBP (Max: 5MB)
                                    </span>
                                </>
                            )}
                        </label>

                        <small>
                            Recommended size: 800 × 600px
                        </small>

                        {errors.image && (
                            <p className="add-food-error">
                                {errors.image}
                            </p>
                        )}
                    </div>

                    {/* Food Type */}
                    <div className="add-food-field">
                        <label>Food Type</label>

                        <div className="food-type-options">

                            <label className="food-type-option">
                                <input
                                    type="radio"
                                    name="foodType"
                                    value="veg"
                                    checked={formData.isVeg === true}
                                    onChange={() => handleFoodTypeChange("veg")}
                                />

                                <span className="food-type-radio"></span>

                                <FaLeaf className="veg-icon" />

                                <span>Veg</span>
                            </label>

                            <label className="food-type-option">
                                <input
                                    type="radio"
                                    name="foodType"
                                    value="nonVeg"
                                    checked={formData.isVeg === false}
                                    onChange={() => handleFoodTypeChange("nonVeg")}
                                />

                                <span className="food-type-radio"></span>

                                <FaDrumstickBite className="nonveg-icon" />

                                <span>Non-Veg</span>
                            </label>

                        </div>
                    </div>

                    {/* Preparation Time */}
                    <div className="add-food-field">
                        <label>Preparation Time</label>

                        <div className="preparation-input">
                            <FiClock />

                            <input
                                type="number"
                                name="preparationTime"
                                value={formData.preparationTime}
                                onChange={handleChange}
                                placeholder="15"
                            />

                            <span>min</span>
                        </div>
                    </div>

                </div>

                {/* Right Section */}
                <div className="add-food-right">

                    {/* Name */}
                    <div className="add-food-field">
                        <label>Food Name</label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Margherita Pizza"
                        />
                    </div>

                    {/* Category */}
                    <div className="add-food-field">
                        <label>Category</label>

                        <div className="category-type-toggle">

                            <button
                                type="button"
                                className={categoryType === "existing" ? "active" : ""}
                                onClick={() => handleCategoryTypeChange("existing")}
                            >
                                Select Category
                            </button>

                            <button
                                type="button"
                                className={categoryType === "custom" ? "active" : ""}
                                onClick={() => handleCategoryTypeChange("custom")}
                            >
                                Custom Category
                            </button>

                        </div>

                        {categoryType === "existing" ? (
                            <select
                                value={formData.category}
                                onChange={handleChange}
                                name="category"
                            >
                                <option value="" disabled>
                                    Select category
                                </option>

                                <option>Pizza</option>
                                <option>Burger</option>
                                <option>Biryani</option>
                                <option>Chinese</option>
                                <option>North Indian</option>
                                <option>South Indian</option>
                                <option>Rolls</option>
                                <option>Momos</option>
                                <option>Sandwich</option>
                                <option>Pasta</option>
                                <option>Dosa</option>
                                <option>Thali</option>
                                <option>Healthy Food</option>
                                <option>Desserts</option>
                                <option>Cakes</option>
                                <option>Ice Cream</option>
                                <option>Beverages</option>
                                <option>Breakfast</option>
                                <option>Fast Food</option>
                                <option>Street Food</option>
                            </select>
                        ) : (
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="e.g. Special Combos"
                            />
                        )}
                    </div>

                    {/* Description */}
                    <div className="add-food-field">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your food item..."
                            rows="3"
                        />
                    </div>

                    {/* Prices */}
                    <div className="add-food-row three">

                        <div className="add-food-field">
                            <label>Price</label>

                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="249"
                            />
                        </div>

                        <div className="add-food-field">
                            <label>Original Price</label>
                            <input
                                type="number"
                                name="originalPrice"
                                value={formData.originalPrice}
                                onChange={handleChange}
                                placeholder="299"
                            />
                        </div>

                        <div className="add-food-field">
                            <label>Discount (%)</label>

                            <input
                                type="number"
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                placeholder="17"
                            />
                        </div>

                    </div>

                    {/* Availability */}
                    <div className="add-food-field">
                        <label>Availability</label>

                        <select defaultValue="available">
                            <option value="available">
                                Available
                            </option>

                            <option value="unavailable">
                                Unavailable
                            </option>
                        </select>
                    </div>

                </div>

            </div>

            {/* Footer */}
            <div className="add-food-footer">

                <button
                    type="button"
                    className="cancel"
                    onClick={onClose}
                    disabled={createFoodItemLoading}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="submit"
                    disabled={createFoodItemLoading}
                >
                    {createFoodItemLoading
                        ? <ButtonLoader />
                        : "Add Food Item"
                    }
                </button>

            </div>

        </form>
    );
};

export default AddFoodItemForm;