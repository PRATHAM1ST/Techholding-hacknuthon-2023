const express = require("express");
const router = express.Router();

const User = require("../../Database/DataSchema");
const Client = require("../../Database/ClientSchema");



// Endpoint for returning random user
router.get("/randomUser", async (req, res) => {
	try {
		const data = await User.aggregate([{ $sample: { size: 1 } }]);
		const randomUser = data[0];
		res.status(200).send({ user: randomUser });
	} catch (err) {
		console.error("Error collecting random user: ", err);
		res.status(500).send({ error: "Internal server error" });
	}
});

// Endpoint for returning random users
router.get("/randomUsers/:numUsers", async (req, res) => {
	// Get the number of users to return from the request parameters
	const numUsers = req.params.numUsers;
	if (!numUsers || isNaN(numUsers)) {
		return res.status(400).send({ error: "Invalid number of users" });
	}
	try {
		const users = await User.aggregate([
			{ $sample: { size: parseInt(numUsers) } },
		]);

		// Check if the user object is a valid mongoose model instance
		const validUsers = users.filter(user => user instanceof User);

		// Map the valid users to plain objects
		const randomUsers = validUsers.map((user) => user.toObject());

		res.status(200).send({ randomUsers });
	} catch (err) {
		console.error("Error collecting random users: ", err);
		res.status(500).send({ error: "Internal server error" });
	}
});



// Endpoint for returning a user by ID
router.get("/user/:id", async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send({ error: "User not found" });
		}
		res.status(200).send({ user });
	} catch (err) {
		console.error("Error collecting user by ID: ", err);
		res.status(500).send({ error: "Internal server error" });
	}
});


// Endpoint for returning all users
router.get("/users", async (req, res) => {
	try {
		const data = await User.find({});
		res.status(200).send({ users: data });
	} catch (err) {
		console.error("Error collecting all users: ", err);
		res.status(500).send({ error: "Internal server error" });
	}
});

router.get("/client/:clientId", async (req, res) => {
	try {
	  const client = await Client.findById(req.params.clientId);
	  if (!client) {
		return res.status(404).send({ message: "Client not found" });
	  }
	  res.status(200).send(client);
	} catch (err) {
	  console.error(err);
	  res.status(500).send({ message: "Error fetching client", err });
	}
  });

module.exports = router;
