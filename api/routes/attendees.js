const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Attendee = require("../models/attendee");
const Talk = require("../models/talk");

//Routes
//Gets the list of attendees
router.get("/", async (req, res) => {
  try {
    const attendee = await Attendee.find();
    res.json(attendee);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// Add an attendee
router.post("/", async (req, res) => {
  const attendee = new Attendee({
    name: req.body.name,
    company: req.body.company,
    email: req.body.email,
  });
  try {
    const savedattendee = await attendee.save();
    res.json(savedattendee);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

//GET specific attendee by Id
router.get("/:attendeeId", async (req, res) => {
  try {
    const attendee = await Attendee.findById(req.params.attendeeId);
    res.json(attendee);
    // res.status(200).json(doc);
  } catch (err) {
    res.json({ message: err });
    res.status(500).json({ error: err });
  }
});

// //PATCH route
// router.patch("/:confId", (req, res, next) => {
//   res.status(200).json({
//     message: "Updated product!",
//   });
// });

// router.delete("/:confId", (req, res, next) => {
//   res.status(200).json({
//     message: "Delete product!",
//   });
// });

module.exports = router;
