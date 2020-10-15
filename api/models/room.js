const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SpeakerSchema = require("./speaker");
const AttendeeSchema = require("./attendee");

const RoomSchema = new Schema({
  title: String,
  room: Number,
  speaker: [SpeakerSchema],
  attendees: [AttendeeSchema],
});

mongoose.model("Rooms", RoomSchema);

module.exports = RoomSchema;
