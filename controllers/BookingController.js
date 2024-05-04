import Booking from "../models/bookings.js";
import BookingService from "../services/BookingService.js";

// Function to create a new booking
export const createBooking = async (req, res) => {
  try {
    const { user_id, slot_id } = req.body;
    const bookingDate = req.body.bookingDate;
    const newBooking = await BookingService.createBooking(
      user_id,
      slot_id,
      bookingDate
    );
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to retrieve all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user_id")
      .populate("slot_id");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to retrieve a booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id)
      .populate("user_id")
      .populate("slot_id");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to update a booking by ID
export const updateBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, slot_id, status } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { user_id, slot_id, status },
      { new: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to delete a booking by ID
export const deleteBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const canceledBooking = await BookingService.cancelBooking(id);
    res
      .status(200)
      .json({
        message: "Booking canceled successfully",
        booking: canceledBooking,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
