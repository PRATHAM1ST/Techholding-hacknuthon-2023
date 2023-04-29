const express = require("express");
const app = express();
const port = 3000;
const xmlbodyparser = require("express-xml-bodyparser");

const dbconnet = require("./Database/Connection");

dbconnet();

app.use(express.json());
app.use(xmlbodyparser());

const fetchingRouter = require("./Routers/Fetch/fetch");
const creatingRouter = require("./Routers/Create/create");
const updatingRouter = require("./Routers/Update/update");
const deletingRouter = require("./Routers/Delete/delete");

const jsontoxmlRouter = require("./Middleware/jsontoxml");
const xmltojsonRouter = require("./Middleware/xmltojson");
const mappingRouter = require("./Middleware/mapping");
const graphqltojsonRouter = require("./Middleware/graphqltojson");

app.use(fetchingRouter);
app.use(creatingRouter);
app.use(updatingRouter);
app.use(deletingRouter);

app.use(jsontoxmlRouter);
app.use(xmltojsonRouter);
app.use(mappingRouter);
app.use(graphqltojsonRouter);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
