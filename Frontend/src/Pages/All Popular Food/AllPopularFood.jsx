import { useDispatch, useSelector } from "react-redux";

import "./AllPopularFood.css";
import FoodCardSkeleton from "../../Components/Skeletons/Food Card Skeleton/FoodCardSkeleton.";
import FoodCard from "../../Components/Ui/Food Card/FoodCard";
import { getPopularFoodNearYou } from "../../features/restaurant dashboard/foodItems/foodItemThunk";
import { useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const AllPopularFood = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { popularFood, popularFoodLoading } = useSelector(
        (state) => state.foodItem
    );

    const { userCurrentLocation } = useSelector(
        (state) => state.location
    );

    // effect to load data on refresh
    useEffect(() => {

        if (popularFood?.length > 0) {
            return;
        }

        let city = userCurrentLocation?.city;

        if (!city) {
            const savedLocation = localStorage.getItem("userCurrentLocation");

            if (savedLocation) {
                const location = JSON.parse(savedLocation);
                city = location.city;
            }
        }

        if (city) {
            dispatch(getPopularFoodNearYou(city));
        }

    }, [userCurrentLocation, dispatch, popularFood]);


    return (

        <main className="allPopularFood container">

            {/* Header */}
            <div className="allPopularFoodHeader">

                <button
                    className="allPopularFoodBack"
                    onClick={() => navigate(-1)}
                >
                    <IoArrowBack />
                </button>

                <div className="allPopularFoodHeaderContent">

                    <h2>
                        Popular Food Near You
                    </h2>

                    <p>
                        Discover popular dishes from restaurants around you.
                    </p>

                </div>

            </div>


            {/* Food Grid */}
            <div className="allPopularFoodGrid">

                {popularFoodLoading ? (

                    Array.from({ length: 12 }).map((_, index) => (

                        <FoodCardSkeleton
                            key={index}
                        />

                    ))

                ) : (

                    popularFood?.map((food) => (

                        <FoodCard
                            key={food._id}
                            food={food}
                        />

                    ))

                )}

            </div>

        </main>

    );
};


export default AllPopularFood;