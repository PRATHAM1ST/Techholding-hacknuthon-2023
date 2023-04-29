const express = require("express");
const router = express.Router();
const Data = require("../Database/DataSchema");
const convert = require("xml-js");

// Endpoint for getting one user as XML
router.get("/jsontoxml/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Data.findOne({ _id: id });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const userXml = convert.js2xml(
      { user: user.toObject({ getters: true }) },
      { compact: true, spaces: 4 }
    );

    res.set("Content-Type", "application/xml");
    res.status(200).send(userXml);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error fetching user data", err });
  }
});

module.exports = router;
