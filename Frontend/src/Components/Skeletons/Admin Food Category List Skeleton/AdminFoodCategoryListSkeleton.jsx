import './AdminFoodCategoryListSkeleton.css'

const AdminFoodCategoryListSkeleton = () => {

    return (

        <>
            <div className="categoryLoadingRow">

                {/* Category Image */}
                <div className="category-col category-col-image">
                    <div className="categoryLoadingImage categoryLoadingShimmer"></div>
                </div>

                {/* Name */}
                <div className="category-col category-col-name">
                    <div className="categoryLoadingName categoryLoadingShimmer"></div>
                </div>

                {/* Order */}
                <div className="category-col category-col-order">
                    <div className="categoryLoadingOrder categoryLoadingShimmer"></div>
                </div>

                {/* Top Category */}
                <div className="category-col category-col-top">
                    <div className="categoryLoadingTop categoryLoadingShimmer"></div>
                </div>

                {/* Status */}
                <div className="category-col category-col-status">
                    <div className="categoryLoadingStatus categoryLoadingShimmer"></div>
                </div>

                {/* Created At */}
                <div className="category-col category-col-created">
                    <div className="categoryLoadingDate categoryLoadingShimmer"></div>
                </div>

                {/* Actions */}
                <div className="category-col category-col-actions categoryLoadingActionsCol">
                    <div className="categoryLoadingActionIcon categoryLoadingShimmer"></div>
                    <div className="categoryLoadingActionIcon categoryLoadingShimmer"></div>
                    <div className="categoryLoadingActionIcon categoryLoadingShimmer"></div>
                </div>

            </div>
        </>

    )

}

export default AdminFoodCategoryListSkeleton