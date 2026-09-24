import "./FoodCardSkeleton.css";

const FoodCardSkeleton = () => {

    return (
        <div className="foodCardSkeleton">

            <div className="foodCardSkeletonImage shimmer"></div>

            <div className="foodCardSkeletonContent">

                <div className="foodCardSkeletonName shimmer"></div>

                <div className="foodCardSkeletonShop shimmer"></div>

                <div className="foodCardSkeletonBottom">

                    <div className="foodCardSkeletonRating shimmer"></div>

                    <div className="foodCardSkeletonPrice shimmer"></div>

                    <div className="foodCardSkeletonButton shimmer"></div>

                </div>

            </div>

        </div>
    );
};

export default FoodCardSkeleton;