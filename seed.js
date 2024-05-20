import mongoose from "mongoose";
import dotenv from "dotenv";
import Booking from "./models/bookings.js";

dotenv.config();

const uri = process.env.CONNECTION_STRING;

async function seedDatabase() {
  try {
    await mongoose.connect(uri);

    // Clear existing collections
    await Booking.deleteMany({});

    
    console.log("Bookings cleared successfully");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
