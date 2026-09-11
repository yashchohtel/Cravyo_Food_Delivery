import "./HomePromotionSlider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useSelector } from "react-redux";

import "swiper/css";
import "swiper/css/pagination";

const HomePromotionSlider = () => {

    // getting data from the state
    const { banners } = useSelector((state) => state.promotionBanners);

    const activeBanners = [...banners].filter((banner) => banner.isActive).sort((a, b) => a.order - b.order);
    
    return (

        <div className="promotionSlideCont container">

            <section className="promotion-slider-wrapper">

                <Swiper
                    modules={[Autoplay, Pagination]}
                    slidesPerView={1}
                    spaceBetween={16}
                    loop={activeBanners.length > 1}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    className="promotion-slider"
                >
                    {activeBanners.map((banner) => (
                        <SwiperSlide key={banner._id}>
                            <div className="promotion-slide">
                                <img
                                    src={banner.image}
                                    alt={banner.title}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </section>

        </div>
    );
};

export default HomePromotionSlider;