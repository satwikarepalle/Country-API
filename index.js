const express = require("express");

const connectDB = require("./config/db");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const seedRoutes = require("./routes/seedRoutes");
const countryRoutes = require("./routes/countryRoutes");
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const app = express();


connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api", seedRoutes);

app.use("/api/countries", countryRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Countries API Clone is Running"
    });
});

app.listen(5001, () => {
    console.log("🚀 Server Running on Port 5001");
});