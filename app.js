const express = require("express");
const router = express.Router({ mergeParams: true });
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const roomsRoutes = require("./api/routes/rooms");
const attendeesRoutes = require("./api/routes/attendees");

//connect to Mongoose Db
mongoose.connect(
  "mongodb+srv://Markaaron88:" +
    process.env.MONGO_ATLAS_PW +
    "@riid-labs.wduxh.mongodb.net/riid-labs?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//HTTP request logger middleware for node.js
app.use(morgan("dev"));
//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
//extracts json data and makes it easily readible
app.use(bodyParser.json());

//Handling CORS Errors and prevent them
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Allow-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accpet, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//Routes which should handle requests
app.use("/rooms", roomsRoutes);
app.use("/attendees", attendeesRoutes);

//handle requests that reach this line(Err Handling)
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  //pass error along and forward error request
  next(error);
});

//Handles error or thrown from anywhre else when adding a database
//and operations doing work on the db and if they fail ,we do a 500 error
//Since they will directly throw an error this function would be triggered
//and this function would get this error
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
