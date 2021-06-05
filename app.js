var express = require("express");
var config = require("./config");
const http = require("http");
var mongoose = require("mongoose");
var app = express();

var index = require("./routes/index");

const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect.then(
  (db) => {
    console.log("Sucessfully Connected to the server");
  },
  (err) => {
    console.log(err);
  }
);

const port = process.env.PORT || 3000;

app.use("/", index.router);

const server = http.createServer(app);
app.listen(port, () => {
  console.log(`server running on ${port}`);
});
