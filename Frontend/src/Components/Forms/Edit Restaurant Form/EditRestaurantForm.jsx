import useEditRestaurant from "../../../hooks/Restaruant Owner Hooks/useEditRestaurant";
import ButtonLoader from "../../Loaders/ButtonLoader/ButtonLoader";
import CreateRestaurantMap from "../../Ui/Create Restaurant Map/CreateRestaurantMap";
import {
    FaStore,
    FaMapMarkerAlt,
    FaLeaf,
    FaUtensils,
    FaCloudUploadAlt,
} from "react-icons/fa";
import "./EditRestaurantForm.css";

const EditRestaurantForm = ({ onClose, data }) => {

    const {
        formData,
        imagePreview,
        errors,
        restaurantEditLoading,
        handleChange,
        handleImageChange,
        handleMapLocation,
        handleSubmit,
    } = useEditRestaurant({ data, onClose });

    return (
        <form
            className="edit-restaurant-form"
            onSubmit={handleSubmit}
        >

            {/* Form Header */}

            <div className="edit-restaurant-form-header">

                <div>
                    <h2>Edit Restaurant</h2>

                    <p>
                        Update your restaurant information
                    </p>
                </div>

                <button
                    type="button"
                    className="edit-restaurant-close-btn"
                    onClick={onClose}
                >
                    ×
                </button>

            </div>


            {/* Form Body */}

            <div className="edit-restaurant-form-body">

                {/* Left Side */}

                <div className="edit-restaurant-left">


                    {/* Basic Information */}

                    <div className="edit-form-section">

                        <div className="edit-section-heading">

                            <div className="edit-section-icon">
                                <FaStore />
                            </div>

                            <div>
                                <h3>Basic Information</h3>

                                <p>
                                    Update your restaurant's main details
                                </p>
                            </div>

                        </div>


                        {/* Image */}

                        <div className="edit-form-group">

                            <label>
                                Restaurant Image / Logo
                            </label>

                            <label className="edit-image-upload">

                                {imagePreview ? (

                                    <img
                                        src={imagePreview}
                                        alt="Restaurant preview"
                                    />

                                ) : (

                                    <div className="edit-image-placeholder">

                                        <span>
                                            <FaCloudUploadAlt />
                                        </span>

                                        <strong>
                                            Click to upload or drag & drop
                                        </strong>

                                        <small>
                                            PNG, JPG, WEBP (Max. 2MB)
                                        </small>

                                    </div>

                                )}

                                <input
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    onChange={handleImageChange}
                                />

                            </label>

                            {errors.image && (
                                <span className="edit-form-error">
                                    {errors.image}
                                </span>
                            )}

                        </div>


                        {/* Restaurant Name */}

                        <div className="edit-form-group">

                            <label>
                                Restaurant Name<span>*</span>
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. The Spice House"
                                className={errors.name ? "input-error" : ""}
                            />

                            {errors.name && (
                                <span className="edit-form-error">
                                    {errors.name}
                                </span>
                            )}

                        </div>


                        {/* Description */}

                        <div className="edit-form-group">

                            <label>
                                Description<span>*</span>
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Tell customers about your restaurant..."
                                maxLength={500}
                                className={
                                    errors.description
                                        ? "input-error"
                                        : ""
                                }
                            />

                            <div className="edit-description-count">
                                {formData.description.length}/500
                            </div>

                            {errors.description && (
                                <span className="edit-form-error">
                                    {errors.description}
                                </span>
                            )}

                        </div>


                        {/* Time */}

                        <div className="edit-form-row">

                            <div className="edit-form-group">

                                <label>
                                    Opening Time<span>*</span>
                                </label>

                                <input
                                    type="time"
                                    name="openingTime"
                                    value={formData.openingTime}
                                    onChange={handleChange}
                                    className={
                                        errors.openingTime
                                            ? "input-error"
                                            : ""
                                    }
                                />

                                {errors.openingTime && (
                                    <span className="edit-form-error">
                                        {errors.openingTime}
                                    </span>
                                )}

                            </div>


                            <div className="edit-form-group">

                                <label>
                                    Closing Time<span>*</span>
                                </label>

                                <input
                                    type="time"
                                    name="closingTime"
                                    value={formData.closingTime}
                                    onChange={handleChange}
                                    className={
                                        errors.closingTime
                                            ? "input-error"
                                            : ""
                                    }
                                />

                                {errors.closingTime && (
                                    <span className="edit-form-error">
                                        {errors.closingTime}
                                    </span>
                                )}

                            </div>

                        </div>


                        {/* Food Type */}

                        <div className="edit-form-group">

                            <label>
                                Food Type<span>*</span>
                            </label>

                            <div className="edit-food-type-row">

                                <label
                                    className={`edit-food-option ${formData.foodType === "pureVeg"
                                            ? "selected"
                                            : ""
                                        }`}
                                >

                                    <input
                                        type="radio"
                                        name="foodType"
                                        value="pureVeg"
                                        checked={
                                            formData.foodType === "pureVeg"
                                        }
                                        onChange={handleChange}
                                    />

                                    <span>
                                        <FaLeaf />
                                    </span>

                                    Pure Veg

                                </label>


                                <label
                                    className={`edit-food-option ${formData.foodType === "all"
                                            ? "selected"
                                            : ""
                                        }`}
                                >

                                    <input
                                        type="radio"
                                        name="foodType"
                                        value="all"
                                        checked={
                                            formData.foodType === "all"
                                        }
                                        onChange={handleChange}
                                    />

                                    <span>
                                        <FaUtensils />
                                    </span>

                                    All

                                </label>

                            </div>

                            {errors.foodType && (
                                <span className="edit-form-error">
                                    {errors.foodType}
                                </span>
                            )}

                        </div>

                    </div>

                </div>


                {/* Right Side */}

                <div className="edit-restaurant-right">

                    <div className="edit-form-section">

                        <div className="edit-section-heading">

                            <div className="edit-section-icon">
                                <FaMapMarkerAlt />
                            </div>

                            <div>
                                <h3>Location Details</h3>

                                <p>
                                    Update your restaurant's address and location
                                </p>
                            </div>

                        </div>


                        {/* Street */}

                        <div className="edit-form-group">

                            <label>
                                Street / Area<span>*</span>
                            </label>

                            <input
                                type="text"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                placeholder="e.g. 123, MG Road, Vijay Nagar"
                                className={
                                    errors.street
                                        ? "input-error"
                                        : ""
                                }
                            />

                            {errors.street && (
                                <span className="edit-form-error">
                                    {errors.street}
                                </span>
                            )}

                        </div>


                        {/* City + State */}

                        <div className="edit-form-row">

                            <div className="edit-form-group">

                                <label>
                                    City<span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="e.g. Indore"
                                    className={
                                        errors.city
                                            ? "input-error"
                                            : ""
                                    }
                                />

                                {errors.city && (
                                    <span className="edit-form-error">
                                        {errors.city}
                                    </span>
                                )}

                            </div>


                            <div className="edit-form-group">

                                <label>
                                    State<span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="e.g. Madhya Pradesh"
                                    className={
                                        errors.state
                                            ? "input-error"
                                            : ""
                                    }
                                />

                                {errors.state && (
                                    <span className="edit-form-error">
                                        {errors.state}
                                    </span>
                                )}

                            </div>

                        </div>


                        {/* Pincode */}

                        <div className="edit-form-group">

                            <label>
                                Pincode<span>*</span>
                            </label>

                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                placeholder="e.g. 452001"
                                className={
                                    errors.pincode
                                        ? "input-error"
                                        : ""
                                }
                            />

                            {errors.pincode && (
                                <span className="edit-form-error">
                                    {errors.pincode}
                                </span>
                            )}

                        </div>


                        {/* Selected Location */}

                        <div className="edit-form-group">

                            <label>
                                Selected Location<span>*</span>
                            </label>

                            <input
                                type="text"
                                name="mapLocation"
                                value={formData.mapLocation}
                                onChange={handleChange}
                                placeholder="Select location from map"
                                className={
                                    errors.mapLocation
                                        ? "input-error"
                                        : ""
                                }
                            />

                            {errors.mapLocation && (
                                <span className="edit-form-error">
                                    {errors.mapLocation}
                                </span>
                            )}

                        </div>


                        {/* Map */}

                        <div className="edit-map-wrapper">

                            <CreateRestaurantMap
                                latitude={Number(formData.latitude)}
                                longitude={Number(formData.longitude)}
                                handleMapLocation={handleMapLocation}
                            />

                        </div>

                    </div>

                </div>

            </div>


            {/* Footer */}

            <div className="edit-restaurant-form-footer">

                <button
                    type="button"
                    className="edit-cancel-btn"
                    onClick={onClose}
                    disabled={restaurantEditLoading}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="edit-save-btn"
                    disabled={restaurantEditLoading}
                >

                    {restaurantEditLoading
                        ? <ButtonLoader />
                        : "Update Restaurant"
                    }

                </button>

            </div>

        </form>
    );
};

export default EditRestaurantForm;