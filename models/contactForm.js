import mongoose from "mongoose";

const contactFormSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    message: { type: String, required: true }
}, { timestamps: true });

const ContactForm = mongoose.model("ContactForm", contactFormSchema);
export default ContactForm;
