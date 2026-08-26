import './AdminBannerList..css'

const AdminBannerList = ({ banners = [] }) => {

    return (

        <div className="admin-banner-list">

            {banners.map((banner) => (

                <div
                    className="admin-banner-item"
                    key={banner._id}
                >

                    {/* Banner */}
                    <div className="banner-col banner-col-banner">

                        <img
                            src={banner.image}
                            alt={banner.title || "Promotion banner"}
                            className="banner-image"
                        />

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

                        <span>
                            {banner.order}
                        </span>

                    </div>


                    {/* Status */}
                    <div className="banner-col banner-col-status">

                        <span
                            className={`banner-status ${banner.isActive
                                    ? "status-active"
                                    : "status-inactive"
                                }`}
                        >
                            {banner.isActive ? "Active" : "Inactive"}
                        </span>

                    </div>


                    {/* Created At */}
                    <div className="banner-col banner-col-created">

                        <span>
                            {new Date(banner.createdAt).toLocaleDateString()}
                        </span>

                    </div>


                    {/* Actions */}
                    <div className="banner-col banner-col-actions">

                        <button className="banner-action-btn">
                            View
                        </button>

                        <button className="banner-action-btn">
                            Edit
                        </button>

                        <button className="banner-action-btn">
                            Delete
                        </button>

                    </div>

                </div>

            ))}

        </div>

    );

};

export default AdminBannerList;