const express = require("express");
const router = express.Router();
const convert = require("xml-js");
const Data = require("../Database/DataSchema");

// Endpoint for converting XML to JSON
router.post("/xmltojson", async (req, res) => {
  try {
    const xmlData = req.body;
    console.log('xmlData: ', xmlData);
    const jsonData = convert.xml2json(xmlData, { compact: true, spaces: 4 });
    const parsedData = JSON.parse(jsonData);
    // const result = await Data.create(parsedData);
    res.status(200).json({ message: "XML converted to JSON", parsedData });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error converting XML to JSON", err });
  }
});

module.exports = router;
