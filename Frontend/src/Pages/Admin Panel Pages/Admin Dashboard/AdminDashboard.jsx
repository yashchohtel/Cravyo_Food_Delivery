import { useSelector } from 'react-redux';
import './AdminDashboard.css'
import AdminStatsCard from '../../../Components/Admin/Admin Stats Card/AdminStatsCard';
import { FiCheckCircle, FiGrid, FiImage } from 'react-icons/fi';
import RecentBanners from '../../../Components/Admin/Recent Banners/RecentBanners';
import RecentCategories from '../../../Components/Admin/Recent Categories/RecentCategories';

const AdminDashboard = () => {

    // getting states from the store
    const { banners } = useSelector((state) => state.promotionBanners);
    const { categories } = useSelector((state) => state.foodCategories);

    return (

        <>

            <div className="dashboard-page">

                {/* dashboard states grid */}
                <div className="dashboard-stats-grid">
                    <AdminStatsCard
                        icon={<FiImage />}
                        title="Total Banners"
                        value={banners.length}
                        variant="total"
                        link="/admin/banners"
                    />

                    <AdminStatsCard
                        icon={<FiCheckCircle />}
                        title="Active Banners"
                        value={banners.filter((banner) => banner.isActive).length}
                        variant="active"
                        link="/admin/banners"
                    />

                    <AdminStatsCard
                        icon={<FiGrid />}
                        title="Total Categories"
                        value={categories.length}
                        variant="total"
                        link="/admin/food-categories"
                    />

                    <AdminStatsCard
                        icon={<FiCheckCircle />}
                        title="Active Categories"
                        value={categories.filter((category) => category.isActive).length}
                        variant="active"
                        link="/admin/food-categories"
                    />
                </div>

                {/* recent banners and categories */}
                <div className="dashboard-recent-grid">
                    <RecentBanners />
                    <RecentCategories />
                </div>

            </div>

        </>

    )

}

export default AdminDashboard