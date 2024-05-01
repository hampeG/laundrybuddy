import Slot from "../models/slots.js";

// Function used to create new slot
export const createSlot = async (req, res) => {
  try {
    const newSlot = await Slot.create(req.body);
    res.status(201).json(newSlot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function used to get all slots
export const getAllSlots = async (req, res) => {
  try {
    const slots = await Slot.find();
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Function used to get a slot by ID
export const getSlotById = async (req, res) => {
    const { id } = req.params;
    try {
      const slot = await Slot.findById(id);
      if (!slot) {
        return res.status(404).json({ message: "Slot not found" });
      }
      res.status(200).json(slot);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Function used to update slot by ID
export const updateSlot = async (req, res) => {
  try {
    const updatedSlot = await Slot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedSlot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function used to delete slot by ID
export const deleteSlot = async (req, res) => {
  try {
    await Slot.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
