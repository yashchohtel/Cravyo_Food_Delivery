import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { getShopById } from "../../../features/restaurant dashboard/restaurant/restaurantThunk";
import "./RestaurantDetail.css";

const RestaurantDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { restaurantId } = useParams();

    // getting data form redux store
    const { selectedRestaurant, selectedRestaurantLoading, selectedRestaurantError } = useSelector((state) => state.restaurant);

    // calling api
    useEffect(() => {
        if (restaurantId) dispatch(getShopById(restaurantId))
    }, [dispatch, restaurantId]);

    // get selectd restaurent dat
    const restaurant = selectedRestaurant?._id === restaurantId ? selectedRestaurant : null;

    useEffect(() => {
        if (restaurant) {
            console.log("Restaurant data with food items:", restaurant);
        }
    }, [restaurant]);

    return (
        <main className="restaurantDetailPage container">
            <div className="restaurantDetailHeader">
                <button
                    className="restaurantDetailBack"
                    onClick={() => navigate(-1)}
                    aria-label="Go back"
                >
                    <IoArrowBack />
                </button>
                <h1>Restaurant Details</h1>
            </div>

            <section className="restaurantDetailPlaceholder">
                {selectedRestaurantLoading ? (
                    <p>Loading restaurant details...</p>
                ) : selectedRestaurantError ? (
                    <p>{selectedRestaurantError}</p>
                ) : restaurant ? (
                    <>
                        <h2>{restaurant.name}</h2>
                        <p>
                            {restaurant.foodItems?.length || 0} food items fetched.
                            Full restaurant data is logged in the browser console.
                        </p>
                    </>
                ) : (
                    <p>Loading restaurant details...</p>
                )}
            </section>
        </main>
    );
};

export default RestaurantDetail;