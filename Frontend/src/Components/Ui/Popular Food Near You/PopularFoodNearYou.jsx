import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";

import "./PopularFoodNearYou.css";

import FoodCard from "../Food Card/FoodCard";
import FoodCardSkeleton from "../../Skeletons/Food Card Skeleton/FoodCardSkeleton.";

import { useSelector } from "react-redux";


const PopularFoodNearYou = () => {

    const navigate = useNavigate();

    const {
        popularFood,
        popularFoodLoading
    } = useSelector((state) => state.foodItem);


    return (

        <section className="popularFoodNearYou container">

            {/* Section Header */}
            <div className="popularFoodNearYouHeader">

                <h2>
                    Popular Food Near You
                </h2>

                <button
                    className="popularFoodSeeAll"
                    onClick={() => navigate("/popular-food")}
                >
                    See All
                </button>

            </div>


            {/* Food Slider */}
            <Swiper
                modules={[FreeMode]}
                freeMode={true}
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={3.2}
                className="popularFoodSlider"

                breakpoints={{

                    /* Small mobile */
                    0: {
                        slidesPerView: 2.5,
                        spaceBetween: 9
                    },

                    /* 400px phone */
                    400: {
                        slidesPerView: 2.8,
                        spaceBetween: 10
                    },

                    /* Large mobile */
                    480: {
                        slidesPerView: 2.9,
                        spaceBetween: 10
                    },

                    /* Tablet */
                    768: {
                        slidesPerView: 4.2,
                        spaceBetween: 12
                    },

                    /* Laptop */
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 14
                    },

                    /* Desktop */
                    1280: {
                        slidesPerView: 5.5,
                        spaceBetween: 16
                    }
                }}
            >

                {popularFoodLoading ? (

                    Array.from({ length: 8 }).map((_, index) => (

                        <SwiperSlide key={index}>

                            <FoodCardSkeleton />

                        </SwiperSlide>

                    ))

                ) : (

                    popularFood?.slice(0, 10).map((food) => (

                        <SwiperSlide key={food._id}>

                            <FoodCard
                                food={food}
                            />

                        </SwiperSlide>

                    ))

                )}

            </Swiper>

        </section>

    );
};


export default PopularFoodNearYou;