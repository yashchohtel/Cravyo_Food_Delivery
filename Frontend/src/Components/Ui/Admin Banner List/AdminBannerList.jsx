import './AdminBannerList..css'
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

const AdminBannerList = (props) => {

    // destructure props
    const { banners = [], openModal } = props;

    return (

        <div className="admin-banner-list">

            {banners.map((banner) => (

                <div
                    className="admin-banner-item"
                    key={banner._id}
                >

                    {/* Banner */}
                    <div className="banner-col banner-col-banner">

                        <div className="banner-image-wrapper">

                            <img
                                src={banner.image}
                                alt={banner.title || "Promotion banner"}
                                className="banner-image"
                            />

                        </div>

                    </div>


                    {/* Title */}
                    <div className="banner-col banner-col-title">

                        <span
                            className="banner-title"
                            title={banner.title}
                        >
                            {banner.title || "Untitled Banner"}
                        </span>

                    </div>


                    {/* Order */}
                    <div className="banner-col banner-col-order">

                        <span className="banner-order">
                            {banner.order}
                        </span>

                    </div>


                    {/* Status */}
                    <div className="banner-col banner-col-status">

                        <span
                            className={`banner-status ${banner.isActive ? "status-active" : "status-inactive"}`}
                        >
                            {banner.isActive ? "Active" : "Inactive"}
                        </span>

                    </div>

                    {/* Created At */}
                    <div className="banner-col banner-col-created">

                        <span className='banner-createdAt'>
                            {new Date(banner.createdAt).toLocaleDateString()}
                        </span>

                    </div>


                    {/* Actions */}
                    <div className="banner-col banner-col-actions">

                        <button className="banner-action-btn view-action">
                            <FiEye />
                            <span className="action-tooltip">
                                View Banner
                            </span>
                        </button>

                        <button
                            className="banner-action-btn edit-action"
                            onClick={() => openModal("banner", "edit", banner)}
                        >
                            <FiEdit2 />
                            <span className="action-tooltip">
                                Edit Banner
                            </span>
                        </button>

                        <button className="banner-action-btn delete-action">
                            <FiTrash2 />
                            <span className="action-tooltip">
                                Delete Banner
                            </span>
                        </button>

                    </div>

                </div>

            ))}

        </div>

    )

};

export default AdminBannerList;