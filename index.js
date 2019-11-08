const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const config = require("./config/config");
const todoRoute = require("./routes/todoRoute");
const userRoute = require("./routes/userRoute");
const claimCheck = require("./middlewares/accessControl");

const app = express();

//Default middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//Db connection
mongoose.connect(
  config.DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected successfully")
);

//Routes
app.use("/", todoRoute);
app.use("/user", userRoute);

//Server
app.listen(config.PORT, () => console.log("App Runnig"));
