import { useRef } from "react";
import { FiChevronDown, FiUploadCloud } from "react-icons/fi";
import "./AdminFoodCategoryForm.css";
import { useSelector } from "react-redux";

const AdminFoodCategoryForm = ({ mode, data, onClose }) => {

    // get data from food categories store
    const { categories } = useSelector((state) => state.foodCategories);

    /* -------------------------------------- */

    // file input reference
    const fileInputRef = useRef(null);

    // trigger file input
    const triggerFileSelect = () => {
        fileInputRef.current.click();
    };

    /* -------------------------------------- */

    return (

        <>

            {/* Add Category Form */}
            {mode === "add" && (

                <form className="admin-category-form">

                    {/* Left - Image Upload */}
                    <div className="category-image-section">

                        <label className="admin-form-label">
                            Upload Category Image
                        </label>

                        <div
                            className="category-upload-box"
                            onClick={triggerFileSelect}
                        >

                            <FiUploadCloud className="category-upload-icon" />

                            <span>
                                Click to upload or drag & drop
                            </span>

                            <small>
                                PNG, JPG, WEBP (Recommended: 2MB, Max: 5MB)
                            </small>

                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/png, image/jpeg, image/webp"
                                style={{ display: "none" }}
                            />

                        </div>

                        <p className="category-upload-note">
                            Recommended size: 500 × 500px
                        </p>

                    </div>

                    {/* Right - Category Details */}
                    <div className="category-form-details">

                        {/* Name */}
                        <div className="admin-form-group">

                            <label>
                                Category Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="e.g. Pizza"
                            />

                        </div>

                        {/* Order */}
                        <div className="admin-form-group">

                            <label>
                                Order
                            </label>

                            <p className="category-order-display">
                                This will be category #{categories.length + 1}
                            </p>

                        </div>

                        {/* Top Category */}
                        <div className="admin-form-group">

                            <label>
                                Category Type
                            </label>

                            <div className="select-wrapper">

                                <select name="isTopCategory">
                                    <option value={true}>
                                        Top Category
                                    </option>

                                    <option value={false}>
                                        Normal Category
                                    </option>
                                </select>

                                <FiChevronDown className="select-arrow" />

                            </div>

                        </div>

                        {/* Status */}
                        <div className="admin-form-group">

                            <label>
                                Status
                            </label>

                            <div className="select-wrapper">

                                <select name="isActive">
                                    <option value={true}>
                                        Active
                                    </option>

                                    <option value={false}>
                                        Inactive
                                    </option>
                                </select>

                                <FiChevronDown className="select-arrow" />

                            </div>

                        </div>

                        {/* Actions */}
                        <div className="category-actions">

                            <button
                                type="button"
                                className="category-modal-cancel"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="category-modal-submit"
                            >
                                Add Category
                            </button>

                        </div>

                    </div>

                </form>

            )}


            {/* Edit Category Form */}
            {mode === "edit" && (

                <form className="admin-category-form">

                    {/* Left - Current Image */}
                    <div className="category-image-section">

                        <label className="admin-form-label">
                            Category Image
                        </label>

                        <div className="category-edit-image-box">

                            <img
                                src={data?.image}
                                alt={data?.name || "Category"}
                                className="category-edit-image"
                            />

                        </div>

                        <button
                            type="button"
                            className="category-change-image"
                            onClick={triggerFileSelect}
                        >
                            <FiUploadCloud />
                            Change Image
                        </button>

                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/png, image/jpeg, image/webp"
                            style={{ display: "none" }}
                        />

                        <p className="category-upload-note">
                            Recommended size: 500 × 500px
                        </p>

                    </div>

                    {/* Right - Category Details */}
                    <div className="category-form-details">

                        {/* Name */}
                        <div className="admin-form-group">

                            <label>
                                Category Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                defaultValue={data?.name || ""}
                                placeholder="e.g. Pizza"
                            />

                        </div>

                        {/* Order */}
                        <div className="admin-form-group">

                            <label>
                                Order
                            </label>

                            <input
                                type="number"
                                name="order"
                                defaultValue={data?.order || ""}
                                placeholder="e.g. 1"
                            />

                        </div>

                        {/* Top Category */}
                        <div className="admin-form-group">

                            <label>
                                Category Type
                            </label>

                            <div className="select-wrapper">

                                <select
                                    name="isTopCategory"
                                    defaultValue={String(data?.isTopCategory)}
                                >
                                    <option value="true">
                                        Top Category
                                    </option>

                                    <option value="false">
                                        Normal Category
                                    </option>
                                </select>

                                <FiChevronDown className="select-arrow" />

                            </div>

                        </div>

                        {/* Status */}
                        <div className="admin-form-group">

                            <label>
                                Status
                            </label>

                            <div className="select-wrapper">

                                <select
                                    name="isActive"
                                    defaultValue={String(data?.isActive)}
                                >
                                    <option value="true">
                                        Active
                                    </option>

                                    <option value="false">
                                        Inactive
                                    </option>

                                </select>

                                <FiChevronDown className="select-arrow" />

                            </div>

                        </div>

                        {/* Actions */}
                        <div className="category-actions">

                            <button
                                type="button"
                                className="category-modal-cancel"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="category-modal-submit"
                            >
                                Save Changes
                            </button>

                        </div>

                    </div>

                </form>

            )}


            {/* View Category */}
            {mode === "view" && (

                <div className="view-category-container">

                    {/* Left - Category Image */}
                    <div className="view-category-image-section">

                        <div className="view-category-image-box">

                            <img
                                src={data?.image}
                                alt={data?.name || "Category"}
                                className="view-category-image"
                            />

                        </div>

                    </div>

                    {/* Right - Category Information */}
                    <div className="view-category-info">

                        <h3>
                            Category Information
                        </h3>

                        <div className="view-category-info-list">

                            <div className="view-category-info-item">
                                <span>Name</span>
                                <strong>
                                    {data?.name || "Untitled Category"}
                                </strong>
                            </div>

                            <div className="view-category-info-item">
                                <span>Order</span>
                                <strong>
                                    {data?.order ?? "-"}
                                </strong>
                            </div>

                            <div className="view-category-info-item">
                                <span>Category Type</span>
                                <strong>
                                    {data?.isTopCategory
                                        ? "Top Category"
                                        : "Normal Category"
                                    }
                                </strong>
                            </div>

                            <div className="view-category-info-item">
                                <span>Status</span>
                                <strong
                                    className={`category-status ${data?.isActive
                                        ? "status-active"
                                        : "status-inactive"
                                        }`}
                                >
                                    {data?.isActive
                                        ? "Active"
                                        : "Inactive"
                                    }
                                </strong>
                            </div>

                            <div className="view-category-info-item">
                                <span>Created At</span>
                                <strong>
                                    {data?.createdAt
                                        ? new Date(
                                            data.createdAt
                                        ).toLocaleDateString()
                                        : "-"
                                    }
                                </strong>
                            </div>

                        </div>

                    </div>

                </div>

            )}


            {/* Delete Category */}
            {mode === "delete" && (

                <div className="delete-category-box">

                    <p className="delete-category-text">
                        Are you sure you want to delete this category?
                    </p>

                    <div className="delete-category-actions">

                        <button
                            type="button"
                            className="category-modal-cancel"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="category-modal-delete"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            )}

        </>

    );

};

export default AdminFoodCategoryForm;