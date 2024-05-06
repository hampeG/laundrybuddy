import Booking from "../models/bookings.js";
import User from "../models/users.js";
import Slot from "../models/slots.js";

class BookingService {
  static async createBooking(userId, slotId, bookingDate) {
    // Validate the user
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    if (user.bookingCredit <= 0)
      throw new Error("No booking credits available");

    // Validate the slot
    const slot = await Slot.findById(slotId);
    if (!slot) throw new Error("Slot not found");
    if (!slot.availability) throw new Error("Slot is not available");

    // Check for existing active booking
    const existingBooking = await Booking.findOne({
      user_id: userId,
      status: "Booked",
    });
    if (existingBooking) throw new Error("User already has an active booking");

    // Create and save the new booking
    const booking = new Booking({
      user_id: userId,
      slot_id: slotId,
      bookingDate,
    });
    await booking.save();

    // Update user credits
    user.bookingCredit--;
    await user.save();

    // Update slot availability
    slot.availability = false; // Mark slot as unavailable
    await slot.save();

    return booking;
  }

  static async cancelBooking(bookingId) {
    const booking = await Booking.findById(bookingId);
    if (!booking) throw new Error("Booking not found");

    const currentTime = new Date();
    const hoursDiff = (booking.bookingDate - currentTime) / (1000 * 60 * 60);

    if (hoursDiff < 24) {
      throw new Error(
        "Cancellation must be at least 24 hours before the booking date"
      );
    }

    booking.status = "Canceled";
    await booking.save();

    const user = await User.findById(booking.user_id);
    user.bookingCredit++; // returning the credit if canceled
    await user.save();

    const slot = await Slot.findById(booking.slot_id);
    slot.availability = true; // Make slot available again
    await slot.save();

    return booking;
  }
}

export default BookingService;
