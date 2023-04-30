const express = require("express");
const router = express.Router();
const User = require("../../Database/DataSchema");
const Client = require("../../Database/ClientSchema");
var sha512 = require('js-sha512');

// Endpoint for creating a user
router.post("/user", async (req, res) => {
	try {
		const user = new User(req.body);
		const savedUser = await user.save();
		res.status(201).send({ message: "User created", savedUser });
	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Error creating user", err });
	}
});

// Endpoint for creating a new client
router.post("/client", async (req, res) => {
	try {
	  const newClient = new Client({...req.body, token: sha512(`${req.username}${req.password}`)});
	  const savedClient = await newClient.save();
	  res.status(200).send(savedClient);
	} catch (err) {
	  console.error(err);
	  res.status(500).send({ message: "Error creating client", err });
	}
  });

module.exports = router;