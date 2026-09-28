/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowBack, IoChevronForward, IoSearchOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { getShopById } from "../../../features/restaurant dashboard/restaurant/restaurantThunk";
import "./RestaurantDetail.css";
import RestaurantDetailSkeleton from "../../../Components/Skeletons/Restaurant Detail Skeleton/RestaurantDetailSkeleton";
import RestaurantFoodCard from "../Restaurant Food Card/RestaurantFoodCard";
import useRestaurantDetailHook from "../../../hooks/Restaruant Owner Hooks/useRestaurantDetailHook";
import AddToCartBottomSheet from "../../../Components/Ui/Add To Cart Bottom Sheet/AddToCartBottomSheet";
import useAddToCartHook from "../../../hooks/Order Placing Hooks/useAddToCartHook";
import CartBottomBar from "../../../Components/Ui/Cart Bottom Bar/CartBottomBar";

const RestaurantDetail = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { restaurantId } = useParams();

    // getting data form redux store
    const { selectedRestaurant, selectedRestaurantLoading, selectedRestaurantError } = useSelector((state) => state.restaurant);

    // calling api
    useEffect(() => {

        // restaurant already store mein hai
        if (selectedRestaurant?._id === restaurantId) {
            return;
        }

        // restaurant store mein nahi hai
        if (restaurantId) {
            dispatch(getShopById(restaurantId));
        }

    }, [dispatch, restaurantId, selectedRestaurant?._id]);

    // get selectd restaurent data
    const restaurant = selectedRestaurant?._id === restaurantId ? selectedRestaurant : null;

    // getting restaurent detail data form hook
    const {
        search,
        setSearch,
        foodType,
        setFoodType,
        priceSort,
        setPriceSort,
        filteredFoodItems
    } = useRestaurantDetailHook(restaurant);

    // getting add to card hook data
    const {
        selectedFood,
        isAddToCartOpen,
        showRestaurantAlert,
        openAddToCart,
        handleAddToCart,
        clearCartAndAdd,
        closeAddToCart
    } = useAddToCartHook(restaurant);

    // show skelton if loading
    if (selectedRestaurantLoading || !restaurant) {
        return <RestaurantDetailSkeleton />;
    }

    return (

        <>

            {/* add to cart bottom sheet */}
            {isAddToCartOpen && (
                <AddToCartBottomSheet
                    food={selectedFood}
                    onClose={closeAddToCart}
                    onAddToCart={handleAddToCart}
                    showRestaurantAlert={showRestaurantAlert}
                    onClearCartAndAdd={clearCartAndAdd}
                />
            )}

            {/* restaurant detail container */}
            <div className="restaurantDetail container">

                {/* Restaurant Image */}
                <div className="restaurantDetailHeader">

                    <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="restaurantDetailHeaderImage"
                    />

                    <button
                        className="restaurantDetailBackButton"
                        onClick={() => window.history.back()}
                    >
                        <IoArrowBack />
                    </button>


                    {/* Restaurant Info - Image ke andar */}
                    <div className="restaurantDetailInfo">

                        <div className="restaurantDetailInfoTop">

                            <div className="restaurantDetailBasicInfo">

                                <h1 className="restaurantDetailName">
                                    {restaurant.name}
                                </h1>

                                <div className="restaurantDetailMeta">
                                    <span>{restaurant.deliveryTime}</span>

                                    <span className="restaurantDetailDot">|</span>

                                    <span>{restaurant.address?.city}</span>
                                </div>

                            </div>


                            <div className="restaurantDetailRatingBox">
                                <span className="restaurantDetailRating">
                                    {restaurant.rating}
                                </span>

                                <span className="restaurantDetailStar">
                                    ★
                                </span>
                            </div>

                        </div>

                        <div className="restaurantDetailReviews">
                            {restaurant.totalReviews}+ ratings
                        </div>

                    </div>

                </div>

                {/* restauratn deial page searchand filter */}
                <div className="restaurantDetailFilters">

                    <div className="restaurantDetailSearch">
                        <IoSearchOutline />

                        <input
                            type="text"
                            placeholder="Search for dishes"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>


                    <div className="restaurantDetailFilterButtons">

                        {/* all */}
                        <button
                            className={`restaurantDetailFilterButton ${foodType === "all" ? "active" : ""}`}
                            onClick={() => setFoodType("all")}
                        >
                            All
                        </button>

                        {/* veg */}
                        <button
                            className={`restaurantDetailFilterButton ${foodType === "veg" ? "active" : ""}`}
                            onClick={() => setFoodType("veg")}
                        >
                            <span className="restaurantDetailVegIcon">●</span>
                            Veg
                        </button>

                        {/* non veg */}
                        <button
                            className={`restaurantDetailFilterButton ${foodType === "nonVeg" ? "active" : ""}`}
                            onClick={() => setFoodType("nonVeg")}
                        >
                            <span className="restaurantDetailNonVegIcon">▲</span>
                            Non-Veg
                        </button>

                        {/* high to low - low to high */}
                        <button
                            className={`restaurantDetailFilterButton restaurantDetailPriceFilter ${priceSort ? "active" : ""}`}
                            onClick={() => {
                                setPriceSort((prev) => {
                                    if (prev === null) return "lowToHigh";
                                    if (prev === "lowToHigh") return "highToLow";
                                    return null;
                                });
                            }}
                        >
                            Price:{" "}
                            {priceSort === "highToLow"
                                ? "High to Low"
                                : "Low to High"}

                            <IoChevronForward />
                        </button>

                    </div>

                </div>

                {/* restaurant all food */}
                <div className="restaurentFoods">

                    {/* Restaurant has no food */}
                    {restaurant?.foodItems?.length === 0 ? (

                        <h3 className="noFood">
                            No Food Available!
                        </h3>

                    ) : filteredFoodItems.length === 0 ? (

                        <h3 className="noFood">
                            No Food Found!
                        </h3>

                    ) : (

                        filteredFoodItems.map((food) => (
                            <RestaurantFoodCard
                                key={food._id}
                                food={food}
                                onAddToCart={openAddToCart}
                            />
                        ))

                    )}

                </div>

            </div>

            <CartBottomBar
                onViewCart={() => navigate("/cart")}
            />

        </>

    );
};

export default RestaurantDetail;