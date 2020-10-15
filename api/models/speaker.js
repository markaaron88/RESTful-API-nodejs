const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpeakerSchema = new Schema({
  name: String,
  company: Number,
  email: String,
  bio: String,
});

module.exports = SpeakerSchema;