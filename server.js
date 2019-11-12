const express = require("express"); //import express library
const path = require("path"); //import path library for joining paths
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const Users = require("./models/Users"); //schema
const bcrypt = require("bcryptjs");

require("dotenv/config");

app.use(bodyParser.json());

app.get("/", function(req, res) {
  console.log(req.url);
  res.sendFile(path.join(__dirname, "homepage.html"));
});
app.get("/team", function(req, res) {
  console.log(req.url);
  res.sendFile(path.join(__dirname, "teampage.html"));
});
app.get("/sign_up", function(req, res) {
  console.log(req.url);
  res.sendFile(path.join(__dirname, "sign_up.html"));
});
app.get("/view_progress", function(req, res) {
  console.log(req.url);
  res.sendFile(path.join(__dirname, "view_progress.html"));
});
app.get("/playground", function(req, res) {
  console.log(req.url);
  res.sendFile(path.join(__dirname, "playground.html"));
});
app.get("/learn", function(req, res) {
  console.log(req.url);
  res.sendFile(path.join(__dirname, "learn.html"));
});


//Database logic ~ Sign Up
app.post("/sign_up/send_details", async function(req, res) {
  console.log(req.url);
  const newUser = new Users({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password
  });
  try {
    //Hash the password
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        //set password to hashed
        newUser.password = hash;
        newUser.save()
      })
    );
    //const savedUser=await user.save()
    res.json({ message: "user creation successful" });
  } catch (err) {
    res.json({ message: err });
  }
});

app.get("/sign_up/get_details/:username", async function(req, res) {
  try {
    const userName = req.params.username;
    const existingUser = await Users.find({ username: userName });
    res.json(existingUser);
  } catch (err) {
    res.json({ message: "Unique" });
  }
});
//
//Database Logic ~ Sign In


//




app.use(express.static(__dirname + "/public/")); //public data
const port = 3001;
mongoose.connect(
  process.env.DB_CONNECTION, //environment variable
  { useNewUrlParser: true },
  function() {
    console.log("connected to db...");
  }
);
app.listen(port);

console.log(`listening on port ${port}`);
