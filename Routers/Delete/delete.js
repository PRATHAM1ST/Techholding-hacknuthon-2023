const express = require("express");
const router = express.Router();
const User = require("../../Database/DataSchema");

// Endpoint for deleting a user
router.delete("/user/:id", async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			return res.status(404).send({ message: "User not found" });
		}
		res.status(200).send({ message: "User deleted" });
	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Error deleting user", err });
	}
});

module.exports = router;
