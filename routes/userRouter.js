const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const users = require("../models/users");
const jwt = require("jsonwebtoken");
const config = require("../config");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();
router.use(bodyParser.json());

router.route("/register").post((req, res, next) => {
  console.log("Inside AdminRouter Register");
  bcrypt.hash(req.body.password, 8, (error, hash) => {
    let newUser = {
      residential_id: req.body.residential_id,
      password: hash,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email_id: req.body.email_id,
      mobile_number: req.body.mobile_number,
      admin: false,
      verified: false,
    };
    users
      .create(newUser)
      .then(
        (data) => {
          console.log("New User Registered" + data);
          res.statusCode = 200;
          res.setHeader("content-type", "application/json");
          res.json(data);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });
});

router.route("/login").post((req, res, next) => {
  console.log("Inside UserRouter Login");
  users
    .find({ mobile_number: req.body.mobile_number })
    .then((data) => {
      bcrypt.compare(req.body.password, data[0].password, (error, verify) => {
        if (error) {
          console.log(error);
          res.status(503).json({
            message: "Bcryptjs Error",
          });
        } else if (verify === false) {
          res.status(400).json({
            message: "Wrong Username or Password",
          });
        } else {
          jwt.sign(
            {
              userid: data[0]._id,
              email_id: data[0].email_id,
              mobile_number: data[0].mobile_number,
              society_name: data[0].society_name,
            },
            config.secretKey,
            (error, token) => {
              if (error) {
                console.log(error);
                res.status(500).json({ message: "Token generation Failed" });
              } else {
                // token generated
                console.log("Token generated");
                res.status(200).json({ token: token });
              }
            }
          );
        }
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports.router = router;
