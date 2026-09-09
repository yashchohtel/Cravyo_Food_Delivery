import { useEffect, useRef } from "react";
import { FiChevronDown, FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";
import ButtonLoader from "../../Loaders/ButtonLoader/ButtonLoader";
import usePromotionBanner from "../../../hooks/usePromotionBanner";

const AdminBannerForm = ({ mode, data, onClose }) => {

    // banner hook
    const {
        
        // state and functions related to create banner
        createBanner,
        bannerForm,
        bannerErrors,
        handleBannerChange,
        handleImageChange,
        resetBannerForm,

        // state and functions related to edit banner
        editBannerForm,
        initEditBannerForm,
        handleEditBannerChange,
        editBannerErrors,
        handleEditImageChange,
        updateBanner,

        // function to delete banner
        deleteBanner,

    } = usePromotionBanner();

    /* -------------------------------------- */

    // redux state
    const {
        createLoading,
        updateLoading,
        deleteLoading,
        banners
    } = useSelector((state) => state.promotionBanners);

    /* -------------------------------------- */

    // file input reference
    const fileInputRef = useRef(null);

    // trigger file input
    const triggerFileSelect = () => {
        fileInputRef.current.click();
    };

    /* -------------------------------------- */

    // initialize edit form
    useEffect(() => {

        if (mode === "edit" && data) {
            initEditBannerForm(data);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, data]);

    return (

        <>

            {/* Add Banner Form */}
            {mode === "add" && (

                <form
                    className="admin-banner-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        createBanner(onClose);
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


                        {/* Order */}
                        <div className="admin-form-group">

                            <label>
                                Order
                            </label>

                            <p className="banner-order-display">
                                This will be banner #{banners.length + 1}
                            </p>

                        </div>


                        {/* Status */}
                        <div className="admin-form-group">

                            <label>
                                Status
                            </label>

                            <div className="select-wrapper">

                                <select
                                    name="isActive"
                                    value={bannerForm.isActive}
                                    onChange={handleBannerChange}
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
                        <div className="bannerActions">

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
                                {createLoading
                                    ? <ButtonLoader />
                                    : "Add Banner"
                                }
                            </button>

                        </div>

                    </div>

                </form>

            )}


            {/* Edit Banner Form */}
            {mode === "edit" && (

                <form
                    className="admin-banner-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        updateBanner(data._id, onClose);
                    }}
                >

                    {/* Left - Current Image */}
                    <div className="banner-image-section">

                        <label className="admin-form-label">
                            Banner Image
                        </label>

                        <div className="banner-edit-image-box">

                            <img
                                src={editBannerForm.imagePreview}
                                alt={editBannerForm.title || "Banner"}
                                className="banner-edit-image"
                            />

                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/png, image/jpeg, image/webp"
                                style={{ display: "none" }}
                                onChange={handleEditImageChange}
                            />

                        </div>


                        <button
                            type="button"
                            className="banner-change-image"
                            onClick={triggerFileSelect}
                        >
                            <FiUploadCloud />
                            Change Image
                        </button>


                        <p className="banner-upload-note">
                            Recommended size: 1920 × 600px
                        </p>


                        {editBannerErrors.image && (

                            <p className="error-text">
                                {editBannerErrors.image}
                            </p>

                        )}

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
                                value={editBannerForm.title}
                                onChange={handleEditBannerChange}
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
                                name="order"
                                value={editBannerForm.order}
                                onChange={handleEditBannerChange}
                                placeholder="e.g. 1"
                            />

                            {editBannerErrors.order && (

                                <p className="error-text">
                                    {editBannerErrors.order}
                                </p>

                            )}

                            {!editBannerErrors.order &&
                                Number(editBannerForm.order) !== data?.order && (

                                    <p className="info-text">
                                        Other banners order will adjust automatically
                                    </p>

                                )}

                        </div>


                        {/* Status */}
                        <div className="admin-form-group">

                            <label>
                                Status
                            </label>

                            <div className="select-wrapper">

                                <select
                                    name="isActive"
                                    value={editBannerForm.isActive}
                                    onChange={handleEditBannerChange}
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
                        <div className="bannerActions">

                            <button
                                type="button"
                                className="admin-modal-cancel"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="admin-modal-submit"
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


            {/* View Banner */}
            {mode === "view" && (

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

                                <span>
                                    Title
                                </span>

                                <strong>
                                    {data?.title || "Untitled Banner"}
                                </strong>

                            </div>


                            <div className="view-banner-info-item">

                                <span>
                                    Order
                                </span>

                                <strong>
                                    {data?.order}
                                </strong>

                            </div>


                            <div className="view-banner-info-item">

                                <span>
                                    Status
                                </span>

                                <strong
                                    className={`banner-status ${data?.isActive
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


                            <div className="view-banner-info-item">

                                <span>
                                    Created At
                                </span>

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


            {/* Delete Banner */}
            {mode === "delete" && (

                <div className="delete-confirm-box">

                    <p className="delete-confirm-text">
                        Are you sure you want to delete this banner?
                    </p>

                    <div className="deleteBannerAction">

                        <button
                            type="button"
                            className="admin-modal-cancel"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="admin-modal-delete"
                            onClick={() => deleteBanner(data._id, onClose)}
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

    )

}

export default AdminBannerForm