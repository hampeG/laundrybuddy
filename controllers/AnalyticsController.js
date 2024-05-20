import Booking from "../models/bookings.js";
import User from "../models/users.js";
import Slot from "../models/slots.js";

// Calculate Total Bookings
export const getTotalBookingsCount = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments({
      status: { $ne: "Canceled" },
    });
    res.status(200).json({ totalBookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingsByUserType = async (req, res) => {
  try {
    const filteredBookings = await Booking.aggregate([
      {
        $match: {
          status: { $ne: "Canceled" }, // Ensure this matches your field name and values
        },
      },
    ]);

    console.log("Filtered Bookings:", filteredBookings); // Log filtered bookings

    const bookingsByUserType = await Booking.aggregate([
      {
        $match: {
          status: { $ne: "Canceled" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user_details",
        },
      },
      {
        $unwind: "$user_details",
      },
      {
        $group: {
          _id: "$user_details.role",
          count: { $sum: 1 },
        },
      },
    ]);

    console.log("Bookings by User Type:", bookingsByUserType);
    res.status(200).json({ bookingsByUserType });
  } catch (error) {
    console.error("Error fetching bookings by user type:", error);
    res.status(500).json({ message: error.message });
  }
};

// Calculate Slot Utilization Rate
export const getSlotUtilizationRate = async (req, res) => {
  try {
    const totalSlots = await Slot.countDocuments();
    const bookedSlots = await Booking.countDocuments({ status: "Booked" });

    if (totalSlots === 0) {
      return res.status(200).json({ utilizationRate: 0 });
    }

    const utilizationRate = (bookedSlots / totalSlots) * 100;
    res.status(200).json({ utilizationRate: utilizationRate.toFixed(2) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Calculate Total Users
export const getTotalUsersCount = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({ totalUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Calculate User Distribution by Role
export const getUserDistributionByRole = async (req, res) => {
  try {
    const userDistribution = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({ userDistribution });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
