import "./AdminSearchFilter.css";
import { FiSearch, FiRefreshCw, FiChevronDown, FiPlus, FiRotateCcw } from "react-icons/fi";

const AdminSearchFilter = (props) => {

    // destructure props
    const {

        entityType,                   // Entity type 

        placeholder = "Search...",    // Search input ka placeholder
        filterOptions = [],           // Filter dropdown options
        sortOptions = [],             // Sort dropdown options
        typeFilterOptions = [],       // Type filter dropdown options

        searchValue,                  // Current search value
        onSearchChange,               // Search value change handler

        filterValue,                  // Current filter value
        onFilterChange,               // Filter value change handler

        sortValue,                    // Current sort value
        onSortChange,                 // Sort value change handler

        typeFilterValue,              // Current type filter value
        onTypeFilterChange,           // Type filter value change handler

        onReset,                      // Reset search, filter, and sort handler 
        onRefresh,                    // Refresh data handler
        onAdd,                        // Add item handler

        showFilter = true,            // Show/hide filter
        showSort = true,              // Show/hide sort
        showRefresh = true,           // Show/hide refresh
        showReset = true,             // Show/hide reset
        showTypeFilter = false,       // Show/hide type filter

    } = props;

    return (

        <div className="admin-search-filter">

            {/* search filter left */}
            <div className="searchFilterLeft">

                {/* Search */}
                <div className="admin-search-box">

                    <FiSearch className="admin-search-icon" />

                    <input
                        type="text"
                        placeholder={placeholder}
                        value={searchValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />

                </div>

            </div>

            {/* search filter right */}
            <div className="searchFilterRight">

                {/* Filter */}
                {showFilter && (
                    <div className="admin-filter-box">

                        <select
                            value={filterValue}
                            onChange={(e) => onFilterChange(e.target.value)}
                        >
                            {filterOptions.map((option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        <FiChevronDown className="admin-filter-icon" />

                    </div>
                )}

                {/* Type Filter */}
                {showTypeFilter && (
                    <div className="admin-filter-box">

                        <select
                            value={typeFilterValue}
                            onChange={(e) => onTypeFilterChange(e.target.value)}
                        >
                            {typeFilterOptions.map((option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        <FiChevronDown className="admin-filter-icon" />

                    </div>
                )}

                {/* Sort */}
                {showSort && (

                    <div className="admin-filter-box">

                        <select
                            value={sortValue}
                            onChange={(e) => onSortChange(e.target.value)}
                        >

                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}

                        </select>

                        <FiChevronDown className="admin-filter-icon" />

                    </div>

                )}

                {/* reset */}
                {showReset && (

                    <button
                        type="button"
                        className="admin-refresh-btn"
                        onClick={onReset}
                    >

                        <FiRotateCcw />

                        <span>
                            reset
                        </span>

                    </button>

                )}

                {/* Refresh */}
                {showRefresh && (

                    <button
                        type="button"
                        className="admin-refresh-btn"
                        onClick={onRefresh}
                    >

                        <FiRefreshCw />

                        <span>
                            Refresh
                        </span>

                    </button>

                )}

                {/* add food category button */}
                {entityType === "food-category" && (
                    <button
                        type="button"
                        className="admin-add-btn"
                        onClick={onAdd}
                    >
                        <FiPlus />
                        <span>Add Category</span>
                    </button>
                )}

                {/* add promotion banner button */}
                {entityType === "promotion-banner" && (
                    <button
                        type="button"
                        className="admin-add-btn"
                        onClick={onAdd}
                    >
                        <FiPlus />
                        <span>Add Banner</span>
                    </button>
                )}

            </div>

        </div>

    );

};

export default AdminSearchFilter;