const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// ✅ Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// ✅ Static Folder
app.use(express.static(path.join(__dirname, "public")));

// ✅ Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/clothes", require("./routes/clothesRoutes"));
app.use("/outfits", require("./routes/outfitRoutes"));

// ✅ MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/digitalCloset")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));


// ✅ Default Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// ✅ Server Start
app.listen(3000, () =>
    console.log("🚀 Server Running on Port 3000")
);