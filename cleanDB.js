import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.CONNECTION_STRING;

async function clearCollections() {
  try {
    await mongoose.connect(uri);

    // List your collections here
    const collections = ["bookings", "contactforms", "slots", "users"];

    // Loop through each collection and delete all documents
    for (const collection of collections) {
      await mongoose.connection.collection(collection).deleteMany({});
    }

    console.log("Collections cleared successfully");
  } catch (error) {
    console.error("Error clearing collections:", error);
  } finally {
    await mongoose.disconnect();
  }
}

clearCollections();
