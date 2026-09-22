import "./FoodItemCardSkeleton.css";

const FoodItemCardSkeleton = () => {
    return (
        <div className="food-item-card-skeleton">

            {/* Image */}
            <div className="food-item-skeleton-image food-item-skeleton-shimmer"></div>

            {/* Content */}
            <div className="food-item-skeleton-content">

                {/* Category / food type */}
                <div className="food-item-skeleton-top">
                    <div className="food-item-skeleton-category food-item-skeleton-shimmer"></div>
                    <div className="food-item-skeleton-type food-item-skeleton-shimmer"></div>
                </div>

                {/* Name */}
                <div className="food-item-skeleton-name food-item-skeleton-shimmer"></div>

                {/* Description */}
                <div className="food-item-skeleton-description food-item-skeleton-shimmer"></div>
                <div className="food-item-skeleton-description short food-item-skeleton-shimmer"></div>

                {/* Price + rating */}
                <div className="food-item-skeleton-bottom">

                    <div className="food-item-skeleton-price food-item-skeleton-shimmer"></div>

                    <div className="food-item-skeleton-rating food-item-skeleton-shimmer"></div>

                </div>

                {/* Actions */}
                <div className="food-item-skeleton-actions">

                    <div className="food-item-skeleton-action food-item-skeleton-shimmer"></div>
                    <div className="food-item-skeleton-action food-item-skeleton-shimmer"></div>
                    <div className="food-item-skeleton-action food-item-skeleton-shimmer"></div>

                </div>

            </div>

        </div>
    );
};

export default FoodItemCardSkeleton;