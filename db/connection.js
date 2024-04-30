import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.CONNECTION_STRING;

mongoose.connect(url)
    .then(() => console.log('Connected to the database'))
    .catch(err => console.log(`Error connection to the datbase: ${err}`))

module.exports = mongoose;