import './HomePromotionSlider.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
const HomePromotionSlider = () => {

    const images = [
        "/heroBanner (1).png",
        "/heroBanner (2).png",
        "/heroBanner (3).png",
        "/heroBanner (4).png",
        "/heroBanner (5).png",
    ];

    return (

        <>

            {/* slide container */}
            <div className="promotionSlideCont container">

                <section className="promotion-slider-wrapper">

                    <Swiper
                        modules={[Autoplay, Pagination]}
                        slidesPerView={1}
                        spaceBetween={16}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        className="promotion-slider"
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <div className="promotion-slide">
                                    <img
                                        src={image}
                                        alt={`Promotion ${index + 1}`}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </section>

            </div>

        </>

    )

}

export default HomePromotionSlider;