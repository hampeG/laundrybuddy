import axios from "axios";

export const fetchSlots = async () => {
  try {
    const response = await axios.get("/api/slots");
    return response;
  } catch (error) {
    console.error("Error fetching slots from API:", error);
    throw error;
  }
};

export const getSlotById = async (slotId) => {
  try {
    const response = await axios.get(`/api/slots/${slotId}`);
    return response;
  } catch (error) {
    console.error("Error fetching slot by ID:", error);
    throw error;
  }
};

export const bookSlot = async (bookingData) => {
  try {
    const response = await axios.post("/api/bookings", bookingData);
    return response;
  } catch (error) {
    console.error("Error booking slot:", error);
    throw error;
  }
};
