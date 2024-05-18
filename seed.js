import mongoose from "mongoose";
import Slot from "./models/slots.js";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.CONNECTION_STRING;

async function seedDatabase() {
  try {
    await mongoose.connect(uri);

    // Clear existing collections
    await Slot.deleteMany({});

    // Generate slots for the next 60 days starting from May 28, 2024
    const startDate = new Date("2024-05-28");
    const numberOfDays = 60;
    const slots = [];

    for (let i = 0; i < numberOfDays; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);

      slots.push(
        {
          date: new Date(currentDate),
          time: "08:00 AM",
          availability: true,
        },
        {
          date: new Date(currentDate),
          time: "12:00 PM",
          availability: true,
        },
        {
          date: new Date(currentDate),
          time: "04:00 PM",
          availability: true,
        }
      );
    }

    // Insert generated slots
    await Slot.insertMany(slots);

    console.log("Slots inserted successfully");
  } catch (error) {
    console.error("Error inserting slots:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
