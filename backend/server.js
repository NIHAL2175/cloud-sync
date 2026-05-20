const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// ROUTES

app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);


// STATIC FILE ACCESS

app.use("/uploads", express.static("uploads"));


// DATABASE CONNECTION

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});


// TEST ROUTE

app.get("/", (req, res) => {
    res.send("CloudSync Backend Running");
});


// SERVER

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});