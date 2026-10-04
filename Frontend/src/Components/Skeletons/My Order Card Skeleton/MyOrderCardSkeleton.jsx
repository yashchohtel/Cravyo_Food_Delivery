import "./MyOrderCardSkeleton.css";

const MyOrderCardSkeleton = () => {
    return (
        <article className="my-order-card-skeleton">

            {/* Header */}
            <div className="skeleton-order-header">

                <div className="skeleton-restaurant-info">
                    <div className="skeleton skeleton-restaurant-image" />

                    <div className="skeleton-restaurant-text">
                        <div className="skeleton skeleton-restaurant-name" />
                        <div className="skeleton skeleton-order-date" />
                    </div>
                </div>

                <div className="skeleton-order-price">
                    <div className="skeleton skeleton-price" />
                    <div className="skeleton skeleton-payment" />
                </div>

            </div>

            {/* Progress */}
            <div className="skeleton-order-progress">

                <div className="skeleton-progress-line" />

                {[1, 2, 3, 4, 5].map((item) => (
                    <div
                        className="skeleton-progress-step"
                        key={item}
                    >
                        <div className="skeleton skeleton-progress-circle" />
                        <div className="skeleton skeleton-progress-label" />
                    </div>
                ))}

            </div>

            {/* Status Banner */}
            <div className="skeleton-status-banner">

                <div className="skeleton skeleton-status-icon" />

                <div className="skeleton-status-content">
                    <div className="skeleton skeleton-status-title" />
                    <div className="skeleton skeleton-status-description" />
                    <div className="skeleton skeleton-status-description short" />
                </div>

                <div className="skeleton skeleton-status-arrow" />

            </div>

        </article>
    );
};

export default MyOrderCardSkeleton;