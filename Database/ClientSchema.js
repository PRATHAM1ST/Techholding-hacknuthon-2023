const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  mappedData: Object,
  username: String,
  password: String,
});

const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);

module.exports = Client;
