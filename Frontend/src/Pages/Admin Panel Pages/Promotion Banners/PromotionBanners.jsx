import { useState } from 'react';
import AdminSearchFilter from '../../../Components/Admin/Admin Search Filter/AdminSearchFilter';
import AdminStatsCard from '../../../Components/Admin/Admin Stats Card/AdminStatsCard';
import './PromotionBanners.css'
import { FiImage, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useSelector } from 'react-redux';
import AdminBannerList from '../../../Components/Admin/Admin Banner List/AdminBannerList';
import AdminFormModal from '../../../Components/Admin/Admin Form Modal/AdminFormModal';
import AdminBannerListSkeleton from '../../../Components/Skeletons/Admin Banner List Skeleton/AdminBannerListSkeleton';
import usePromotionBanner from '../../../hooks/usePromotionBanner';

const PromotionBanners = () => {

    // get data from the promotion store
    const { banners, loading } = useSelector((state) => state.promotionBanners);

    /* -------------------------------------- */

    // get state and functions from the usePromotionBanner hook
    const { search, setSearch, status, setStatus, sort, setSort, sortedBanners, resetSearchFilterSort, refreshBanners} = usePromotionBanner();

    /* -------------------------------------- */

    // Status filter options
    const filterOptions = [
        {
            label: "All Status",
            value: "all"
        },
        {
            label: "Active",
            value: "active"
        },
        {
            label: "Inactive",
            value: "inactive"
        }
    ];

    // Sort options
    const sortOptions = [
        {
            label: "Latest First",
            value: "latest"
        },
        {
            label: "Oldest First",
            value: "oldest"
        },
        {
            label: "Order",
            value: "order"
        }
    ];

    /* -------------------------------------- */

    // state to manage add, edit, view banner modal
    const [modal, setModal] = useState({
        isOpen: false,
        type: null,
        mode: null,
        data: null,
    });

    // function to open add, edit, view banner modal
    const openModal = (type, mode, data = null) => {

        setModal({
            isOpen: true,
            type,
            mode,
            data,
        });

    };

    // function to close add, edit, view banner modal
    const closeModal = () => {

        setModal({
            isOpen: false,
            type: null,
            mode: null,
            data: null,
        });

    };

    return (

        <>

            {/* add banner component */}
            <AdminFormModal
                isOpen={modal.isOpen}
                type={modal.type}
                mode={modal.mode}
                data={modal.data}
                onClose={closeModal}
            />

            {/* banner stats card */}
            <div className="banner-stats-grid">

                <AdminStatsCard
                    icon={<FiImage />}
                    title="Total Banners"
                    value={banners.length}
                    variant="total"
                />

                <AdminStatsCard
                    icon={<FiCheckCircle />}
                    title="Active Banners"
                    value={banners.filter((banner) => banner.isActive).length}
                    variant="active"
                />

                <AdminStatsCard
                    icon={<FiXCircle />}
                    title="Inactive Banners"
                    value={banners.filter((banner) => !banner.isActive).length}
                    variant="inactive"
                />

            </div>

            {/* Search & Filter */}
            <AdminSearchFilter
                placeholder="Search banners..." // Search input ka placeholder
                searchValue={search}            // Current search value
                onSearchChange={setSearch}      // Search value change handler

                filterOptions={filterOptions}   // Filter dropdown options
                filterValue={status}            // Current filter value
                onFilterChange={setStatus}      // Filter value change handler

                sortOptions={sortOptions}       // Sort dropdown options
                sortValue={sort}                // Current sort value
                onSortChange={setSort}          // Sort value change handler

                showFilter={true}                // Show/hide filter
                showSort={true}                  // Show/hide sort
                showRefresh={true}               // Show/hide refresh
                showReset={true}                 // Show/hide reset

                onReset={resetSearchFilterSort}  // Reset search, filter, and sort to default values
                onRefresh={refreshBanners}       // Refresh banners from server (used after update/create/delete to sync with backend)

                onAdd={() => openModal("banner", "add")} // Add banner handler
            />

            {/* banner list heading */}
            <div className="banner-list">

                {/* List Header */}
                <div className="banner-list-header">

                    <div className="banner-col banner-col-banner">
                        Banner
                    </div>

                    <div className="banner-col banner-col-title">
                        Title
                    </div>

                    <div className="banner-col banner-col-order">
                        Order
                    </div>

                    <div className="banner-col banner-col-status">
                        Status
                    </div>

                    <div className="banner-col banner-col-created">
                        Created At
                    </div>

                    <div className="banner-col banner-col-actions">
                        Actions
                    </div>

                </div>

            </div>

            {/* Banner List */}
            {loading ? (

                <div className="bannerLoadingWrapper">
                    {Array(5).fill(0).map((_, i) => (
                        <AdminBannerListSkeleton key={i} />
                    ))}
                </div>

            ) : (

                <AdminBannerList
                    banners={sortedBanners}
                    openModal={openModal}
                    search={search}
                />

            )}

        </>

    )

}

export default PromotionBanners;