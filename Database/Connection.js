require("dotenv").config();
const mongoose = require("mongoose");

async function mongodbConnection() {
  // Connection URI for MongoDB Atlas
  const uri = process.env.MONGODB_URI;
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection successful");
  } catch (err) {
    console.error("Error connecting to MongoDB: ", err);
  }
}

module.exports = mongodbConnection;
