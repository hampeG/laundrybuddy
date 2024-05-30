import BookingService from "../services/BookingService.js";
import Slot from "../models/slots.js";
import mongoose from "mongoose";

const checkSlotExpiry = async (req, res, next) => {
  const { slotId } = req.params;
  const session = await mongoose.connection.startSession();
  session.startTransaction();
  try {
    const slot = await Slot.findById(slotId).session(session);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    await BookingService.handleSlotExpiry(slot, session);

    await session.commitTransaction();
    next();
  } catch (error) {
    await session.abortTransaction();
    res
      .status(500)
      .json({ message: "Error checking slot expiry", error: error.message });
  } finally {
    session.endSession();
  }
};

export default checkSlotExpiry;
