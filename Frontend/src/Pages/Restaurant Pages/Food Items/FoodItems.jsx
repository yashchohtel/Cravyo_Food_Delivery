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

  // get food item data from redux store
  const foodItems = useSelector((state) => state.foodItem.foodItems);

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
            />
          </div>

          <div className="searchFilterRight">

            <div className="admin-filter-box">

              <select>
                <option value="">Food Type</option>
                <option value="all">All</option>
                <option value="veg">Veg</option>
                <option value="nonVeg">Non-Veg</option>
              </select>

              <FiChevronDown className="admin-filter-icon" />

            </div>

            <div className="admin-filter-box">
              <select>
                <option value="">Category</option>
                <option value="pizza">Pizza</option>
                <option value="burger">Burger</option>
                <option value="biryani">Biryani</option>
                <option value="chinese">Chinese</option>
              </select>
              <FiChevronDown className="admin-filter-icon" />
            </div>

            <div className="admin-filter-box">
              <select>
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

        {/* food item card */}
        {getFoodItemsLoading ? (
          <div className="food-items-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <FoodItemCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="food-items-grid">
            {foodItems.map((item) => (
              <FoodItemCard
                key={item._id}
                item={item}
                onView={(item) => {
                  console.log("View:", item);
                }}
                onReviews={(item) => {
                  console.log("Reviews:", item);
                }}
                onEdit={(item) => {
                  console.log("Edit:", item);
                }}
                onDelete={(item) => {
                  console.log("Delete:", item);
                }}
              />
            ))}
          </div>

        )}

      </div>
    </>

  )

}

export default FoodItems