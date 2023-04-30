const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  mappedData: Object,
  sendingDataFormat: {
    type: String,
    required: true,
    enum: ["json", "xml", "graphql"]
  },
  receivingDataFormat: {
    type: String,
    required: true,
    enum: ["json", "xml"]
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);

module.exports = Client;
