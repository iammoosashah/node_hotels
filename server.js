const express = require('express')
const app = express();
const db = require("./db");

const bodyparser = require("body-parser");
app.use(bodyparser.json());

app.get('/', function (req, res) {
    res.send('hello World')
})
app.get("/next", (req, res) => {
    res.send('helllloooooooo')
})
const personRoutes = require("./routes/personRoutes")
app.use("/person", personRoutes);
const menuRoutes = require("./routes/menuRoutes")
app.use("/menu", menuRoutes);

app.listen(3000, () => {
    console.log("server is running on port 3000")
})
