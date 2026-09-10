import { useEffect, useRef } from "react";
import { FiChevronDown, FiUploadCloud } from "react-icons/fi";
import "./AdminFoodCategoryForm.css";
import { useSelector } from "react-redux";
import ButtonLoader from "../../Loaders/ButtonLoader/ButtonLoader";
import useAdminFoodCategory from "../../../hooks/useAdminFoodCategory";

const AdminFoodCategoryForm = ({ mode, data, onClose }) => {

    // get data from food categories store
    const {
        createLoading,
        updateLoading,
        deleteLoading,
        categories,
    } = useSelector((state) => state.foodCategories);

    /* -------------------------------------- */

    // get state and functions from the useAdminFoodCategory hook
    const {
        categoryForm,
        categoryErrors,
        handleCategoryChange,
        handleCategoryImageChange,
        resetCategoryForm,
        createFoodCategory,

        editCategoryForm,
        editCategoryErrors,
        initEditCategoryForm,
        handleEditCategoryChange,
        handleEditCategoryImageChange,
        updateFoodCategory,

        deleteFoodCategory,
    } = useAdminFoodCategory();

    /* -------------------------------------- */

    // file input reference
    const fileInputRef = useRef(null);

    // trigger file input
    const triggerFileSelect = () => {
        fileInputRef.current.click();
    };

    /* -------------------------------------- */

    useEffect(() => {

        if (mode === "edit" && data) {
            initEditCategoryForm(data);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, data]);

    return (

        <>

            {/* Add Category Form */}
            {mode === "add" && (

                <form
                    className="admin-category-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        createFoodCategory(onClose);
                    }}
                >

                    {/* Left - Image Upload */}
                    <div className="category-image-section">

                        <label className="admin-form-label">
                            Upload Category Image
                        </label>

                        <div
                            className="category-upload-box"
                            onClick={triggerFileSelect}
                        >

                            {categoryForm.imagePreview ? (

                                <img
                                    src={categoryForm.imagePreview}
                                    alt="Category Preview"
                                    className="category-preview-image"
                                />

                            ) : (

                                <>
                                    <FiUploadCloud className="category-upload-icon" />

                                    <span>
                                        Click to upload or drag & drop
                                    </span>

                                    <small>
                                        PNG, JPG, WEBP (Recommended: 2MB, Max: 5MB)
                                    </small>
                                </>

                            )}

                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/png, image/jpeg, image/webp"
                                style={{ display: "none" }}
                                onChange={handleCategoryImageChange}
                            />

                        </div>

                        <p className="category-upload-note">
                            Recommended size: 500 × 500px
                        </p>

                        {categoryErrors.image && (
                            <p className="error-text">
                                {categoryErrors.image}
                            </p>
                        )}

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
                                value={categoryForm.name}
                                onChange={handleCategoryChange}
                                placeholder="e.g. Pizza"
                            />

                            {categoryErrors.name && (
                                <p className="error-text">
                                    {categoryErrors.name}
                                </p>
                            )}

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

                                <select
                                    name="isTopCategory"
                                    value={categoryForm.isTopCategory}
                                    onChange={handleCategoryChange}
                                >
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

                                <select
                                    name="isActive"
                                    value={categoryForm.isActive}
                                    onChange={handleCategoryChange}
                                >
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
                                onClick={() => {
                                    resetCategoryForm();
                                    onClose();
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="category-modal-submit"
                                disabled={createLoading}
                            >
                                {createLoading
                                    ? <ButtonLoader />
                                    : "Add Category"
                                }
                            </button>

                        </div>

                    </div>

                </form>

            )}


            {/* Edit Category Form */}
            {mode === "edit" && (

                <form
                    className="admin-category-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        updateFoodCategory(data._id, onClose);
                    }}
                >

                    {/* Left - Current Image */}
                    <div className="category-image-section">

                        <label className="admin-form-label">
                            Category Image
                        </label>

                        <div className="category-edit-image-box">

                            <img
                                src={editCategoryForm.imagePreview}
                                alt={editCategoryForm.name || "Category"}
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
                            onChange={handleEditCategoryImageChange}
                        />

                        <p className="category-upload-note">
                            Recommended size: 500 × 500px
                        </p>

                        {editCategoryErrors.image && (
                            <p className="error-text">
                                {editCategoryErrors.image}
                            </p>
                        )}

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
                                value={editCategoryForm.name}
                                onChange={handleEditCategoryChange}
                                placeholder="e.g. Pizza"
                            />

                            {editCategoryErrors.name && (
                                <p className="error-text">
                                    {editCategoryErrors.name}
                                </p>
                            )}

                        </div>

                        {/* Order */}
                        <div className="admin-form-group">

                            <label>
                                Order
                            </label>

                            <input
                                type="number"
                                name="order"
                                value={editCategoryForm.order}
                                onChange={handleEditCategoryChange}
                                placeholder="e.g. 1"
                            />

                            {editCategoryErrors.order && (
                                <p className="error-text">
                                    {editCategoryErrors.order}
                                </p>
                            )}

                        </div>

                        {/* Top Category */}
                        <div className="admin-form-group">

                            <label>
                                Category Type
                            </label>

                            <div className="select-wrapper">

                                <select
                                    name="isTopCategory"
                                    value={editCategoryForm.isTopCategory}
                                    onChange={handleEditCategoryChange}
                                >
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

                                <select
                                    name="isActive"
                                    value={editCategoryForm.isActive}
                                    onChange={handleEditCategoryChange}
                                >
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
                                onClick={() => {
                                    resetCategoryForm();
                                    onClose();
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="category-modal-submit"
                                disabled={updateLoading}
                            >
                                {updateLoading
                                    ? <ButtonLoader />
                                    : "Save Changes"
                                }
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
                            onClick={() => {
                                resetCategoryForm();
                                onClose();
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="category-modal-delete"
                            onClick={() =>
                                deleteFoodCategory(data._id, onClose)
                            }
                            disabled={deleteLoading}
                        >
                            {deleteLoading
                                ? <ButtonLoader />
                                : "Delete"
                            }
                        </button>

                    </div>

                </div>

            )}

        </>

    );

};

export default AdminFoodCategoryForm;