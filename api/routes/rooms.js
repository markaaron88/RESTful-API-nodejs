const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Room = require("../models/room");
const Attendee = require("../models/attendee");

//Gets the list of all rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// Add a room to the conference
router.post("/add", async (req, res) => {
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
    const savedRoom = await room.save();
    res.json(savedRoom);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// 
router.post("/add/:attendeeId/:roomId", async (req, res) => {
  try {
    const attendee = await Attendee.findById(req.params.attendeeId);
    const room = await Room.findById(req.params.roomId);
    room.attendees.push(attendee);
    const savedRoom = await room.save();
    res.json(savedRoom);
  } catch (err) {
    res.json({ message: err });
    res.status(500).json({ error: err });
  }
});

// 
router.post("/remove/:attendeeId/:roomId", async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    const modifiedAttendees = room.attendees.filter(
      (attendee) => attendee._id != req.params.attendeeId
    );
    room.attendees = modifiedAttendees;
    const savedRoom = await room.save();
    res.json(savedRoom);
  } catch (err) {
    res.json({ message: err });
    res.status(500).json({ error: err });
  }
});

module.exports = router;
