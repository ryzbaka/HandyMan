const express = require("express"); //import express library
const path = require("path"); //import path library for joining paths
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const Users = require("./models/Users"); //schema
const Courses = require("./models/Courses");
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
app.get("/sign_in", function(req, res) {
  console.log(req.url);
  res.sendFile(path.join(__dirname, "sign_in.html"));
});
app.get("/learn/:someCourse", function(req, res) {
  console.log(req.url);
  requiredFile = req.url.split("/")[2] + ".html";
  res.sendFile(path.join(__dirname, requiredFile));
});
app.get("/profile", function(req, res) {
  console.log(req.url);
  res.sendFile(path.join(__dirname, "profile.html"));
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
        newUser.save();
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
app.post("/sign_in/send_details", async function(req, res) {
  //this is reponsible for 1)checking if username exists, then fetching details 2) comparing plaintext password sent from front to the encrypted passweord received from database
  //1) Checking if user exists
  const username = req.body.username;
  const sentPassword = req.body.password;
  const foundUser = await Users.findOne({ username: username });
  //console.log(foundUser)
  if (foundUser) {
    //user found. Validate password
    const actualPassword = foundUser.password;
    const result = bcrypt.compare(sentPassword, actualPassword, function(
      err,
      result
    ) {
      if (result) {
        res.send({ message: "Authentication successful", exists: true });
      } else {
        res.send({ message: "Incorrect password.", exists: true });
      }
    });
  } else {
    res.send({ message: "User does not exist.", exists: false });
  }
});
//Database Logic ~ Track Progress
//If user clicks the learn button on a course, then add a record with
//the coursename,total(number of modules) and username if not already in the database
//add 1 to the progress(which is default 1) when user clicks a module
//the user is forced to move sequentially.
app.post("/progress/fetch_progress", async function(req, res) {
  const totals = {
    "isl-alphabets": 12
  };
  const foundEnrolled = await Courses.findOne({
    username: req.body.username,
    coursename: req.body.courseName
  });
  if (foundEnrolled) {
    res.send(foundEnrolled);
  } else {
    const userName = req.body.username;
    const courseName = req.body.courseName;
    const total = totals[courseName];
    const newEnrollment = new Courses({
      coursename: courseName,
      username: userName,
      total: total
    });
    try {
      newEnrollment.save();
      res.json({ message: `${userName} has been enrolled in ${courseName}` });
    } catch (err) {
      res.json({ message: err });
    }
  }
});
//Update progress
app.patch("/progress/update_progress",async function(req,res){
  const user=req.body.username
  const course=req.body.courseName
  const data={
    username:user,
    courseName:course
  }
  const something=await Courses.findOneAndUpdate({username:user,coursename:course},{$set:{progress:req.body.progress}})
  res.json(something)
})

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
