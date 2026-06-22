// Importing required modules
import express from "express"; // Express framework for building APIs
import dotenv from "dotenv"; // Import dotenv for environment variables
import connectDB from "./config/dataBase.js"; // Import the function to connect to MongoDB

// -------------------- CONFIGURATION  -------------------- //

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// -------------------- CONNECT TO MONGODB -------------------- //

connectDB(); // Call the function to connect to MongoDB

// -------------------- SERVER -------------------- //

// Port number for the server to listen on 
const PORT = process.env.PORT || 4000;

// Start the server and listen for requests
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});