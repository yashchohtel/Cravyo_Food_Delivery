import './AdminBannerListSkeleton.css'

const AdminBannerListSkeleton = () => {

    return (

        <>
            <div className="bannerLoadingRow">

                {/* Banner Image */}
                <div className="banner-col banner-col-banner">
                    <div className="bannerLoadingImage bannerLoadingShimmer"></div>
                </div>

                {/* Title */}
                <div className="banner-col banner-col-title">
                    <div className="bannerLoadingTitle bannerLoadingShimmer"></div>
                </div>

                {/* Order */}
                <div className="banner-col banner-col-order">
                    <div className="bannerLoadingOrder bannerLoadingShimmer"></div>
                </div>

                {/* Status */}
                <div className="banner-col banner-col-status">
                    <div className="bannerLoadingStatus bannerLoadingShimmer"></div>
                </div>

                {/* Created At */}
                <div className="banner-col banner-col-created">
                    <div className="bannerLoadingDate bannerLoadingShimmer"></div>
                </div>

                {/* Actions */}
                <div className="banner-col banner-col-actions bannerLoadingActionsCol">
                    <div className="bannerLoadingActionIcon bannerLoadingShimmer"></div>
                    <div className="bannerLoadingActionIcon bannerLoadingShimmer"></div>
                    <div className="bannerLoadingActionIcon bannerLoadingShimmer"></div>
                </div>

            </div>
        </>

    )

}

export default AdminBannerListSkeleton;