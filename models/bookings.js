import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    slot_id: { type: mongoose.Schema.Types.ObjectId, ref: "Slot"},
    status: String
})

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
