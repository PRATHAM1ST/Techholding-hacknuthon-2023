const express = require("express");
const router = express.Router();

const Client = require("../../Database/ClientSchema");

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
