import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Connecting to MongoDB by using the Connection String
const url = process.env.CONNECTION_STRING;

mongoose.connect(url)
    .then(() => console.log('Connected to the database'))
    .catch(err => console.log(`Error connecting to the database: ${err}`));

// Starting the server on Port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
