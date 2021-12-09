// -=-=-=-=-=-= Importing modules =-=-=-=-=-=-=-
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const formidable = require("formidable");
const fs = require("fs");
require("dotenv").config();
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// -=-=-=-=-=-= Setting up app =-=-=-=-=-=-=-
const app = express();
app.use("/uploads/", express.static("uploads"));

// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(bodyParser.json({ limit: "50mb", extended: true }));
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// -=-=-=-=-=-=-=-=-=-= Database =-=-=-=-=-=-=-=-=-=-=-
// mongoose.connect("mongodb://localhost:27017/leafyDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongoose.connect(
//   // `mongodb+srv://leafyAdmin:${process.env.DB}@cluster0.6z92i.mongodb.net/LeafyDB?retryWrites=true&w=majority`,
//   `mongodb+srv://admin-dart:${process.env.DB}@cluster0.olp8q.mongodb.net/LeafyDB`,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

mongoose.connect(
  `mongodb+srv://admin-dart:${process.env.DB}@cluster0.olp8q.mongodb.net/LeafyDB`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const userSchema = new mongoose.Schema({
  name: String,
  nickName: String,
  password: String,
  phone: Number,
  email: String,
  menuHistory: String,
  country: String,
  avatar: String,
  ingredientsList: String,
});

const User = mongoose.model("user", userSchema);

const user = new User({
  name: "Default User",
  nickName: "User",
  password: "password123",
  email: "user@email.com",
  country: "",
  avatar: "",
  menuHistory: "",
  ingredientsList: "",
});
// User.deleteOne({ email: "user@email.com" }, function (err) {
//   console.log(err);
// });
User.findOne({}, function (user, err) {
  console.log(user);
});
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
var corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3000/Profile",
    process.env.PORT,
  ],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// -=-=-=-=-=-=-=-=-=-= Add new user =-=-=-=-=-=-=-=-=-=-=-
app.post("/", bodyParser.json(), function (req, res) {
  const userInfo = req.body;
  User.findOne({ email: userInfo.email }, function (err, user) {
    if (err) {
      console.log(err);
      res.send(false);
    }
    if (!user) {
      console.log("create user");
      const user = new User({
        email: userInfo.email,
        password: userInfo.password,
      });
      const newUser = {};
      console.log(Object.keys(user._doc));
      Object.keys(user._doc).forEach((key) => {
        if (key === "password") return;
        newUser[key] = user[key];
      });
      user.save();
      console.log(newUser);
      res.send(newUser);
    } else {
      console.log("email its been used already");
      res.send(false);
    }
  });
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
      console.log(fields);
      User.updateOne({ _id: fields._id }, fields, function (err) {
        console.log("UPDATED");
        if (err) {
          console.log(err);
        }
      });
    }

    if (files.avatar) {
      User.updateOne(
        { _id: fields._id },
        { avatar: files.avatar.path.replace(__dirname, "") },
        function (err) {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    console.log(fields);
    User.findOne({ _id: fields._id }, (err, user) => {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        console.log(user);
        res.send(user);
      }
    });
  });
});

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// -=-=-=-=-=-=-=-=-=-= Update user's menu =-=-=-=-=-=-=-=-=-=-=-
app.patch(
  "/menu",
  bodyParser.json({ limit: "25mb", extended: true }),
  function (req, res) {
    let newMenu;
    console.log(req.body);
    User.find({ _id: req.body.id }, (err, user) => {
      if (err) return err;
      const savedMenu = user[0].menuHistory
        ? JSON.parse(user[0].menuHistory)
        : {};
      const updateInfo = req.body.menu;
      if (Object.keys(savedMenu).length === 0) {
        newMenu = { ...updateInfo };
      } else {
        newMenu = { ...savedMenu, ...updateInfo };
      }

      User.updateOne(
        { _id: req.body.id },
        { menuHistory: JSON.stringify(newMenu) },
        (err) => {
          if (err) console.log(err);
          User.findOne({ _id: req.body.id }, function (err, user) {
            if (err) console.log(err);
            res.send(user);
          });
        }
      );
    });
  }
);
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// -=-=-=-=-=-=-=-=-=-= Save Ingredients List =-=-=-=-=-=-=-=-=-=-=-
app.post(
  "/saveIngredients",
  bodyParser.json({ limit: "25mb", extended: true }),
  (req, res) => {
    console.log(req.body.ingredientList);
    User.updateOne(
      { _id: req.body.id },
      { ingredientsList: req.body.ingredientList },
      (err) => {
        if (err) console.log(err);
      }
    );
    res.send(req.body.ingredientList);
  }
);
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// -=-=-=-=-=-=-=-=-=-= Delete Ingredients List =-=-=-=-=-=-=-=-=-=-=-
app.put(
  "/deleteIngredients",
  bodyParser.json({ limit: "25mb", extended: true }),
  (req, res) => {
    console.log(req.body);
    User.updateOne({ _id: req.body.id }, { ingredientsList: "" }, (err) => {
      if (err) console.log(err);
    });
    res.send(JSON.stringify({}));
  }
);
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// -=-=-=-=-=-=-=-=-=-= User's Login =-=-=-=-=-=-=-=-=-=-=-
app.post("/login", bodyParser.json({ extended: false }), (req, res) => {
  const userInfo = req.body;
  console.log(userInfo);

  User.findOne(
    { email: userInfo.email, password: userInfo.password },
    (err, user) => {
      if (err) {
        console.log("not found - ", err);
      } else if (!user) {
        res.send(false);
      } else {
        const userLogged = {};
        console.log(Object.keys(user._doc));
        Object.keys(user._doc).forEach((key) => {
          if (key === "password") return;
          userLogged[key] = user._doc[key];
        });

        res.send(!user ? false : userLogged);
      }
    }
  );
});
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
let port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log("Listening...");
});
