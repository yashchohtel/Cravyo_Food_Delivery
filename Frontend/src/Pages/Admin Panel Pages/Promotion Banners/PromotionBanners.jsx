/* eslint-disable no-unused-vars */
import { useState } from 'react';
import AdminSearchFilter from '../../../Components/Ui/Admin Search Filter/AdminSearchFilter';
import AdminStatsCard from '../../../Components/Ui/Admin Stats Card/AdminStatsCard';
import './PromotionBanners.css'
import { FiImage, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useSelector } from 'react-redux';

const PromotionBanners = () => {

    // get data from the promotion store
    const { banners, loading, error } = useSelector((state) => state.promotionBanners);

    console.log(banners);
    
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
    return (

        <>
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
                searchValue={search}
                onSearchChange={setSearch}
                placeholder="Search banners..."
                filterValue={status}
                onFilterChange={setStatus}
                filterOptions={filterOptions}
                sortOptions={sortOptions}
            />

        </>

    )

}

export default PromotionBanners;