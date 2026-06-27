// Importing required modules
import express from "express"; // Express framework for building APIs
import dotenv from "dotenv"; // Import dotenv for environment variables
import cookieParser from "cookie-parser"; // Import cookie-parser middleware
import cors from "cors"; // Middleware to enable CORS (Cross-Origin Resource Sharing)
import connectDB from "./config/dataBase.js"; // Import the function to connect to MongoDB
import errorMiddleware from "./middleware/error.js"; // Import errorMIddleware
import authRouter from "./features/auth/authRoutes.js"; // import auth router
 
// -------------------- CONFIGURATION  -------------------- //

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// -------------------- MIDDLEWARES -------------------- //

// Enable JSON parsing for request bodies
app.use(express.json());
app.set('query parser', 'extended');

// Enable CORS to allow frontend to communicate with backend
app.use(cors({
    // Allow requests from this origin
    origin: [
        "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent with requests
}));

// Enable cookie parsing for incoming requests
app.use(cookieParser());

// -------------------- CONNECT TO MONGODB -------------------- //

connectDB() // Call the function to connect to MongoDB

// -------------------- ROUTES -------------------- //

// authentication routes `/api/auth` - Use authRouter for handling auth-related routes
app.use("/api/auth", authRouter); 

// -------------------- ERROR MIDDLEWARES -------------------- //

app.use(errorMiddleware); // Use error middleware

// -------------------- SERVER -------------------- //

// Port number for the server to listen on 
const PORT = process.env.PORT || 4000;

// Start the server and listen for requests
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});