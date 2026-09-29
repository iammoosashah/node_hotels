const mongoose = require("mongoose");
const mongoURL = "mongodb://127.0.0.1:27017/practice"

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on("connected", () => {
    console.log("connected")
})
db.on("error", () => {
    console.log("error")
})
db.on("disconnected", () => {
    console.log("disconnected")
})

module.exports = db;