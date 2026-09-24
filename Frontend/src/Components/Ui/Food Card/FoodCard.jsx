import "./FoodCard.css";

const FoodCard = ({ food }) => {

    return (
        <article className="foodCard">

            {/* Food Image */}
            <div className="foodCardImageWrapper">

                <img
                    src={food.image}
                    alt={food.name}
                    className="foodCardImage"
                    loading="lazy"
                    decoding="async"
                />

                {/* Veg / Non-Veg */}
                <span className={`foodType ${food.isVeg ? "veg" : "nonVeg"}`}>
                    {food.isVeg ? "VEG" : "NON-VEG"}
                </span>

            </div>

            {/* Food Details */}
            <div className="foodCardContent">

                {/* Food Name */}
                <h3 className="foodCardName" title={food.name}>
                    {food.name}
                </h3>

                {/* Restaurant Name */}
                <p className="foodCardShop" title={food.shopName}>
                    {food.shopName || "Restaurant"}
                </p>

                {/* Bottom Info */}
                <div className="foodCardBottom">

                    <div className="foodCardInfo">

                        <span className="foodCardRating">
                            ★ {Number(food.rating || 0).toFixed(1)}
                        </span>

                        <span className="foodCardPrice">
                            ₹{food.price}
                        </span>

                    </div>

                    <button className="foodCardAddButton">
                        ADD
                    </button>

                </div>

            </div>

        </article>
    );
};

export default FoodCard;