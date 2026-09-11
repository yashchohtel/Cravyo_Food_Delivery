import { FiArrowRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AdminRecentContentSkeleton from "../../Skeletons/Admin Recent Content Skeleton/AdminRecentContentSkeleton";
import "./RecentCategories.css";
import '../Recent Banners/RecentBanners.css'

const RecentCategories = () => {
    const navigate = useNavigate();

    const { categories, loading } = useSelector(
        (state) => state.foodCategories
    );

    const recentCategories = [...categories]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10);

    return (
        <div className="recent-content-card">
            <div className="recent-content-header">
                <h2>Recent Categories</h2>

                <button
                    type="button"
                    className="recent-view-all"
                    onClick={() => navigate("/admin/food-categories")}
                >
                    <span>View All</span>
                    <FiArrowRight />
                </button>
            </div>

            <div className="recent-content-body">
                {loading ? (
                    <AdminRecentContentSkeleton />
                ) : recentCategories.length === 0 ? (
                    <div className="recent-empty-state">
                        No categories available
                    </div>
                ) : (
                    <div className="recent-content-list">

                        {recentCategories.map((category) => (
                            <div
                                className="recent-content-row"
                                key={category._id}
                            >

                                <div className="categoryImageCont">

                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="recent-content-image"
                                    />

                                </div>

                                <div className="recent-content-info">
                                    <h3>{category.name}</h3>
                                    <p>
                                        {new Date(category.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                <span className="recent-content-order">
                                    #{category.order}
                                </span>

                                <span
                                    className={`recent-content-status ${category.isActive ? "active" : "inactive"}`}
                                >
                                    {category.isActive ? "Active" : "Inactive"}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentCategories;