import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
    date: Date, 
    time: String,
    availability: Boolean
})

const Slot = mongoose.model("Slot", slotSchema);
export default Slot;