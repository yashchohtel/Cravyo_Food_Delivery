import './MyRestaurantSkeleton.css'

const MyRestaurantSkeleton = () => {

    return (
        <div className="restaurantSkeleton">

            {/* Restaurant Overview */}
            <section className="restaurantSkeletonOverview">

                <div className="restaurantSkeletonImage shimmer"></div>

                <div className="restaurantSkeletonOverviewContent">

                    <div className="restaurantSkeletonTop">

                        <div className="restaurantSkeletonStatus shimmer"></div>

                        <div className="restaurantSkeletonActions">
                            <div className="restaurantSkeletonButton shimmer"></div>
                            <div className="restaurantSkeletonButton shimmer"></div>
                        </div>

                    </div>

                    <div className="restaurantSkeletonTitle shimmer"></div>

                    <div className="restaurantSkeletonDescription">
                        <div className="shimmer"></div>
                        <div className="shimmer"></div>
                        <div className="shimmer"></div>
                    </div>

                    <div className="restaurantSkeletonDetails">

                        <div className="restaurantSkeletonDetail">
                            <div className="restaurantSkeletonIcon shimmer"></div>

                            <div>
                                <div className="restaurantSkeletonSmall shimmer"></div>
                                <div className="restaurantSkeletonMedium shimmer"></div>
                            </div>
                        </div>

                        <div className="restaurantSkeletonDetail">
                            <div className="restaurantSkeletonIcon shimmer"></div>

                            <div>
                                <div className="restaurantSkeletonSmall shimmer"></div>
                                <div className="restaurantSkeletonMedium shimmer"></div>
                            </div>
                        </div>

                        <div className="restaurantSkeletonDetail">
                            <div className="restaurantSkeletonIcon shimmer"></div>

                            <div>
                                <div className="restaurantSkeletonSmall shimmer"></div>
                                <div className="restaurantSkeletonMedium shimmer"></div>
                            </div>
                        </div>

                    </div>

                </div>

            </section>

            {/* Information Cards */}
            <section className="restaurantSkeletonGrid">

                {/* Basic Information */}
                <div className="restaurantSkeletonCard">

                    <div className="restaurantSkeletonCardHeader">

                        <div className="restaurantSkeletonCardIcon shimmer"></div>

                        <div>
                            <div className="restaurantSkeletonCardTitle shimmer"></div>
                            <div className="restaurantSkeletonCardSubtitle shimmer"></div>
                        </div>

                    </div>

                    <div className="restaurantSkeletonRows">

                        <div className="restaurantSkeletonRow">
                            <div className="restaurantSkeletonLabel shimmer"></div>
                            <div className="restaurantSkeletonValue shimmer"></div>
                        </div>

                        <div className="restaurantSkeletonRow">
                            <div className="restaurantSkeletonLabel shimmer"></div>

                            <div className="restaurantSkeletonDescriptionValue">
                                <div className="shimmer"></div>
                                <div className="shimmer"></div>
                                <div className="shimmer"></div>
                            </div>
                        </div>

                        <div className="restaurantSkeletonRow">
                            <div className="restaurantSkeletonLabel shimmer"></div>
                            <div className="restaurantSkeletonValue shimmer"></div>
                        </div>

                    </div>

                </div>

                {/* Location Details */}
                <div className="restaurantSkeletonCard">

                    <div className="restaurantSkeletonCardHeader">

                        <div className="restaurantSkeletonCardIcon shimmer"></div>

                        <div>
                            <div className="restaurantSkeletonCardTitle shimmer"></div>
                            <div className="restaurantSkeletonCardSubtitle shimmer"></div>
                        </div>

                    </div>

                    <div className="restaurantSkeletonLocation">

                        <div className="restaurantSkeletonLocationDetails">

                            {Array.from({ length: 7 }).map((_, index) => (
                                <div
                                    className="restaurantSkeletonRow"
                                    key={index}
                                >
                                    <div className="restaurantSkeletonLabel shimmer"></div>
                                    <div className="restaurantSkeletonValue shimmer"></div>
                                </div>
                            ))}

                        </div>

                        <div className="restaurantSkeletonMap shimmer"></div>

                    </div>

                </div>

            </section>

            {/* Business Hours */}
            <section className="restaurantSkeletonBusinessHours">

                <div className="restaurantSkeletonCardHeader">

                    <div className="restaurantSkeletonCardIcon shimmer"></div>

                    <div>
                        <div className="restaurantSkeletonCardTitle shimmer"></div>
                        <div className="restaurantSkeletonCardSubtitle shimmer"></div>
                    </div>

                </div>

                <div className="restaurantSkeletonTimeContainer">

                    <div className="restaurantSkeletonTimeCard shimmer"></div>

                    <div className="restaurantSkeletonTimeCard shimmer"></div>

                    <div className="restaurantSkeletonBanner shimmer"></div>

                </div>

            </section>

        </div>
    );
}
export default MyRestaurantSkeleton