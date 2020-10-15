const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const AttendesSchema = new Schema({
//   name: String,
//   company: String,
//   email: String,
//   registered: {
//     type: Date,
//     default: Date.now,
//   },
// });

const SpeakerSchema = new Schema({
  name: String,
  company: Number,
  email: String,
  bio: String,
});

const RoomSchema = new Schema({
  title: String,
  room: Number,
  speaker: [SpeakerSchema],
});

module.exports = mongoose.model("Rooms", RoomSchema);
