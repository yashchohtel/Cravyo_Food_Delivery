import "./RestaurantDetailSkeleton.css";

const RestaurantDetailSkeleton = () => {
    return (
        <div className="restaurantDetailSkeleton container">

            {/* Restaurant Header */}
            <div className="restaurantDetailSkeletonHeader">

                <div className="restaurantDetailSkeletonHero shimmer">

                    <div className="restaurantDetailSkeletonBack shimmer"></div>

                    <div className="restaurantDetailSkeletonFavorite shimmer"></div>

                </div>


                <div className="restaurantDetailSkeletonInfo">

                    <div className="restaurantDetailSkeletonInfoTop">

                        <div className="restaurantDetailSkeletonName shimmer"></div>

                        <div className="restaurantDetailSkeletonRating shimmer"></div>

                    </div>


                    <div className="restaurantDetailSkeletonMeta shimmer"></div>

                    <div className="restaurantDetailSkeletonReviews shimmer"></div>


                    <div className="restaurantDetailSkeletonDivider"></div>


                    <div className="restaurantDetailSkeletonDescription">

                        <div className="shimmer"></div>

                        <div className="shimmer"></div>

                    </div>

                </div>

            </div>


            {/* Search */}
            <div className="restaurantDetailSkeletonSearch shimmer"></div>


            {/* Filters */}
            <div className="restaurantDetailSkeletonFilters">

                <div className="restaurantDetailSkeletonFilter shimmer"></div>

                <div className="restaurantDetailSkeletonFilter shimmer"></div>

                <div className="restaurantDetailSkeletonFilterWide shimmer"></div>

            </div>


            {/* Food Items */}
            <div className="restaurantDetailSkeletonFoodList">

                <div className="restaurantDetailSkeletonFoodTitle shimmer"></div>


                {Array.from({ length: 3 }).map((_, index) => (
                    <div
                        className="restaurantDetailSkeletonFood"
                        key={index}
                    >

                        <div className="restaurantDetailSkeletonFoodContent">

                            <div className="restaurantDetailSkeletonFoodName shimmer"></div>

                            <div className="restaurantDetailSkeletonFoodPrice shimmer"></div>

                            <div className="restaurantDetailSkeletonFoodRating shimmer"></div>

                            <div className="restaurantDetailSkeletonFoodDescription">

                                <div className="shimmer"></div>

                                <div className="shimmer"></div>

                            </div>

                        </div>


                        <div className="restaurantDetailSkeletonFoodImage shimmer"></div>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default RestaurantDetailSkeleton;