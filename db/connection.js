import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.CONNECTION_STRING;

const connection = async () => {
    try {
        await mongoose.connect(url);
        console.log('Connected to the database');
    } catch (err) {
        console.log(`Error connecting to the database: ${err}`);
    }
};

export default connection;