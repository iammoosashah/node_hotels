const express = require('express')
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require('./auth');
const bodyparser = require("body-parser");

app.use(bodyparser.json());
const PORT = process.env.PORT || 3000;

//middleware
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} Request made to ${req.originalUrl}`);
    next();
}

app.use(logRequest);


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', { session: false });

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


app.listen(PORT, () => {
    console.log("server is running on port 3000")
})
