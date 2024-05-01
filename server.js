import express from "express";
import dotenv from "dotenv";
import connection from "./db/connection.js";
import router from "./routes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(router);

// We call the connection function to establish MongoDB connection
connection()
    .then(() => {
        // We start the server once the connection is established
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error(`Error connecting to the database: ${err}`);
        process.exit(1);
    });

