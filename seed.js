import mongoose from "mongoose";
import Booking from "./models/bookings.js";
import Slot from "./models/slots.js";
import User from "./models/users.js";

async function seedDatabase() {
  try {
    await mongoose.connect(
      "mongodb+srv://hampusgunnarsson:mongo@laundrybuddy.qonx94l.mongodb.net/laundrybuddy?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // Clear existing collections
    await Booking.deleteMany({});
    await Slot.deleteMany({});
    await User.deleteMany({});

    // Insert initial users
    const users = await User.insertMany([
      {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        phone_number: "123-456-7890",
        apartment_number: "101",
        role: "Tenant",
        bookingCredit: 1,
      },
      {
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@example.com",
        phone_number: "123-456-7891",
        apartment_number: "102",
        role: "Tenant",
        bookingCredit: 1,
      },
      {
        first_name: "Admin",
        last_name: "User",
        email: "admin@example.com",
        phone_number: "123-456-7892",
        apartment_number: "201",
        role: "Admin",
        bookingCredit: 5,
      },
    ]);

    // Insert initial slots
    const slots = await Slot.insertMany([
      {
        date: new Date("2024-05-08"),
        time: "10:00 AM",
        availability: true,
      },
      {
        date: new Date("2024-05-08"),
        time: "11:00 AM",
        availability: true,
      },
      {
        date: new Date("2024-05-08"),
        time: "12:00 PM",
        availability: false,
      },
    ]);

    // Insert initial bookings
    // eslint-disable-next-line no-unused-vars
    const bookings = await Booking.insertMany([
      {
        user_id: users[0]._id,
        slot_id: slots[2]._id,
        status: "Booked",
        bookingDate: slots[2].date,
      },
    ]);

    console.log("Initial data inserted successfully");
  } catch (error) {
    console.error("Error inserting initial data:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
