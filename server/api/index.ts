
const path = require("path");

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;