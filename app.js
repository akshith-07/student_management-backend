require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3500; // Use the provided PORT in .env or default to 3500

const mongoose = require("mongoose");
const cors = require("cors");
const studentRouter = require("./routes/studentsRoute"); // Updated to studentRouter

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", (errorMessage) => console.error(errorMessage));
db.once("open", () => console.log("Connected successfully to the database..."));

app.use("/api/v1/students", studentRouter); // Updated to use studentRouter

app.listen(
  PORT,
  console.log(
    `Server started running at http://localhost:${PORT}/api/v1/students`
  )
);
