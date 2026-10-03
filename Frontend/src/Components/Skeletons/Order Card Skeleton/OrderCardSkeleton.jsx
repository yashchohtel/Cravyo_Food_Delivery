import "./OrderCardSkeleton.css";

const OrderCardSkeleton = () => {
    return (
        <div className="order-card-skeleton">
            <div className="orderSkeletonHeader">
                <div>
                    <div className="orderSkeletonId orderSkeletonShimmer"></div>
                    <div className="orderSkeletonDate orderSkeletonShimmer"></div>
                </div>

                <div className="orderSkeletonStatus orderSkeletonShimmer"></div>
            </div>

            <div className="orderSkeletonCustomer">
                <div className="orderSkeletonAvatar orderSkeletonShimmer"></div>

                <div className="orderSkeletonCustomerInfo">
                    <div className="orderSkeletonName orderSkeletonShimmer"></div>
                    <div className="orderSkeletonContact orderSkeletonShimmer"></div>
                </div>
            </div>

            <div className="orderSkeletonFood">
                <div className="orderSkeletonFoodImage orderSkeletonShimmer"></div>
                <div className="orderSkeletonFoodImage orderSkeletonShimmer"></div>
                <div className="orderSkeletonFoodImage orderSkeletonShimmer"></div>
            </div>

            <div className="orderSkeletonInfo">
                <div className="orderSkeletonItems orderSkeletonShimmer"></div>
                <div className="orderSkeletonAmount orderSkeletonShimmer"></div>
                <div className="orderSkeletonPayment orderSkeletonShimmer"></div>
            </div>

            <div className="orderSkeletonActions">
                <div className="orderSkeletonView orderSkeletonShimmer"></div>
                <div className="orderSkeletonChange orderSkeletonShimmer"></div>
            </div>
        </div>
    );
};

export default OrderCardSkeleton;