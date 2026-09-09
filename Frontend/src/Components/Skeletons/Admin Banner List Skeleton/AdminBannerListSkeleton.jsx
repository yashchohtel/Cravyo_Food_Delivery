import './AdminBannerListSkeleton.css'

const AdminBannerListSkeleton = () => {

    return (

        <>
            <div className="bannerLoadingRow">

                {/* Banner Image */}
                <div className="bannerLoadingImage bannerLoadingShimmer"></div>

                {/* Title */}
                <div className="bannerLoadingCol bannerLoadingTitleCol">
                    <div className="bannerLoadingTitle bannerLoadingShimmer"></div>
                </div>

                {/* Order */}
                <div className="bannerLoadingCol bannerLoadingOrderCol">
                    <div className="bannerLoadingOrder bannerLoadingShimmer"></div>
                </div>

                {/* Status */}
                <div className="bannerLoadingCol bannerLoadingStatusCol">
                    <div className="bannerLoadingStatus bannerLoadingShimmer"></div>
                </div>

                {/* Created At */}
                <div className="bannerLoadingCol bannerLoadingDateCol">
                    <div className="bannerLoadingDate bannerLoadingShimmer"></div>
                </div>

                {/* Actions */}
                <div className="bannerLoadingCol bannerLoadingActionsCol">
                    <div className="bannerLoadingActionIcon bannerLoadingShimmer"></div>
                    <div className="bannerLoadingActionIcon bannerLoadingShimmer"></div>
                    <div className="bannerLoadingActionIcon bannerLoadingShimmer"></div>
                </div>

            </div>
        </>

    )

}

export default AdminBannerListSkeleton;