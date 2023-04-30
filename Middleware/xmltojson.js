const express = require("express");
const router = express.Router();
const convert = require("xml-js");
const Data = require("../Database/DataSchema");

function cleanParsedData(parsedData) {
  const cleanedData = {};
  delete parsedData._id;
  for (const key in parsedData) {
    if (Object.hasOwnProperty.call(parsedData, key)) {
      const element = parsedData[key];
      if (Array.isArray(element) && element.length === 1) {
        cleanedData[key] = element[0];
      } else if (typeof element === "object") {
        cleanedData[key] = cleanParsedData(element);
      } else {
        cleanedData[key] = element;
      }
    }
  }
  return cleanedData;
}

module.exports =  async function xmltojson(req, res, next) {
  try {
    const xmlData = req.body;
    console.log('xmlData: ', xmlData);
    // const jsonData = convert.xml2json(xmlData, { compact: true, spaces: 4 });
    // const parsedData = JSON.parse(jsonData);
    const cleanedData = cleanParsedData(xmlData);
    // const result = await Data.create(cleanedData);
    res.status(200).json({ ...cleanedData });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error converting XML to JSON", err });
  }
  next();
}


// // Endpoint for converting XML to JSON
// router.post("/xmltojson", async (req, res) => {
//   try {
//     const xmlData = req.body;
//     console.log('xmlData: ', xmlData);
//     // const jsonData = convert.xml2json(xmlData, { compact: true, spaces: 4 });
//     // const parsedData = JSON.parse(jsonData);
//     const cleanedData = cleanParsedData(xmlData);
//     // const result = await Data.create(cleanedData);
//     res.status(200).json({ ...cleanedData });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: "Error converting XML to JSON", err });
//   }
// });


// module.exports = router;
