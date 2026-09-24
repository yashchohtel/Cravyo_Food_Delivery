/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import "./AllRestaurants.css";
import RestaurantCard from "../../../Components/Ui/Restaurant Card/RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import { getNearbyRestaurants } from "../../../features/restaurant dashboard/restaurant/restaurantThunk";
import { useEffect } from "react";

const AllRestaurants = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { nearbyRestaurants, nearbyRestaurantsLoading } = useSelector((state) => state.restaurant);

    const { userCurrentLocation } = useSelector((state) => state.location);

    // effect to load data on refresh
    useEffect(() => {

        let location = userCurrentLocation;

        // Redux location empty ho to localStorage se lo
        if (!location) {
            const savedLocation = localStorage.getItem("userCurrentLocation");

            if (savedLocation) {
                location = JSON.parse(savedLocation);
            }
        }

        if (!location?.city || !location?.latitude || !location?.longitude) {
            return;
        }

        dispatch(
            getNearbyRestaurants({
                city: location.city,
                latitude: location.latitude,
                longitude: location.longitude
            })
        );

    }, [dispatch, userCurrentLocation]);

    return (
        <section className="allRestaurants container">

            {/* Header */}
            <div className="allRestaurantsHeader">

                <button
                    className="allRestaurantsBack"
                    onClick={() => navigate(-1)}
                >
                    <IoArrowBack />
                </button>

                <h2>Restaurants near you</h2>

            </div>

            {/* Restaurants */}
            <div className="allRestaurantsGrid">
                {nearbyRestaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant._id}
                        restaurant={restaurant}
                    />
                ))}
            </div>

        </section>
    );
};

export default AllRestaurants;