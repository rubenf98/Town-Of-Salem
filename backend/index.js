var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')
var env = require("dotenv").config().parsed;
var mongoose = require("mongoose");
var http = require('http');

//Routes
const menuRoutes = require("./routes/menu");
const authRoutes = require("./routes/auth");

var urlParser = bodyParser.urlencoded({ extended: false });
const app = express();
var server = http.Server(app);

app.use(urlParser);
app.use(express.json());
app.use(cookieParser());

app.use("/api/menu", menuRoutes);
app.use("/api", authRoutes);

mongoose
    .connect("mongodb://" + env.DB_HOST + "/" + env.DB_USER, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.error("Could not connect to MongoDB..."));

server.listen(env.DB_PORT, () => {
    console.log(`Listening on port ${env.DB_PORT}`);
});