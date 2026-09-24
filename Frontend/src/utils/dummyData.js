export const savedAddresses = [
  {
    id: "saved-1",

    // Display
    addressTitle: "Home",
    address: "Vijay Nagar, Scheme No. 54, Indore, Madhya Pradesh 452010",

    // Coordinates
    latitude: 22.7533,
    longitude: 75.8937,

    // Location Details
    city: "Indore",
    state: "Madhya Pradesh",
    country: "India",
    postcode: "452010",

    // Metadata
    category: "residential",
    resultType: "street",

    // Saved Address Fields
    addressType: "home",
    selected: true,
  },

  {
    id: "saved-2",

    // Display
    addressTitle: "Office",
    address: "LIG Square, A.B. Road, Indore, Madhya Pradesh 452008",

    // Coordinates
    latitude: 22.7196,
    longitude: 75.8577,

    // Location Details
    city: "Indore",
    state: "Madhya Pradesh",
    country: "India",
    postcode: "452008",

    // Metadata
    category: "commercial",
    resultType: "street",

    // Saved Address Fields
    addressType: "work",
    selected: false,
  },
];

export const restaurantData = [
  {
    _id: "shop001",
    name: "Pizza Wala",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    imagePublicId: "cravyo/shops/pizza-wala",
    description: "Freshly baked pizzas with a delicious desi twist.",
    openingTime: "09:00",
    closingTime: "22:00",
    foodType: "all",
    owner: "owner001",
    foodItems: [],
    address: {
      street: "Jaistambh Chowk Pali Road",
      city: "Shahdol",
      state: "Madhya Pradesh",
      pincode: "484001",
      mapLocation: "Sohagpur, Shahdol, Madhya Pradesh, 484001",
      latitude: 23.314139,
      longitude: 81.350249,
    },
    isOpen: true,

    // Temporary UI data
    rating: 4.3,
    deliveryTime: "30–40 min",
    distance: "1.2 km",
  },

  {
    _id: "shop002",
    name: "Spice Villa",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9",
    imagePublicId: "cravyo/shops/spice-villa",
    description: "Delicious North Indian food made fresh every day.",
    openingTime: "10:00",
    closingTime: "23:00",
    foodType: "all",
    owner: "owner002",
    foodItems: [],
    address: {
      street: "Main Market Road",
      city: "Shahdol",
      state: "Madhya Pradesh",
      pincode: "484001",
      mapLocation: "Shahdol, Madhya Pradesh",
      latitude: 23.3001,
      longitude: 81.3562,
    },
    isOpen: true,

    rating: 4.1,
    deliveryTime: "25–35 min",
    distance: "2.5 km",
  },

  {
    _id: "shop003",
    name: "Desi Zaika",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f",
    imagePublicId: "cravyo/shops/desi-zaika",
    description: "Authentic Indian flavours and homestyle meals.",
    openingTime: "11:00",
    closingTime: "22:30",
    foodType: "all",
    owner: "owner003",
    foodItems: [],
    address: {
      street: "Station Road",
      city: "Shahdol",
      state: "Madhya Pradesh",
      pincode: "484001",
      mapLocation: "Shahdol, Madhya Pradesh",
      latitude: 23.305,
      longitude: 81.348,
    },
    isOpen: true,

    rating: 4.2,
    deliveryTime: "20–30 min",
    distance: "1.8 km",
  },

  {
    _id: "shop004",
    name: "Biryani House",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
    imagePublicId: "cravyo/shops/biryani-house",
    description: "Aromatic biryani and delicious Mughlai dishes.",
    openingTime: "12:00",
    closingTime: "23:00",
    foodType: "all",
    owner: "owner004",
    foodItems: [],
    address: {
      street: "Bus Stand Road",
      city: "Shahdol",
      state: "Madhya Pradesh",
      pincode: "484001",
      mapLocation: "Shahdol, Madhya Pradesh",
      latitude: 23.31,
      longitude: 81.36,
    },
    isOpen: true,

    rating: 4.0,
    deliveryTime: "30–40 min",
    distance: "3.1 km",
  },
];

const dummyFoodData = [
    {
        id: 1,
        name: "Margherita Pizza",
        shopName: "Pizza Wala",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
        price: 199,
        rating: 4.6,
        isVeg: true
    },
    {
        id: 2,
        name: "Cheese Burger",
        shopName: "Pizza Wala",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        price: 149,
        rating: 4.4,
        isVeg: true
    },
    {
        id: 3,
        name: "Paneer Biryani",
        shopName: "Highway Dhaba",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
        price: 180,
        rating: 4.2,
        isVeg: true
    },
    {
        id: 4,
        name: "White Sauce Pasta",
        shopName: "Pizza Wala",
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
        price: 169,
        rating: 4.3,
        isVeg: true
    },
    {
        id: 5,
        name: "Chicken Biryani",
        shopName: "Highway Dhaba",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d96c",
        price: 220,
        rating: 4.5,
        isVeg: false
    },
    {
        id: 6,
        name: "Farmhouse Pizza",
        shopName: "Pizza Wala",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
        price: 249,
        rating: 4.5,
        isVeg: true
    },
    {
        id: 7,
        name: "Veg Cheese Sandwich",
        shopName: "Pizza Wala",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
        price: 129,
        rating: 4.1,
        isVeg: true
    },
    {
        id: 8,
        name: "Tandoori Chicken",
        shopName: "Highway Dhaba",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0",
        price: 280,
        rating: 4.4,
        isVeg: false
    },
    {
        id: 9,
        name: "Veg Hakka Noodles",
        shopName: "Pizza Wala",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
        price: 159,
        rating: 4.2,
        isVeg: true
    },
    {
        id: 10,
        name: "Butter Paneer",
        shopName: "Highway Dhaba",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
        price: 210,
        rating: 4.6,
        isVeg: true
    }
];

export default dummyFoodData;