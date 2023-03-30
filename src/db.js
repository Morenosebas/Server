const mongoose = require("mongoose")
const dotenv = require("dotenv");
const URI = process.env.MONGOD_URI
    ? process.env.MONGOD_URI
    : "mongodb://127.0.0.1:27017/StoreApi";

mongoose
    .set("strictQuery", false)
    .connect(URI)
    .then(data => console.log("DB is connected"))
    .catch(err => console.error("Error connecting to"));
module.exports = mongoose;