import './FoodCategorySlider.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsForkKnife } from "react-icons/bs";
import { categories } from '../../../utils/dummyData';

const FoodCategorySlider = (props) => {

    // destructure props
    const { onClick, handleCategoryClick, selectedCategory, hiddenCategoryItem } = props;

    return (

        <>

            <section className="topCategories container">

                <h2 className="topCategoriesTitle">
                    Top Categories
                </h2>

                <Swiper
                    slidesPerView={5}
                    spaceBetween={5}
                    className="categorySwiper"
                >

                    {categories.slice(0, 10).map((category) => (

                        <SwiperSlide key={category.name}>

                            <div
                                className={`categoryItem ${selectedCategory === category.id ? "active" : ""}`}
                                onClick={() => handleCategoryClick(category.id)}
                            >

                                <div
                                    className={`categoryImage ${selectedCategory === category.id ? "active" : ""}`}
                                >

                                    <img src={category.image} alt={category.name} />
                                </div>

                                <p className={`${selectedCategory === category.id ? "active" : ""}`} >
                                    {category.name}
                                </p>

                            </div>

                        </SwiperSlide>
                    ))}

                    {/* hiden selected category */}
                    {hiddenCategoryItem && (
                        <SwiperSlide key={hiddenCategoryItem.name}>

                            <div
                                className={`categoryItem ${selectedCategory === hiddenCategoryItem.id ? "active" : ""}`}
                                onClick={() => handleCategoryClick(hiddenCategoryItem.id)}
                            >

                                <div
                                    className={`categoryImage ${selectedCategory === hiddenCategoryItem.id ? "active" : ""}`}
                                >

                                    <img src={hiddenCategoryItem.image} alt={hiddenCategoryItem.name} />
                                </div>

                                <p className={`${selectedCategory === hiddenCategoryItem.id ? "active" : ""}`} >
                                    {hiddenCategoryItem.name}
                                </p>

                            </div>

                        </SwiperSlide>
                    )}


                    <SwiperSlide>

                        <button
                            className="seeAllCategory"
                            onClick={onClick}
                        >
                            <span className='categoryIcon'> <BsForkKnife /> </span>
                            <p>See All</p>
                        </button>

                    </SwiperSlide>

                </Swiper>

            </section>

        </>

    )

}

export default FoodCategorySlider;