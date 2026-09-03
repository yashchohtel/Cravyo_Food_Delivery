/* eslint-disable no-unused-vars */
import { useState } from 'react';
import AdminSearchFilter from '../../../Components/Ui/Admin Search Filter/AdminSearchFilter';
import AdminStatsCard from '../../../Components/Ui/Admin Stats Card/AdminStatsCard';
import './PromotionBanners.css'
import { FiImage, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useSelector } from 'react-redux';
import AdminBannerList from '../../../Components/Ui/Admin Banner List/AdminBannerList';
import AdminFormModal from '../../../Components/Ui/Admin Form Modal/AdminFormModal';

const PromotionBanners = () => {

    // get data from the promotion store
    const { banners, loading, error } = useSelector((state) => state.promotionBanners);

    /* -------------------------------------- */

    // Search state
    const [search, setSearch] = useState("");

    // Status filter state
    const [status, setStatus] = useState("all");

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
                    value={12}
                    variant="total"
                />

                <AdminStatsCard
                    icon={<FiCheckCircle />}
                    title="Active Banners"
                    value={8}
                    variant="active"
                />

                <AdminStatsCard
                    icon={<FiXCircle />}
                    title="Inactive Banners"
                    value={4}
                    variant="inactive"
                />

            </div>

            {/* Search & Filter */}
            <AdminSearchFilter
                placeholder="Search banners..."   // place holder value

                filterOptions={filterOptions}    // filter options for banners
                sortOptions={sortOptions}        // sort options for banners

                searchValue={search}
                onSearchChange={setSearch}

                filterValue={status}
                onFilterChange={setStatus}

                onAdd={() => openModal("banner", "add")} // open add banner modal on click

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
            <AdminBannerList
                banners={banners}
            />

        </>

    )

}

export default PromotionBanners;