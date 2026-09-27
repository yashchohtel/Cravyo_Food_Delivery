import "./RestaurantFoodCard.css";

const RestaurantFoodCard = ({ food, onAddToCart }) => {

    return (

        <div className="restaurantFoodCard">

            <div className="restaurantFoodCardContent">

                <div className="restaurantFoodCardInfo">

                    <div className="restaurantFoodCardName">
                        <span
                            className={`restaurantFoodCardFoodType ${food.isVeg
                                ? "restaurantFoodCardVeg"
                                : "restaurantFoodCardNonVeg"
                                }`}
                        >
                            {food.isVeg ? "●" : "▲"}
                        </span>

                        <h3>{food.name}</h3>
                    </div>

                    <p className="restaurantFoodCardPrice">
                        ₹{food.price}
                    </p>

                    {food.rating > 0 && (
                        <p className="restaurantFoodCardRating">
                            ★ {food.rating} ({food.totalReviews})
                        </p>
                    )}

                    <p className="restaurantFoodCardDescription">
                        {food.description}
                    </p>

                </div>


                <div className="restaurantFoodCardImageWrapper">

                    <img
                        src={food.image}
                        alt={food.name}
                        className="restaurantFoodCardImage"
                    />

                    <button
                        className="restaurantFoodCardAddButton"
                        onClick={() => onAddToCart(food)}
                    >
                        ADD
                    </button>

                </div>

            </div>

        </div>
    );
};

export default RestaurantFoodCard;