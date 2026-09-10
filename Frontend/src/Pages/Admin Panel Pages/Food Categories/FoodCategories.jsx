import { useSelector } from 'react-redux';
import AdminStatsCard from '../../../Components/Admin/Admin Stats Card/AdminStatsCard'
import './FoodCategories.css'
import { FiCheckCircle, FiGrid, FiStar, FiXCircle } from 'react-icons/fi';
import AdminSearchFilter from '../../../Components/Admin/Admin Search Filter/AdminSearchFilter';
import AdminFoodCategoryList from '../../../Components/Admin/Admin Food Category List/AdminFoodCategoryList';
import AdminFoodCategoryListSkeleton from '../../../Components/Skeletons/Admin Food Category List Skeleton/AdminFoodCategoryListSkeleton';
import useAdminFoodCategory from '../../../hooks/useAdminFoodCategory';
import { useState } from 'react';
import AdminFormModal from '../../../Components/Admin/Admin Form Modal/AdminFormModal';

const FoodCategories = () => {

    // get data from food categories store
    const { categories, loading } = useSelector((state) => state.foodCategories);

    /* -------------------------------------- */

    // get state and functions from the usePromotionBanner hook
    const {
        search,
        setSearch,

        status,
        setStatus,

        categoryType,
        setCategoryType,

        sort,
        setSort,

        sortedCategories,
        resetSearchFilterSort,

        refreshCategories

    } = useAdminFoodCategory();

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

    // Category type filter options
    const typeFilterOptions = [
        {
            label: "All Type",
            value: "all"
        },
        {
            label: "Top",
            value: "top"
        },
        {
            label: "Normal",
            value: "normal"
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

    const [modal, setModal] = useState({
        isOpen: false,
        type: null,
        mode: null,
        data: null,
    });

    const openModal = (type, mode, data = null) => {
        setModal({
            isOpen: true,
            type,
            mode,
            data,
        });
    };

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

            {/* Admin form Modal */}
            <AdminFormModal
                isOpen={modal.isOpen}
                type={modal.type}
                mode={modal.mode}
                data={modal.data}
                onClose={closeModal}
            />

            {/* food category stats card */}
            <div className="foodCategories-stats-grid">

                <AdminStatsCard
                    icon={<FiGrid />}
                    title="Total Categories"
                    value={categories.length}
                    variant="total"
                />

                <AdminStatsCard
                    icon={<FiStar />}
                    title="Top Categories"
                    value={categories.filter(category => category.isTop).length}
                    variant="top"
                />

                <AdminStatsCard
                    icon={<FiCheckCircle />}
                    title="Active Categories"
                    value={categories.filter(category => category.isActive).length}
                    variant="active"
                />

                <AdminStatsCard
                    icon={<FiXCircle />}
                    title="Inactive Categories"
                    value={categories.filter(category => !category.isActive).length}
                    variant="inactive"
                />

            </div>

            {/* Search & Filter */}
            <AdminSearchFilter

                entityType="food-category"                // Entity type for the search filter (used for conditional rendering of add button)

                placeholder="Search categories..."        // Search input ka placeholder
                searchValue={search}                      // Current search value
                onSearchChange={setSearch}                // Search value change handler

                filterOptions={filterOptions}             // Status filter options
                filterValue={status}                      // Current status filter value
                onFilterChange={setStatus}                // Status filter change handler

                typeFilterOptions={typeFilterOptions}     // Category type filter options
                typeFilterValue={categoryType}            // Current category type filter value
                onTypeFilterChange={setCategoryType}      // Category type filter change handler

                sortOptions={sortOptions}                 // Sort dropdown options
                sortValue={sort}                          // Current sort value
                onSortChange={setSort}                    // Sort value change handler

                showFilter={true}                         // Show/hide status filter
                showTypeFilter={true}                     // Show/hide category type filter
                showSort={true}                           // Show/hide sort
                showRefresh={true}                        // Show/hide refresh
                showReset={true}                          // Show/hide reset

                onReset={resetSearchFilterSort}           // Reset search, filters, and sort
                onRefresh={refreshCategories}             // Refresh categories

                onAdd={() => openModal("category", "add")} // Add banner handler

            />

            {/* category list heading */}
            <div className="category-list">

                {/* List Header */}
                <div className="category-list-header">

                    <div className="category-col category-col-image">
                        Category
                    </div>

                    <div className="category-col category-col-name">
                        Name
                    </div>

                    <div className="category-col category-col-order">
                        Order
                    </div>

                    <div className="category-col category-col-top">
                        Top Category
                    </div>

                    <div className="category-col category-col-status">
                        Status
                    </div>

                    <div className="category-col category-col-created">
                        Created At
                    </div>

                    <div className="category-col category-col-actions">
                        Actions
                    </div>

                </div>

            </div>

            {/* Category List */}
            {loading ? (

                <div className="bannerLoadingWrapper">
                    {Array(5).fill(0).map((_, i) => (
                        <AdminFoodCategoryListSkeleton key={i} />
                    ))}
                </div>

            ) : (

                <AdminFoodCategoryList
                    categories={sortedCategories}
                    search={search}
                    openModal={openModal}
                />

            )}

        </>

    )

}

export default FoodCategories