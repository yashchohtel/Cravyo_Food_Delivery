import "./AdminFoodCategoryList.css";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

const AdminFoodCategoryList = (props) => {

    // destructure props
    const {
        categories = [],
        search = "",
        openModal
    } = props;

    return (

        <div className="admin-category-list">

            {categories.length === 0 ? (

                <div className="no-category-message">
                    {
                        search ? "Searched category not found" : "No categories yet"
                    }
                </div>

            ) : (

                categories.map((category) => (

                    <div
                        className="admin-category-item"
                        key={category._id}
                    >

                        {/* Category */}
                        <div className="category-col category-col-image">

                            <div className="category-image-wrapper">

                                <img
                                    src={category.image}
                                    alt={category.name || "Food category"}
                                    className="category-image"
                                />

                            </div>

                        </div>


                        {/* Name */}
                        <div className="category-col category-col-name">

                            <span
                                className="category-name"
                                title={category.name}
                            >
                                {category.name || "Untitled Category"}
                            </span>

                        </div>


                        {/* Order */}
                        <div className="category-col category-col-order">

                            <span className="category-order">
                                {category.order}
                            </span>

                        </div>


                        {/* Top Category */}
                        <div className="category-col category-col-top">

                            <span
                                className={`category-top-status ${category.isTopCategory
                                    ? "top-category"
                                    : "normal-category"
                                    }`}
                            >
                                {category.isTopCategory
                                    ? "Top"
                                    : "Normal"
                                }
                            </span>

                        </div>


                        {/* Status */}
                        <div className="category-col category-col-status">

                            <span
                                className={`category-status ${category.isActive
                                    ? "status-active"
                                    : "status-inactive"
                                    }`}
                            >
                                {category.isActive
                                    ? "Active"
                                    : "Inactive"
                                }
                            </span>

                        </div>


                        {/* Created At */}
                        <div className="category-col category-col-created">

                            <span className="category-createdAt">
                                {new Date(
                                    category.createdAt
                                ).toLocaleDateString()}
                            </span>

                        </div>


                        {/* Actions */}
                        <div className="category-col category-col-actions">

                            <button
                                type="button"
                                className="category-action-btn view-action"
                                onClick={() =>
                                    openModal("category", "view", category)
                                }
                            >
                                <FiEye />

                                <span className="action-tooltip">
                                    View Category
                                </span>
                            </button>

                            <button
                                type="button"
                                className="category-action-btn edit-action"
                                onClick={() =>
                                    openModal("category", "edit", category)
                                }
                            >
                                <FiEdit2 />

                                <span className="action-tooltip">
                                    Edit Category
                                </span>
                            </button>

                            <button
                                type="button"
                                className="category-action-btn delete-action"
                                onClick={() =>
                                    openModal("category", "delete", category)
                                }
                            >
                                <FiTrash2 />

                                <span className="action-tooltip">
                                    Delete Category
                                </span>
                            </button>

                        </div>

                    </div>

                ))

            )}

        </div>

    );

};

export default AdminFoodCategoryList;