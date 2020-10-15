const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Room = require("../models/talk");
const Attendee = require("../models/attendee");

//Routes

//Gets the list of talks(speaker and the room)
router.get("/", async (req, res) => {
  try {
    const room = await Room.find();
    res.json(room);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// Add a talk to the conference
router.post("/", async (req, res) => {
  const room = new Room({
    title: req.body.title,
    room: req.body.room,
    speaker: {
      name: req.body.name,
      comapny: req.body.comapny,
      email: req.body.email,
      bio: req.body.bio,
    },
  });
  try {
    const savedroom = await room.save();
    res.json(savedroom);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});



//PATCH route
router.patch("/:confId", (req, res, next) => {
  res.status(200).json({
    message: "Updated product!",
  });
});

router.delete("/:confId", (req, res, next) => {
  res.status(200).json({
    message: "Delete product!",
  });
});

module.exports = router;
