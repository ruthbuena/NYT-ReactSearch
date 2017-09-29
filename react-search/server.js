'use strict'

//Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// Article Model
const Article = require("./models/Article");

// Express
const app = express();

// PORT
const PORT = process.env.PORT || 8080;

// Run Morgan for Logging Issues
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("./public"));

// MongoDB Connection
mongoose.connect("mongodb://heroku_INSERTHEROKUMONGOhere");

var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Route to get all saved articles.
app.get("/api/saved", function(req, res) {
  Article.find({}).limit(10).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// Main route
app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Route to save/post articles
app.post("/api/saved", function(req, res) {
  console.log("Article title: " + req.body.title);
  console.log("Article date: " + req.body.date);
  console.log("Article url: ") + req.body.url;

  Article.create({
    title: req.body.title,
    date: req.body.date,
    url: req.body.url
  }, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Saved Article");
    }
  });
});

// Route to delete
app.delete("/api/saved/:id", function(req, res) {
  console.log("Article ID to delete: " + req.params.id);
  Article.findByIdAndRemove(req.params.id, function (err, response) {
    if(err){
      res.send("Delete didn't work: " + err);
    }
    res.send(response);
  });
});

app.listen(PORT, () => {
  console.log("App listening on PORT: " + PORT);
});
