import ContactForm from "../models/contactForm.js";

// Function to create a new contact form entry
export const createContactFormEntry = async (req, res) => {
  try {
    const newContactFormEntry = await ContactForm.create(req.body);
    res.status(201).json(newContactFormEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to get all contact form entries
export const getAllContactFormEntries = async (req, res) => {
  try {
    const contactFormEntries = await ContactForm.find();
    res.status(200).json(contactFormEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get a contact form entry by ID
export const getContactFormEntryById = async (req, res) => {
  const { id } = req.params;
  try {
    const contactFormEntry = await ContactForm.findById(id);
    if (!contactFormEntry) {
      return res.status(404).json({ message: "Contact form entry not found" });
    }
    res.status(200).json(contactFormEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to update a contact form entry by ID
export const updateContactFormEntry = async (req, res) => {
  try {
    const updatedContactFormEntry = await ContactForm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedContactFormEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to delete a contact form entry by ID
export const deleteContactFormEntry = async (req, res) => {
  try {
    await ContactForm.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
