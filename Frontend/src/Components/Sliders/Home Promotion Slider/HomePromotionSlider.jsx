import './HomePromotionSlider.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const HomePromotionSlider = () => {

    return (

        <>

            {/* slide container */}
            <div className="slideContainer container">

                <Swiper>
                    <SwiperSlide>Banner 1</SwiperSlide>
                    <SwiperSlide>Banner 2</SwiperSlide>
                    <SwiperSlide>Banner 3</SwiperSlide>
                </Swiper>

            </div>
        </>

    )

}

export default HomePromotionSlider;