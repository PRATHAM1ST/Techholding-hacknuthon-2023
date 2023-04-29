const express = require("express");
const router = express.Router();
const User = require("../../Database/DataSchema");
const Client = require("../../Database/ClientSchema");

// Endpoint for updating a user
router.put("/user/:id", async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		if (!user) {
			return res.status(404).send({ message: "User not found" });
		}
		res.status(200).send({ message: "User updated", user });
	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Error updating user", err });
	}
});

// Endpoint for updating a client's mappedData
router.put("client/:id", async (req, res) => {
	try {
	  const client = await Client.findById(req.params.id);
	  if (!client) {
		return res.status(404).send({ message: "Client not found" });
	  }
	  const updatedClient = _.merge(client, { mappedData: req.body });
	  const savedClient = await updatedClient.save();
	  res.status(200).send(savedClient);
	} catch (err) {
	  console.error(err);
	  res.status(500).send({ message: "Error updating client's mappedData", err });
	}
  });

module.exports = router;
