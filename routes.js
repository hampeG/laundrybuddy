import express from "express";
import * as slotController from "./controllers/SlotController.js";
import * as userController from "./controllers/UserController.js";
// import * as bookingController from "./controllers/BookingController.js";

const router = express.Router();

// Slots endpoints
router.post("/api/slots", slotController.createSlot);
router.get("/api/slots", slotController.getAllSlots);
router.put("/api/slots/:id", slotController.updateSlot);
router.delete("/api/slots/:id", slotController.deleteSlot);

// Users endpoints
router.post("/api/users", userController.createUser);
router.get("/api/users", userController.getAllUsers);
router.put("/api/users/:id", userController.updateUser);
router.delete("/api/users/:id", userController.deleteUser);

// // Bookings endpoints
// router.post("/api/bookings", bookingController.createBooking);
// router.get("/api/bookings", bookingController.getAllBookings);
// router.put("/api/bookings/:id", bookingController.updateBooking);
// router.delete("/api/bookings/:id", bookingController.deleteBooking);

export default router;
