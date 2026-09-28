import { createSlice } from "@reduxjs/toolkit";

// get initial cart data from local storage
const getInitialCart = () => {

    try {

        const savedCart = localStorage.getItem("cart");

        return savedCart ? JSON.parse(savedCart) : {
            restaurant: {
                id: null,
                name: "",
                image: "",
                address: {},
                distance: "",
                deliveryTime: ""
            },

            items: [],
            totalItems: 0,
            totalPrice: 0
        };

    } catch (error) {

        console.log(error.message);

        return {
            restaurant: {
                id: null,
                name: "",
                image: "",
                address: {},
                distance: "",
                deliveryTime: ""
            },

            items: [],
            totalItems: 0,
            totalPrice: 0
        };
    }
};


// create initial state
const initialState = getInitialCart();


// create slice
const cartSlice = createSlice({

    name: "cart",

    initialState,

    reducers: {

        // add food to cart
        addToCart: (state, action) => {

            const food = action.payload;


            // empty cart
            if (state.items.length === 0) {

                state.restaurant = {
                    id: food.restaurant.id,
                    name: food.restaurant.name,
                    image: food.restaurant.image,
                    address: food.restaurant.address,
                    distance: food.restaurant.distance,
                    deliveryTime: food.restaurant.deliveryTime
                };
            }


            // check if food already exists
            const existingItem = state.items.find(
                (item) => item.foodId === food.foodId
            );

            if (existingItem) {

                existingItem.quantity += food.quantity || 1;

            } else {

                state.items.push({
                    foodId: food.foodId,
                    name: food.name,
                    image: food.image,
                    price: food.price,
                    quantity: food.quantity || 1,
                    isVeg: food.isVeg
                });
            }


            // update total items
            state.totalItems = state.items.reduce(
                (total, item) => total + item.quantity,
                0
            );


            // update total price
            state.totalPrice = state.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );


            localStorage.setItem("cart", JSON.stringify(state));
        },


        // increase quantity
        increaseQuantity: (state, action) => {

            const item = state.items.find(
                (item) => item.foodId === action.payload
            );


            if (item) {
                item.quantity += 1;
            }


            state.totalItems = state.items.reduce(
                (total, item) => total + item.quantity,
                0
            );


            state.totalPrice = state.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );


            localStorage.setItem("cart", JSON.stringify(state));
        },


        // decrease quantity
        decreaseQuantity: (state, action) => {

            const item = state.items.find(
                (item) => item.foodId === action.payload
            );


            if (!item) return;


            if (item.quantity > 1) {
                item.quantity -= 1;
            }


            state.totalItems = state.items.reduce(
                (total, item) => total + item.quantity,
                0
            );


            state.totalPrice = state.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );


            localStorage.setItem("cart", JSON.stringify(state));
        },


        // remove item
        removeFromCart: (state, action) => {

            state.items = state.items.filter(
                (item) => item.foodId !== action.payload
            );


            state.totalItems = state.items.reduce(
                (total, item) => total + item.quantity,
                0
            );


            state.totalPrice = state.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );


            if (state.items.length === 0) {

                state.restaurant = {
                    id: null,
                    name: "",
                    image: "",
                    address: {},
                    distance: "",
                    deliveryTime: ""
                };

                localStorage.removeItem("cart");

                return;
            }


            localStorage.setItem("cart", JSON.stringify(state));
        },


        // clear cart
        clearCart: (state) => {

            state.restaurant = {
                id: null,
                name: "",
                image: "",
                address: {},
                distance: "",
                deliveryTime: ""
            };

            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;


            localStorage.removeItem("cart");
        }

    }

});


export const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart
} = cartSlice.actions;


export default cartSlice.reducer;