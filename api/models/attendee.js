const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Json Object 
const AttendesSchema = new Schema({
  name: String,
  company: String,
  email: String,
  registered: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Attendee", AttendesSchema);
