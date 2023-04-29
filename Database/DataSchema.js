const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  age: Number,
  email: String,
  phone_number: String,
  address: String,
  city: String,
  state: String,
  zip_code: String,
  gender: String
});

const Data = mongoose.models.Data || mongoose.model("Data", dataSchema);

module.exports = Data;
