import { useState } from 'react';
import AdminStatsCard from '../../../Components/Admin/Admin Stats Card/AdminStatsCard';
import FoodItemCard from '../Food Item Card/FoodItemCard';
import './FoodItems.css'
import { FiCheckCircle, FiChevronDown, FiGrid, FiPlus, FiSearch, FiStar, FiXCircle } from 'react-icons/fi';
import RestaurantOwnerFormModal from '../Restaurant Owner Form Modal/RestaurantOwnerFormModal';
import { useSelector } from 'react-redux';
import FoodItemCardSkeleton from '../Food Item Card Skeleton/FoodItemCardSkeleton';

const FoodItems = () => {

  const { getLoading: getFoodItemsLoading } = useSelector((state) => state.foodItem);

  const restaurant = useSelector((state) => state.restaurant.restaurant);

  const foodItems = restaurant?.foodItems || [];

  /* -------------------------------------- */

  // total food item
  const totalFoodItems = foodItems.length;

  // available items
  const availableFoodItems = foodItems.filter((item) => item.isAvailable).length;

  // un available food items
  const unavailableFoodItems = foodItems.filter((item) => !item.isAvailable).length;

  // average food rating
  const averageRating = foodItems.length ? (
    foodItems.reduce((sum, item) => sum + (item.rating || 0), 0) / foodItems.length
  ).toFixed(1) : 0;

  /* -------------------------------------- */

  // modal state
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    mode: null,
    data: null,
  });

  // open modal
  const openModal = (type, mode, data = null) => {
    setModal({
      isOpen: true,
      type,
      mode,
      data,
    });
  };

  // close modal
  const closeModal = () => {
    setModal({
      isOpen: false,
      type: null,
      mode: null,
      data: null,
    });
  };

  /* -------------------------------------- */

  // state related to fearch filter feater
  const [search, setSearch] = useState("");
  const [foodType, setFoodType] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState("");

  const filteredFoodItems = foodItems.filter((item) => {

    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());

    const matchesFoodType = foodType === "" || foodType === "all" || (foodType === "veg" && item.isVeg) || (foodType === "nonVeg" && !item.isVeg);

    const matchesCategory = category === "" || item.category.toLowerCase() === category.toLowerCase();

    const matchesAvailability =
      availability === "" ||
      (availability === "available" && item.isAvailable) ||
      (availability === "unavailable" && !item.isAvailable);

    return (
      matchesSearch &&
      matchesFoodType &&
      matchesCategory &&
      matchesAvailability
    );

  });

  return (

    <>
      <div className="foodItemsPage">

        {/* add banner component */}
        <RestaurantOwnerFormModal
          isOpen={modal.isOpen}
          type={modal.type}
          mode={modal.mode}
          data={modal.data}
          onClose={closeModal}
        />

        {/* food items stats */}
        <div className="food-items-stats-grid">

          <AdminStatsCard
            icon={<FiGrid />}
            title="Total Food Items"
            value={totalFoodItems}
            variant="total"
          />

          <AdminStatsCard
            icon={<FiCheckCircle />}
            title="Available Items"
            value={availableFoodItems}
            variant="active"
          />

          <AdminStatsCard
            icon={<FiXCircle />}
            title="Unavailable Items"
            value={unavailableFoodItems}
            variant="inactive"
          />

          <AdminStatsCard
            icon={<FiStar />}
            title="Average Rating"
            value={averageRating}
            variant="top"
          />

        </div>

        {/* search filter add bar */}
        <div className="admin-search-filter">

          <div className="admin-search-box">
            <FiSearch className="admin-search-icon" />
            <input
              type="text"
              placeholder="Search food items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="searchFilterRight">

            <div className="admin-filter-box">

              <select
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
              >
                <option value="">Food Type</option>
                <option value="all">All</option>
                <option value="veg">Veg</option>
                <option value="nonVeg">Non-Veg</option>
              </select>

              <FiChevronDown className="admin-filter-icon" />

            </div>

            <div className="admin-filter-box">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Category</option>
                <option>Pizza</option>
                <option>Burger</option>
                <option>Biryani</option>
                <option>Chinese</option>
                <option>North Indian</option>
                <option>South Indian</option>
                <option>Rolls</option>
                <option>Momos</option>
                <option>Sandwich</option>
                <option>Pasta</option>
                <option>Dosa</option>
                <option>Thali</option>
                <option>Healthy Food</option>
                <option>Desserts</option>
                <option>Cakes</option>
                <option>Ice Cream</option>
                <option>Beverages</option>
                <option>Breakfast</option>
                <option>Fast Food</option>
                <option>Street Food</option>
              </select>
              <FiChevronDown className="admin-filter-icon" />
            </div>

            <div className="admin-filter-box">
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              >
                <option value="">Availability</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
              <FiChevronDown className="admin-filter-icon" />
            </div>

            <button
              className="admin-add-btn" type="button"
              onClick={() => openModal("addFoodItem", "add")}
            >
              <FiPlus />
              Add Food Item
            </button>

          </div>

        </div>

        {/* empty state */}
        {foodItems.length === 0 && !getFoodItemsLoading && (
          <div className="food-items-empty-state">

            <img
              src="/noFood.png"
              alt="No food items"
              className="food-items-empty-image"
            />

            <h2>Food items will appear here</h2>

            <p>Add your first food item to get started.</p>

            <button
              className="food-items-add-btn" type="button"
              onClick={() => openModal("addFoodItem", "add")}
            >
              <FiPlus />
              Add Food Item
            </button>

          </div>
        )}

        {/* no searched result */}
        {foodItems.length !== 0 && filteredFoodItems.length === 0 && !getFoodItemsLoading && (
          <h2 className='noSearch'>No Searched Item Found.</h2>
        )}  

        {/* food item card */}
        {getFoodItemsLoading ?

          (

            <div className="food-items-grid">
              {Array.from({ length: 6 }).map((_, index) => (
                <FoodItemCardSkeleton key={index} />
              ))}
            </div>

          )

          :

          (
            <div className="food-items-grid">

              {filteredFoodItems.map((item) => (

                <FoodItemCard
                  key={item._id}
                  item={item}

                  // open eidt form
                  onEdit={(item) => openModal("addFoodItem", "edit", item)}

                  // open view modal
                  onView={(item) => openModal("viewFoodItem", "view", item)}

                  // deleteion food item
                  onDelete={(item) => openModal("deleteFoodItem", "delete", item)}

                // onReviews={(item) => { console.log("Reviews:", item) }}

                />

              ))}

            </div>

          )}

      </div>

    </>

  )

}

export default FoodItems