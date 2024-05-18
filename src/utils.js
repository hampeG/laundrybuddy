export const formatDate = (date) => date.toISOString().substring(0, 10);

export const filterAvailableSlots = (slots) => {
  return slots.filter((slot) => slot.availability);
};
