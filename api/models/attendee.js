const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttendeeSchema = new Schema({
  name: String,
  company: String,
  email: String,
  registered: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("Attendee", AttendeeSchema)

// 
module.exports = mongoose.model("Attendee", AttendeeSchema);
module.exports.AttendeeSchema = AttendeeSchema;
