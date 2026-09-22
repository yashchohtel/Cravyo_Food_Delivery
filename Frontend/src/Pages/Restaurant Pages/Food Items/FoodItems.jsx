import { useState } from 'react';
import AdminStatsCard from '../../../Components/Admin/Admin Stats Card/AdminStatsCard';
import FoodItemCard from '../Food Item Card/FoodItemCard';
import './FoodItems.css'
import { FiCheckCircle, FiChevronDown, FiGrid, FiPlus, FiSearch, FiStar, FiXCircle } from 'react-icons/fi';
import RestaurantOwnerFormModal from '../Restaurant Owner Form Modal/RestaurantOwnerFormModal';

const FoodItems = () => {

  // dummy food item data
  const totalFoodItems = 0;
  const availableFoodItems = 20;
  const unavailableFoodItems = 4;
  const averageRating = 4.5;

  const foodItems = [
    {
      id: 1,
      name: "Classic Cheese Pizza",
      image: "/pizza (1).jpg",
      description: "Classic cheese pizza topped with rich mozzarella and a perfectly baked golden crust.",
      price: 99,
      category: "Pizza",
      isVeg: true,
      rating: 4.5,
      totalReviews: 128,
      isAvailable: true,
      totalOrders: 245,
    },

    {
      id: 2,
      name: "Golden Corn Pizza",
      image: "/pizza (2).jpg",
      description: "Creamy cheese pizza loaded with sweet golden corn for a delicious and satisfying bite.",
      price: 89,
      category: "Pizza",
      isVeg: true,
      rating: 4.3,
      totalReviews: 96,
      isAvailable: true,
      totalOrders: 187,
    },

    {
      id: 3,
      name: "Pepperoni Pizza",
      image: "/pizza (3).jpg",
      description: "Loaded with spicy pepperoni, melted cheese and a delicious tomato sauce on a crispy crust.",
      price: 149,
      category: "Pizza",
      isVeg: false,
      rating: 4.6,
      totalReviews: 154,
      isAvailable: true,
      totalOrders: 312,
    },

    {
      id: 4,
      name: "Paneer Tikka Pizza",
      image: "/pizza (4).jpg",
      description: "A delicious combination of juicy paneer tikka, capsicum and melted cheese on a fresh crust.",
      price: 129,
      category: "Pizza",
      isVeg: true,
      rating: 4.4,
      totalReviews: 113,
      isAvailable: true,
      totalOrders: 228,
    },

    {
      id: 5,
      name: "Veg Loaded Pizza",
      image: "/pizza (5).jpg",
      description: "A loaded vegetarian pizza packed with colourful vegetables, cheese and flavourful seasoning.",
      price: 139,
      category: "Pizza",
      isVeg: true,
      rating: 4.5,
      totalReviews: 141,
      isAvailable: true,
      totalOrders: 267,
    },

    {
      id: 6,
      name: "Chicken Loaded Pizza",
      image: "/pizza (6).jpg",
      description: "A hearty chicken pizza loaded with juicy chicken toppings, herbs and plenty of melted cheese.",
      price: 169,
      category: "Pizza",
      isVeg: false,
      rating: 4.6,
      totalReviews: 178,
      isAvailable: true,
      totalOrders: 351,
    },

    {
      id: 7,
      name: "Fresh Tomato Pizza",
      image: "/pizza (7).jpg",
      description: "Fresh and flavourful pizza topped with juicy tomato slices, herbs and creamy mozzarella.",
      price: 109,
      category: "Pizza",
      isVeg: true,
      rating: 4.2,
      totalReviews: 82,
      isAvailable: true,
      totalOrders: 156,
    },

    {
      id: 8,
      name: "Pepper Barbecue Chicken Pizza",
      image: "/pizza (8).jpg",
      description: "Smoky barbecue chicken with seasoned toppings and melted cheese on a freshly baked crust.",
      price: 179,
      category: "Pizza",
      isVeg: false,
      rating: 4.7,
      totalReviews: 192,
      isAvailable: true,
      totalOrders: 389,
    },

    {
      id: 9,
      name: "Mushroom & Cheese Pizza",
      image: "/pizza (9).jpg",
      description: "Creamy cheesy pizza topped with seasoned mushrooms for a rich and comforting flavour.",
      price: 119,
      category: "Pizza",
      isVeg: true,
      rating: 4.3,
      totalReviews: 91,
      isAvailable: true,
      totalOrders: 174,
    },

    {
      id: 10,
      name: "Paneer & Capsicum Pizza",
      image: "/pizza (10).jpg",
      description: "Soft paneer and crunchy capsicum combined with cheese and herbs for a delicious vegetarian pizza.",
      price: 129,
      category: "Pizza",
      isVeg: true,
      rating: 4.4,
      totalReviews: 105,
      isAvailable: true,
      totalOrders: 211,
    },

    {
      id: 11,
      name: "Onion Pizza",
      image: "/pizza (11).jpg",
      description: "Simple and delicious pizza topped generously with crunchy onions and melted cheese.",
      price: 69,
      category: "Pizza",
      isVeg: true,
      rating: 4.1,
      totalReviews: 74,
      isAvailable: true,
      totalOrders: 143,
    },
  ];


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
        {foodItems.length === 0 && (
          <div className="food-items-empty-state">

            <img
              src="/noFood.png"
              alt="No food items"
              className="food-items-empty-image"
            />

            <h2>Food items will appear here</h2>

            <p>Add your first food item to get started.</p>

            <button className="food-items-add-btn" type="button">
              <FiPlus />
              Add Food Item
            </button>

          </div>
        )}

        {/* food item card */}
        <div className="food-items-grid">
          {foodItems.map((item) => (
            <FoodItemCard
              key={item.id}
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

      </div>
    </>

  )

}

export default FoodItems