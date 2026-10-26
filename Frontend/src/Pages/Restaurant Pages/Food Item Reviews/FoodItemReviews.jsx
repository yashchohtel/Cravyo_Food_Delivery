import { useState } from "react";
import { FiMessageSquare, FiStar, FiX } from "react-icons/fi";
import "./FoodItemReviews.css";

const FoodItemReviews = ({ data, onClose }) => {
    const reviews = data?.reviews || [];
    const [failedProfileImages, setFailedProfileImages] = useState({});

    return (
        <section className="food-reviews-modal" role="dialog" aria-modal="true" aria-labelledby="food-reviews-title">
            <header className="food-reviews-header">
                <div>
                    <p>FOOD ITEM REVIEWS</p>
                    <h2 id="food-reviews-title">{data?.name || "Food item"}</h2>
                    <span>{reviews.length} {reviews.length === 1 ? "review" : "reviews"}</span>
                </div>
                <button type="button" onClick={onClose} aria-label="Close reviews">
                    <FiX />
                </button>
            </header>

            <div className="food-reviews-content">
                {reviews.length === 0 ? (
                    <div className="food-reviews-empty-state">
                        <FiMessageSquare aria-hidden="true" />
                        <h3>No reviews yet</h3>
                        <p>Customer reviews for this food item will appear here.</p>
                    </div>
                ) : (
                    reviews.map((review, index) => {
                        const reviewer = review.user || {};
                        const reviewerName = reviewer.fullName || "Customer";
                        const reviewKey = review._id || index;
                        const showProfileImage = reviewer.profileImage && !failedProfileImages[reviewKey];

                        return (
                            <article className="food-review-card" key={reviewKey}>
                                <div className="food-review-avatar">
                                    {showProfileImage ? (
                                        <img
                                            src={reviewer.profileImage}
                                            alt={reviewerName}
                                            onError={() => setFailedProfileImages((images) => ({
                                                ...images,
                                                [reviewKey]: true
                                            }))}
                                        />
                                    ) : (
                                        reviewerName.charAt(0).toUpperCase()
                                    )}
                                </div>

                                <div className="food-review-copy">
                                    <div className="food-review-top-row">
                                        <h3>{reviewerName}</h3>
                                        <span className="food-review-rating">
                                            <FiStar aria-hidden="true" />
                                            {review.rating || 0}
                                        </span>
                                    </div>
                                    <p>{review.comment || "No written review."}</p>
                                </div>
                            </article>
                        );
                    })
                )}
            </div>
        </section>
    );
};

export default FoodItemReviews;
