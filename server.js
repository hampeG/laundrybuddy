import express from "express";
import dotenv from "dotenv";
import path from "path";
import connection from "./db/connection.js";
import router from "./routes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(router);

// Serve static files from the 'dist' directory
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

// We call the connection function to establish MongoDB connection
connection()
  .then(async () => {
    // We start the server once the connection is established
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to the database: ${err}`);
    process.exit(1);
  });
