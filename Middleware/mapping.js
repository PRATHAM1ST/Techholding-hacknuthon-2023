const express = require("express");
const router = express.Router();
const Data = require("../Database/DataSchema");
const Client = require("../Database/ClientSchema");
const lodash = require("lodash");

const mappingTemplate = {
  first_name: "first",
  last_name: "last",
  age: "age",
  email: "email",
  phoneNumber: "phone_number",
  address: "address",
  city: "city",
  state: "state",
  zipCode: "zip_code",
  gender: "gender"
};

router.get("/mapKeys", async (req, res) => {
  try {
    const data = await Data.find({});
    const mappedData = data.map((item) => lodash.mapKeys(item.toObject(), (value, key) => mappingTemplate[key] || key));
    res.status(200).send(mappedData);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error fetching data", err });
  }
});

router.get("/mapKeys/:clientId", async (req, res) => {
  try{
    const client = await Client.findById(req.params.clientId);
    const data = await Data.find({});
    const mappedData = data.map((item) => lodash.mapKeys(item.toObject(), (value, key) => client.mappedData[key] || key));
    res.status(200).send(mappedData);
  }
  catch(err){
    console.error(err);
    res.status(500).send({ message: "Error fetching data", err });
  }
});

module.exports = router;
