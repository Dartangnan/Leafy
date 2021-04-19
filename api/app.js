// -=-=-=-=-=-= Importing modules =-=-=-=-=-=-=-
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const formidable = require("formidable");
const fs = require("fs");
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// -=-=-=-=-=-= Setting up app =-=-=-=-=-=-=-
const app = express();
app.use("/uploads/", express.static("uploads"));

// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(bodyParser.json({ limit: "50mb", extended: true }));
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// -=-=-=-=-=-=-=-=-=-= Database =-=-=-=-=-=-=-=-=-=-=-
mongoose.connect("mongodb://localhost:27017/leafyDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  nickName: String,
  password: String,
  phone: Number,
  email: String,
  menuHistory: String,
  country: String,
  avatar: String,
});

const User = mongoose.model("user", userSchema);

const user = new User({
  name: "Dartangnan Moreira Theml",
  nickName: "Dart",
  password: "user123",
  phone: 1234567788,
  email: "dart_theml@email.com",
  country: "",
  avatar: "",
  menuHistory: "",
});
// user.save();
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
var corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3000/Profile"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// -=-=-=-=-=-=-=-=-=-= Add new user =-=-=-=-=-=-=-=-=-=-=-
app.post("/", function (req, res) {
  const objReq = req.body;
  res.send(true);
});
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// -=-=-=-=-=-=-=-=-=-= Update user information =-=-=-=-=-=-=-=-=-=-=-
app.patch("/", (req, res, next) => {
  const form = formidable({
    multiple: true,
    keepExtensions: true,
    uploadDir: __dirname + "/uploads/",
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    if (fields) {
      User.updateOne({ name: fields.name }, fields, function (err) {
        if (err) {
          console.log(err);
        }
        console.log("UPDATED FIELDS");
      });
    }

    if (files.avatar) {
      // console.log(typeof files);
      // console.log(files.avatar.path.replace(__dirname, ""));
      User.updateOne(
        { name: fields.name },
        { avatar: files.avatar.path.replace(__dirname, "") },
        function (err) {
          if (err) {
            console.log(err);
          }
          console.log("UPDATED FILE");
        }
      );
    }
    User.find((err, user) => {
      // console.log(user);
    });
    res.send(true);
  });
});

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// -=-=-=-=-=-=-=-=-=-= Retrieve user's information =-=-=-=-=-=-=-=-=-=-=-
app.get("/", function (req, res) {
  const userInfo = req.body;
  User.find((err, user) => {
    if (err) return err;
    // console.log(user);
    res.send(user[0]);
  });
});
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// -=-=-=-=-=-=-=-=-=-= Update user's menu =-=-=-=-=-=-=-=-=-=-=-
app.patch(
  "/menu",
  bodyParser.json({ limit: "25mb", extended: true }),
  function (req, res) {
    User.find({ _id: req.body.id }, (err, user) => {
      if (err) return err;
      const savedMenu = JSON.parse(user[0].menuHistory);
      const updateInfo = req.body.menu;
      const newMenu = { ...savedMenu, ...updateInfo };

      User.updateOne(
        { _id: req.body.id },
        { menuHistory: JSON.stringify(newMenu) },
        (err) => {
          if (err) console.log(err);
        }
      );
    });

    res.send(true);
  }
);

app.listen(3001, function () {
  console.log("Listening on port 3001");
});

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
