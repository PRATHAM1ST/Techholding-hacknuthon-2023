const express = require("express");
const router = express.Router();
const Client = require("../../Database/ClientSchema");


// Middle ware for user authentication from header with username and password
router.use((req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ error: "Unauthorized" });
    }
    const [username, password] = authorization.split(":");
    const client  = Client.findOne({ username, password }, (err, client) => client)
    console.log('client: ', client);
    if (!client) {
        return res.status(401).send({ error: "Unauthorized" });
    }
    req.client = client;
    next();
});

module.exports = router;