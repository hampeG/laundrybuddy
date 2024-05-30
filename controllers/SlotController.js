import Slot from "../models/slots.js";
import Booking from "../models/bookings.js";
import User from "../models/users.js";
import mongoose from "mongoose";

export const createSlot = async (req, res) => {
  const { date, time, availability, expiryDate } = req.body;

  if (!date || !time || availability === undefined || !expiryDate) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newSlot = new Slot({
      date: new Date(date),
      time,
      availability,
      expiryDate: new Date(expiryDate),
    });

    const savedSlot = await newSlot.save();
    res.status(201).json(savedSlot);
  } catch (error) {
    console.error("Error creating slot:", error);
    res.status(500).json({ message: "Failed to create slot" });
  }
};

export const getAllSlots = async (req, res) => {
  try {
    const slots = await Slot.find();
    res.status(200).json(slots);
  } catch (error) {
    console.error("Error fetching slots:", error);
    res.status(500).json({ message: "Failed to fetch slots" });
  }
};

export const getSlotById = async (req, res) => {
  try {
    const { id } = req.params;
    const slot = await Slot.findById(id);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    res.status(200).json(slot);
  } catch (error) {
    console.error("Error fetching slot:", error);
    res.status(500).json({ message: "Failed to fetch slot" });
  }
};

export const updateSlot = async (req, res) => {
  console.log("Called updateSlot"); // Log to confirm this function is being called
  try {
    const { id } = req.params;
    const updatedSlot = await Slot.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedSlot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    res.status(200).json(updatedSlot);
  } catch (error) {
    console.error("Error updating slot:", error);
    res.status(500).json({ message: "Failed to update slot" });
  }
};

export const deleteSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSlot = await Slot.findByIdAndDelete(id);

    if (!deletedSlot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    res.status(200).json({ message: "Slot deleted successfully" });
  } catch (error) {
    console.error("Error deleting slot:", error);
    res.status(500).json({ message: "Failed to delete slot" });
  }
};

export const expireSlot = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Received request to expire slot with ID: ${id}`);

    const slot = await Slot.findById(id);

    if (!slot) {
      console.log("Slot not found");
      return res.status(404).json({ message: "Slot not found" });
    }

    console.log(
      `Slot expiry date: ${slot.expiryDate}, Current date: ${new Date()}`
    );

    if (new Date(slot.expiryDate) < new Date()) {
      console.log("Slot has expired");

      if (slot.availability) {
        slot.availability = false;
        console.log("Slot availability set to false");
      } else {
        console.log("Slot is already booked and expired");
        const booking = await Booking.findOne({
          slot_id: slot._id,
          status: "Booked",
        });
        if (booking) {
          booking.status = "Canceled";
          await booking.save();
          console.log("Booking status set to Canceled");

          const user = await User.findById(booking.user_id);
          if (user) {
            user.bookingCredit += 1;
            await user.save();
            console.log("User booking credit incremented");
          }
        }
      }

      await slot.save();
      res
        .status(200)
        .json({ message: "Slot expired and updated successfully" });
    } else {
      
      res.status(400).json({ message: "Slot has not expired yet" });
    }
  } catch (error) {
    
    res.status(500).json({ message: "Failed to expire slot" });
  }
};

export const expireMultipleSlots = async (req, res) => {
  
  try {
    const { ids } = req.body;

    

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Invalid slot IDs" });
    }

    for (const id of ids) {
      

      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log(`Invalid ObjectId: ${id}`);
        continue;
      }

      const slot = await Slot.findById(id);
      if (slot && new Date(slot.expiryDate) < new Date()) {
        if (slot.availability) {
          slot.availability = false;
          
        } else {
          const booking = await Booking.findOne({
            slot_id: slot._id,
            status: "Booked",
          });
          if (booking) {
            booking.status = "Canceled";
            await booking.save();
            

            const user = await User.findById(booking.user_id);
            if (user) {
              user.bookingCredit += 1;
              await user.save();
              console.log(`User ${user._id} booking credit incremented`);
            }
          }
        }
        await slot.save();

      } 
    }

    res.status(200).json({ message: "Slots expired and updated successfully" });
  } catch (error) {
    console.error("Error expiring slots:", error);
    res.status(500).json({ message: "Failed to expire slots" });
  }
};

export const bookSlot = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { id } = req.params;
    const { userId } = req.body;

    console.log("Slot ID:", id); // Log the slot ID
    console.log("User ID:", userId); // Log the user ID

    const slot = await Slot.findById(id).session(session);
    if (!slot) {
      console.log("Slot not found");
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Slot not found' });
    }

    if (!slot.availability) {
      console.log("Slot not available");
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Slot is not available' });
    }

    const user = await User.findById(userId).session(session);
    if (!user) {
      console.log("User not found");
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new booking
    const booking = new Booking({
      user_id: user._id,
      slot_id: slot._id,
      bookingDate: req.body.bookingDate || new Date(),
    });

    await booking.save({ session });

    // Update slot availability
    slot.availability = false;
    await slot.save({ session });

    await session.commitTransaction();
    session.endSession();

    console.log('Slot booked successfully');
    res.status(200).json({ message: 'Slot booked successfully' });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error booking slot:', error);
    res.status(500).json({ message: 'Failed to book slot' });
  }
};
