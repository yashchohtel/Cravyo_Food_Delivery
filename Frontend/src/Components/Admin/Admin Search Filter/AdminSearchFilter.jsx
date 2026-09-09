import "./AdminSearchFilter.css";
import { FiSearch, FiRefreshCw, FiChevronDown, FiPlus } from "react-icons/fi";

const AdminSearchFilter = (props) => {

    // destructure props
    const {
        placeholder = "Search...",
        filterOptions = [],
        sortOptions = [],

        searchValue,
        onSearchChange,

        filterValue,
        onFilterChange,

        sortValue,
        onSortChange,

        onAdd,

        showSort = true,
        showRefresh = true,

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

                {/* Sort */}
                {showSort && (

                    <div className="admin-filter-box">

                        <select
                            value={sortValue}
                            onChange={(e) => onSortChange(e.target.value)}
                        >
                            <option value="" disabled>
                                Sort By
                            </option>

                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                            
                        </select>

                        <FiChevronDown className="admin-filter-icon" />

                    </div>

                )}

                {/* Refresh */}
                {showRefresh && (

                    <button
                        type="button"
                        className="admin-refresh-btn"
                    >

                        <FiRefreshCw />

                        <span>
                            Refresh
                        </span>

                    </button>

                )}

                {/* add banner button */}
                <button
                    type="button"
                    className="admin-add-btn"
                    onClick={onAdd}
                >
                    <FiPlus />

                    <span> Add Banner </span>

                </button>

            </div>

        </div>

    );

};

export default AdminSearchFilter;