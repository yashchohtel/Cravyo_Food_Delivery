import { useNavigate } from "react-router-dom";
import "./RestaurantCard.css";

const RestaurantCard = ({ restaurant }) => {

    const navigate = useNavigate();

    // open restaurent funciton to navitate to restaruent
    const openRestaurant = () => {
        navigate("/restaurant/" + restaurant._id);
    };

    return (

        <div

            className="restaurantCard"
            onClick={openRestaurant}
            onKeyDown={(event) => {
                if (event.key === "Enter") openRestaurant()
            }}
            role="link"
            tabIndex={0}
        >
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

