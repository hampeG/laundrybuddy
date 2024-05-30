import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  availability: { type: Boolean, default: true },
  expiryDate: { type: Date, required: true }, // Ensure this field is provided
});

const Slot = mongoose.model("Slot", slotSchema);
export default Slot;
