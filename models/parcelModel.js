const mongoose = require("mongoose");

const parcelSchema = new mongoose.Schema({
  userId: { type: String },
  email: { type: String},
  item: { type: String },
  from: { type: String },
  to: { type: String },
  sender:{type: String},
  reciever:{type: String},
  currentLocation: { type: String },
  date: { type: String },
  time: { type: String },
  status:{type: String},
});

const Parcel = mongoose.model("parcel", parcelSchema);

module.exports = Parcel;
