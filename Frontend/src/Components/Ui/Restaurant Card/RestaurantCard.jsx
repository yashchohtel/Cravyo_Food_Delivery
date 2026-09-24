import "./RestaurantCard.css";

const RestaurantCard = ({ restaurant }) => {
    return (
        <div className="restaurantCard">
            <div className="restaurantImage">
                <img src={restaurant.image} alt={restaurant.name} />

                {restaurant.isOpen && (
                    <span className="restaurantOpenBadge">
                        Open
                    </span>
                )}
            </div>

            <div className="restaurantContent">
                <h3>{restaurant.name}</h3>

                <p className="restaurantDescription">
                    {restaurant.description}
                </p>

                <div className="restaurantInfo">
                    <span className="restaurantRating">
                        ★ {restaurant.rating}
                    </span>

                    <span>{restaurant.deliveryTime}</span>

                    <span>{restaurant.distance}</span>
                </div>

                <p className="restaurantLocation">
                    {restaurant.address.city}, {restaurant.address.state}
                </p>
            </div>
        </div>
    );
};

export default RestaurantCard;