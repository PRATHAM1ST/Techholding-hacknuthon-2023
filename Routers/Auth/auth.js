const express = require("express");
const router = express.Router();
const Client = require("../../Database/ClientSchema");
var sha512 = require('js-sha512');

// Middle ware for user authentication from header with username and password
router.use(async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ error: "Unauthorized" });
    }
    const token = sha512(authorization);
    const client  = await Client.findOne({ token: token })
    if (!client) {
        return res.status(401).send({ error: "Unauthorized" });
    }
    req.client = client;
    next(client);
});

module.exports = router;