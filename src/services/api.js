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

// Get slot by ID with error handling
export const getSlotById = async (slotId) => {
  try {
    const response = await axios.get(`/api/slots/${slotId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching slot with ID ${slotId}:`, error.response || error.message);
    throw new Error("Error fetching slot details. Please try again later.");
  }
};

// Book a slot with error handling
export const bookSlot = async (bookingData, token) => {
  try {
    const response = await axios.post("/api/bookings", bookingData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error booking slot:", error.response || error.message);
    throw new Error(
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Error booking slot. Please try again later."
    );
  }
};
