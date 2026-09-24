import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";

import "./RestaurantsNearYou.css";
import RestaurantCard from "../Restaurant Card/RestaurantCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RestaurantsNearYou = () => {

    const navigate = useNavigate();
    
    const { nearbyRestaurants } = useSelector((state) => state.restaurant);

    return (
        <section className="restaurantsNearYou container">

            <div className="restaurantsNearYouHeader">
                <h2>Restaurants near you</h2>

                <button
                    className="seeAllRestaurants"
                    onClick={() => navigate("/restaurants")}
                >
                    See all
                </button>
            </div>

            <Swiper
                modules={[FreeMode]}
                freeMode={true}
                spaceBetween={1.2 * 10}
                slidesPerView={1.4}
                className="restaurantSwiper"
            >
                {nearbyRestaurants.map((restaurant) => (
                    <SwiperSlide key={restaurant._id}>
                        <RestaurantCard restaurant={restaurant} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default RestaurantsNearYou;