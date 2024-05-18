import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  slot_id: { type: mongoose.Schema.Types.ObjectId, ref: "Slot" },
  status: { type: String, enum: ["Booked", "Canceled"], default: "Booked" },
  bookingDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
