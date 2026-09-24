import "./RestaurantDetailSkeleton.css";

const RestaurantDetailSkeleton = () => {
    return (
        <section className="restaurantDetailSkeleton" role="status" aria-label="Loading restaurant details">
            <div className="restaurantDetailSkeletonHero">
                <div className="restaurantDetailSkeletonBack restaurantDetailSkeletonShimmer"></div>
            </div>

            <div className="restaurantDetailSkeletonCard">
                <div className="restaurantDetailSkeletonTop">
                    <div className="restaurantDetailSkeletonLogo restaurantDetailSkeletonShimmer"></div>
                    <div className="restaurantDetailSkeletonHeading">
                        <div className="restaurantDetailSkeletonTitle restaurantDetailSkeletonShimmer"></div>
                        <div className="restaurantDetailSkeletonRating restaurantDetailSkeletonShimmer"></div>
                        <div className="restaurantDetailSkeletonType restaurantDetailSkeletonShimmer"></div>
                    </div>
                    <div className="restaurantDetailSkeletonStatus restaurantDetailSkeletonShimmer"></div>
                </div>

                <div className="restaurantDetailSkeletonDescription restaurantDetailSkeletonShimmer"></div>

                <div className="restaurantDetailSkeletonStats">
                    <div className="restaurantDetailSkeletonStat">
                        <div className="restaurantDetailSkeletonLabel restaurantDetailSkeletonShimmer"></div>
                        <div className="restaurantDetailSkeletonValue restaurantDetailSkeletonShimmer"></div>
                    </div>
                    <div className="restaurantDetailSkeletonStat">
                        <div className="restaurantDetailSkeletonLabel restaurantDetailSkeletonShimmer"></div>
                        <div className="restaurantDetailSkeletonValue restaurantDetailSkeletonShimmer"></div>
                    </div>
                    <div className="restaurantDetailSkeletonStat">
                        <div className="restaurantDetailSkeletonLabel restaurantDetailSkeletonShimmer"></div>
                        <div className="restaurantDetailSkeletonValue restaurantDetailSkeletonShimmer"></div>
                    </div>
                </div>

                <div className="restaurantDetailSkeletonAddress restaurantDetailSkeletonShimmer"></div>
            </div>
        </section>
    );
};

export default RestaurantDetailSkeleton;
