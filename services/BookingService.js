import Booking from "../models/bookings.js";
import User from "../models/users.js";
import Slot from "../models/slots.js";
import mongoose from "mongoose";

class BookingService {
  static async createBooking(userId, slotId, bookingDate) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // Validate the user
      const user = await User.findById(userId).session(session);
      if (!user) throw new Error("User not found");
      if (user.bookingCredit <= 0)
        throw new Error("No booking credits available");

      // Validate the slot
      const slot = await Slot.findById(slotId).session(session);
      if (!slot) throw new Error("Slot not found");
      if (!slot.availability) throw new Error("Slot is not available");

      // Check for existing active booking if the user is a tenant
      if (user.role === "Tenant") {
        const existingBooking = await Booking.findOne({
          user_id: userId,
          status: "Booked",
        }).session(session);
        if (existingBooking)
          throw new Error("User already has an active booking");
      }

      // Create and save the new booking
      const booking = new Booking({
        user_id: userId,
        slot_id: slotId,
        bookingDate,
      });
      await booking.save({ session });

      // Update user credits
      user.bookingCredit--;
      await user.save({ session });

      // Update slot availability
      slot.availability = false; // Mark slot as unavailable
      await slot.save({ session });

      await session.commitTransaction();
      return booking;
    } catch (error) {
      await session.abortTransaction();
      console.error("Error during booking creation:", error);
      throw error;
    } finally {
      session.endSession();
    }
  }

  static async cancelBooking(bookingId) {
    const booking = await Booking.findById(bookingId).populate("slot_id");
    if (!booking) throw new Error("Booking not found");

    const currentTime = new Date();
    const slotDate = new Date(booking.slot_id.date);
    const hoursDiff = (slotDate - currentTime) / (1000 * 60 * 60);

    if (hoursDiff < 24) {
      throw new Error(
        "Cancellation must be at least 24 hours before the slot date"
      );
    }

    booking.status = "Canceled";
    await booking.save();

    const user = await User.findById(booking.user_id);
    user.bookingCredit++; // returning the credit if canceled
    await user.save();

    const slot = await Slot.findById(booking.slot_id._id);
    slot.availability = true; // Make slot available again
    await slot.save();

    return booking;
  }
}

export default BookingService;
