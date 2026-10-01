import FoodItem from "../../models/food.item.model.js";
import Order from "../../models/order.modal.js";
import Shop from "../../models/shop.model.js";
import ErrorHandler from "../../utils/errorHandler.js";

// Create Order
export const createOrder = async (req, res, next) => {

    const { restaurant, items, deliveryAddress, paymentMethod } = req.body;

    // Check restaurant
    if (!restaurant?.restaurantId) {
        return next(new ErrorHandler("Restaurant is required", 400));
    }

    // Check items
    if (!items || items.length === 0) {
        return next(new ErrorHandler("Order items are required", 400));
    }

    // Check delivery address
    if (
        deliveryAddress?.latitude === undefined ||
        deliveryAddress?.longitude === undefined ||
        !deliveryAddress?.houseNumber ||
        !deliveryAddress?.area ||
        !deliveryAddress?.city ||
        !deliveryAddress?.pincode
    ) {
        return next(new ErrorHandler("Complete delivery address is required", 400));
    }

    // Check payment method
    if (paymentMethod !== "COD") {
        return next(new ErrorHandler("Only COD payment is available", 400));
    }

    // Find restaurant
    const shop = await Shop.findById(restaurant.restaurantId);

    if (!shop) {
        return next(new ErrorHandler("Restaurant not found", 404));
    }

    // Prepare order items
    const orderItems = [];
    let itemTotal = 0;

    for (const item of items) {

        // Check food item and quantity
        if (!item.foodId || !item.quantity || item.quantity < 1) {
            return next(new ErrorHandler("Valid food item and quantity are required", 400));
        }

        // Find food item
        const foodItem = await FoodItem.findById(item.foodId);

        if (!foodItem) {
            return next(new ErrorHandler("Food item not found", 404));
        }

        // Check food belongs to restaurant
        if (foodItem.shop.toString() !== shop._id.toString()) {
            return next(new ErrorHandler("Food item does not belong to this restaurant", 400));
        }

        // Check food availability
        if (!foodItem.isAvailable) {
            return next(new ErrorHandler(`${foodItem.name} is not available`, 400));
        }

        // Calculate item total
        itemTotal += foodItem.price * item.quantity;

        // Add verified food details
        orderItems.push({
            foodId: foodItem._id,
            name: foodItem.name,
            image: foodItem.image,
            price: foodItem.price,
            quantity: item.quantity,
            isVeg: foodItem.isVeg
        });
    }

    // Calculate delivery fee
    const deliveryFee = itemTotal > 150 ? 30 : 0;

    // Calculate taxes
    const taxes = Math.round(itemTotal * 0.05);

    // Calculate final amount
    const totalAmount = itemTotal + deliveryFee + taxes;

    // Create order
    const order = await Order.create({

        user: req.user._id,

        restaurant: {
            restaurantId: shop._id,
            restaurantName: shop.name
        },

        items: orderItems,

        deliveryAddress: {
            latitude: deliveryAddress.latitude,
            longitude: deliveryAddress.longitude,
            houseNumber: deliveryAddress.houseNumber,
            area: deliveryAddress.area,
            city: deliveryAddress.city,
            pincode: deliveryAddress.pincode
        },

        pricing: {
            itemTotal,
            deliveryFee,
            taxes,
            totalAmount
        },

        paymentMethod: "COD",

        status: "pending"
    });

    // Update total orders for each food item
    for (const item of orderItems) {

        await FoodItem.findByIdAndUpdate(
            item.foodId,
            { $inc: { totalOrders: item.quantity } }
        );

    }

    res.status(201).json({
        success: true,
        message: "Order placed successfully",
        order
    });

};

// Get logged-in user's orders
export const getMyOrders = async (req, res, next) => {

    // Fetch orders for the logged-in user
    const orders = await Order.find({ user: req.user._id })
        .populate({
            path: "restaurant.restaurantId",
            select: "name image owner",
            populate: {
                path: "owner",
                select: "fullName email mobileNumber"
            }
        })
        .sort({ createdAt: -1 });

    // Return the orders
    return res.status(200).json({
        success: true,
        message: "Orders fetched successfully",
        orders
    });

};

// Get restaurant owner's orders
export const getRestaurantOrders = async (req, res, next) => {

    const restaurant = await Shop.findOne({ owner: req.user._id }).select("_id");

    if (!restaurant) {
        return next(new ErrorHandler("Restaurant not found", 404));
    }

    const orders = await Order.find({
        "restaurant.restaurantId": restaurant._id
    })
        .populate("user", "fullName email mobileNumber")
        .sort({ createdAt: -1 });

    return res.status(200).json({
        success: true,
        message: "Restaurant orders fetched successfully",
        orders
    });
    
};