const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://login-app-topaz-delta.vercel.app/",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
const userRoutes = require("./Routes/userRoutes");

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 8000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`server running ${PORT}`);
  });
}

module.exports = app;
