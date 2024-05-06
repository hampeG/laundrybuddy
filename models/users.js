import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true, unique: true },
  apartment_number: String,
  role: { type: String, default: "Tenant" },
  bookingCredit: { type: Number, default: 1 }, // can be adjusted to what we agree on later
});

const User = mongoose.model("User", userSchema);
export default User;