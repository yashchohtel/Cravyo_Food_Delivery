import { useRef } from 'react';
import usePromotionBanner from '../../../hooks/usePromotionBanner';
import './AdminFormModal.css'
import { FiChevronDown, FiUploadCloud, FiX } from "react-icons/fi";
import ButtonLoader from '../../Loaders/ButtonLoader/ButtonLoader';
import { useSelector } from 'react-redux';

const AdminFormModal = (props) => {

    // destructure props
    const { isOpen, onClose, type, mode, data } = props;

    /* -------------------------------------- */

    // Get existing banners list from redux store
    const { createLoading } = useSelector((state) => state.promotionBanners);

    /* -------------------------------------- */

    // ref to get input field refrence to open file dialog
    const fileInputRef = useRef(null);

    // function to trigger file input click
    const triggerFileSelect = () => {
        fileInputRef.current.click();
    };

    /* -------------------------------------- */

    // get state and function from usePromotionBanner hook
    const { createBanner, bannerForm, handleBannerChange, handleImageChange, bannerErrors, resetBannerForm } = usePromotionBanner();

    /* -------------------------------------- */

    // function to get modal title based on type and mode
    const getModalTitle = () => {

        if (type === "banner" && mode === "add") {
            return "Add New Banner";
        }

        if (type === "banner" && mode === "edit") {
            return "Edit Banner";
        }

        if (type === "banner" && mode === "view") {
            return "View Banner";
        }

        if (type === "category" && mode === "add") {
            return "Add New Category";
        }

        if (type === "category" && mode === "edit") {
            return "Edit Category";
        }

        if (type === "category" && mode === "view") {
            return "View Category";
        }

        return "";
    };

    /* -------------------------------------- */

    // if modal is not open, return null
    if (!isOpen) return null;

    return (

        // admin modal overlay
        <div className="admin-modal-overlay" >

            {/* admin modal */}
            <div className="admin-modal">

                {/* Modal Header */}
                <div className="admin-modal-header">

                    <h2>
                        {getModalTitle()}
                    </h2>

                    <button
                        type="button"
                        className="admin-modal-close"
                        onClick={() => {
                            resetBannerForm();
                            onClose();
                        }}
                    >
                        <FiX />
                    </button>

                </div>

                {/* ---------------- modal related to banners ---------------- */}

                {/* Add Banner Form */}
                {type === "banner" && mode === "add" && (

                    <form
                        className="admin-banner-form"
                        onSubmit={(e) => {
                            e.preventDefault();   // prevent default page reload
                            createBanner();       // create banner using current state from hook
                        }}
                    >

                        {/* Left - Image Upload */}
                        <div className="banner-image-section">

                            <label className="admin-form-label">
                                Upload Banner Image
                            </label>

                            <div
                                className="banner-upload-box"
                                onClick={triggerFileSelect}
                            >

                                {bannerForm.imagePreview ? (
                                    <img
                                        src={bannerForm.imagePreview}
                                        alt="Banner Preview"
                                        className="banner-preview-image"
                                    />
                                ) : (
                                    <>
                                        <FiUploadCloud className="banner-upload-icon" />
                                        <span>Click to upload or drag & drop</span>
                                        <small>PNG, JPG, WEBP (Recommended: 2MB, Max: 5MB)</small>
                                    </>
                                )}

                                {/* input to get image */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/png, image/jpeg, image/webp"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />

                            </div>

                            <p className="banner-upload-note">
                                Recommended size: 1920 x 600px
                            </p>

                            <p className="error-text">
                                {bannerErrors.image}
                            </p>

                        </div>

                        {/* Right - Banner Details */}
                        <div className="banner-form-details">

                            {/* Title */}
                            <div className="admin-form-group">

                                <label>
                                    Title <span>(Optional)</span>
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={bannerForm.title}
                                    onChange={handleBannerChange}
                                    placeholder="e.g. Delivery at ₹1"
                                />

                            </div>

                            {/* Order - auto-calculated, display only */}
                            <div className="admin-form-group">
                                <label>
                                    Order
                                </label>
                                <p className="banner-order-display">
                                    This will be banner # {bannerForm.order}
                                </p>
                            </div>

                            {/* Status */}
                            <div className="admin-form-group">

                                <label> Status </label>

                                <div className="select-wrapper">

                                    <select
                                        name="isActive"
                                        value={bannerForm.isActive}
                                        onChange={handleBannerChange}
                                    >

                                        <option value={true}>Active</option>
                                        <option value={false}>Inactive</option>

                                    </select>

                                    <FiChevronDown className="select-arrow" />

                                </div>

                            </div>

                            {/* banner actions */}
                            <div className="createBannerAction">

                                <button
                                    type="button"
                                    className="admin-modal-cancel"
                                    onClick={() => {
                                        resetBannerForm();
                                        onClose();
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="admin-modal-submit"
                                    disabled={createLoading}
                                >
                                    {createLoading ? <ButtonLoader /> : "Add Banner"}
                                </button>

                            </div>

                        </div>

                    </form>

                )}

                {/* Edit Banner Form */}
                {type === "banner" && mode === "edit" && (

                    <form className="admin-banner-form">

                        {/* Left - Current Image */}
                        <div className="banner-image-section">

                            <label className="admin-form-label">
                                Banner Image
                            </label>

                            <div className="banner-edit-image-box">

                                <img
                                    src={data?.image}
                                    alt={data?.title || "Banner"}
                                    className="banner-edit-image"
                                />

                            </div>

                            <button
                                type="button"
                                className="banner-change-image"
                            >
                                <FiUploadCloud />
                                Change Image
                            </button>

                            <p className="banner-upload-note">
                                Recommended size: 1920 × 600px
                            </p>

                        </div>

                        {/* Right - Banner Details */}
                        <div className="banner-form-details">

                            {/* Title */}
                            <div className="admin-form-group">

                                <label>
                                    Title <span>(Optional)</span>
                                </label>

                                <input
                                    type="text"
                                    defaultValue={data?.title || ""}
                                    placeholder="e.g. Delivery at ₹1"
                                />

                            </div>

                            {/* Order */}
                            <div className="admin-form-group">

                                <label>
                                    Order
                                </label>

                                <input
                                    type="number"
                                    defaultValue={data?.order ?? ""}
                                    placeholder="e.g. 1"
                                />

                            </div>

                            {/* Status */}
                            <div className="admin-form-group">

                                <label>
                                    Status
                                </label>

                                <div className="select-wrapper">

                                    <select
                                        defaultValue={
                                            data?.isActive
                                                ? "active"
                                                : "inactive"
                                        }
                                    >

                                        <option value="active">
                                            Active
                                        </option>

                                        <option value="inactive">
                                            Inactive
                                        </option>

                                    </select>

                                    <FiChevronDown className="select-arrow" />

                                </div>

                            </div>

                            <div className="createBannerAction">

                                <button
                                    type="button"
                                    className="admin-modal-cancel"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="admin-modal-submit"
                                >
                                    Save Changes
                                </button>

                            </div>

                        </div>

                    </form>

                )}

                {/* View Banner */}
                {type === "banner" && mode === "view" && (

                    <div className="view-banner-container">

                        {/* Left - Banner Image */}
                        <div className="view-banner-image-section">

                            <div className="view-banner-image-box">

                                <img
                                    src={data?.image}
                                    alt={data?.title || "Banner"}
                                    className="view-banner-image"
                                />

                            </div>

                        </div>

                        {/* Right - Banner Information */}
                        <div className="view-banner-info">

                            <h3>
                                Banner Information
                            </h3>

                            <div className="view-banner-info-list">

                                <div className="view-banner-info-item">
                                    <span>Title</span>
                                    <strong>
                                        {data?.title || "Untitled Banner"}
                                    </strong>
                                </div>

                                <div className="view-banner-info-item">
                                    <span>Order</span>
                                    <strong>
                                        {data?.order}
                                    </strong>
                                </div>

                                <div className="view-banner-info-item">
                                    <span>Status</span>

                                    <strong
                                        className={`banner-status ${data?.isActive
                                            ? "status-active"
                                            : "status-inactive"
                                            }`}
                                    >
                                        {data?.isActive ? "Active" : "Inactive"}
                                    </strong>
                                </div>

                                <div className="view-banner-info-item">
                                    <span>Created At</span>
                                    <strong>
                                        {data?.createdAt
                                            ? new Date(data.createdAt).toLocaleDateString()
                                            : "-"
                                        }
                                    </strong>
                                </div>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

}

export default AdminFormModal;