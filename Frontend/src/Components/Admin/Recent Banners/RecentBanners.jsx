import { FiArrowRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./RecentBanners.css";
import AdminRecentContentSkeleton from "../../Skeletons/Admin Recent Content Skeleton/AdminRecentContentSkeleton";

const RecentBanners = () => {

    const navigate = useNavigate();

    const { banners, loading } = useSelector(
        (state) => state.promotionBanners
    );

    const recentBanners = [...banners].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);

    return (

        <div className="recent-content-card">

            <div className="recent-content-header">

                <h2>Recent Banners</h2>

                <button
                    type="button"
                    className="recent-view-all"
                    onClick={() => navigate("/admin/banners")}
                >
                    <span>View All</span>
                    <FiArrowRight />
                </button>

            </div>

            <div className="recent-content-body">
                {loading ? (
                    <AdminRecentContentSkeleton />
                ) : recentBanners.length === 0 ? (
                    <div className="recent-empty-state">
                        No banners available
                    </div>
                ) : (
                    <div className="recent-content-list">

                        {recentBanners.map((banner) => (
                            <div
                                className="recent-content-row"
                                key={banner._id}
                            >

                                <div className="bannerImageCont">

                                    <img
                                        src={banner.image}
                                        alt={banner.title}
                                        className="recent-content-image"
                                    />

                                </div>

                                <div className="recent-content-info">
                                    <h3>{banner.title}</h3>
                                    <p>
                                        {new Date(
                                            banner.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>

                                <span className="recent-content-order">
                                    #{banner.order}
                                </span>

                                <span
                                    className={`recent-content-status ${banner.isActive
                                        ? "active"
                                        : "inactive"
                                        }`}
                                >
                                    {banner.isActive
                                        ? "Active"
                                        : "Inactive"}
                                </span>
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentBanners;