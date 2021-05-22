const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const users = require("../models/users");
const jwt = require("jsonwebtoken");
var config = require("../config");
const { verifyToken } = require("../middlewares/verifyToken");
const visitors = require("../models/visitors");

const router = express.Router();
router.use(bodyParser.json());

router.route("/login").post((req, res, next) => {
  console.log("Inside AdminRouter Login");
  users
    .find({ mobile_number: req.body.mobile_number })
    .then((data) => {
      bcrypt.compare(req.body.password, data[0].password, (error, verify) => {
        if (error) {
          console.log(error);
          res.status(503).json({
            message: "Bcryptjs Error",
          });
        } else if (verify === false || data[0].admin == false) {
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
              residential_id: data[0].residential_id,
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
      number_plate: req.body.number_plate,
      admin: true,
      verified: true,
    };
    users
      .create(newUser)
      .then(
        (data) => {
          console.log("New user  created" + data);
          res.statusCode = 200;
          res.setHeader("content-type", "application/json");
          res.json(data);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });
});

router.route("/addSociety").post(verifyToken, (req, res, next) => {
  console.log("Inside Add Society");
  var { society_name, address, pincode } = req.body;
  const newSociety = {
    society_name,
    address,
    pincode,
  };
  residential
    .create(newSociety)
    .then(
      (data) => {
        console.log("Society created" + data);
        res.statusCode = 200;
        res.setHeader("content-type", "application/json");
        res.json(data);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

router.route("/getallusers").get(verifyToken, (req, res, next) => {
  console.log("Inside admin router getallusers");
  residential_id = req.payload.residential_id;

  users
    .find({ residential_id: residential_id })
    .select({ password: 0, residential_id: 0 })
    .then(
      (user) => {
        console.log(user);
        res.statusCode = 200;
        res.setHeader("content-type", "application/json");
        res.json(user);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

router.route("/getRecentVisitor").get(verifyToken, (req, res, next) => {
  console.log("Inside AdminRouter getRecentVisitor");
  residential_id = req.payload.residential_id;
  visitors
    .find({ residential_id: residential_id })
    .sort({ createdAt: -1 })
    .limit(20)
    .then(
      (visitor) => {
        res.status(200).json(visitor);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

//Dashboard
router.route("/getUserInfo").get(verifyToken, (req, res, next) => {
  console.log("getuserInfo");
  users
    .findOne({ mobile_number: req.payload.mobile_number })
    .select({ password: 0, residential_id: 0 })
    .then(
      (user) => {
        res.status(200).json(user);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

router.route("/getcount").get(verifyToken, (req, respond, next) => {
  residential_id = req.payload.residential_id;
  const res = [];
  console.log("inside");
  visitors
    .countDocuments({ residential_id: residential_id })
    .then(
      (countVisitor) => {
        res.push({ TotalVisitorsCount: countVisitor });
        visitors
          .countDocuments({ verified: false, residential_id: residential_id })
          .then((countVisitor) => {
            res.push({ TotalUnregisteredVisitorsCount: countVisitor });
            users
              .countDocuments({
                residential_id: residential_id,
                verified: true,
              })
              .then((residents) => {
                res.push({ TotalResidents: residents });
                users
                  .countDocuments({
                    verified: false,
                    residential_id: residential_id,
                  })
                  .then((residents) => {
                    res.push({ TotalUnregisteredResidents: residents });
                    respond.status = 200;
                    respond.json(res);
                  });
              });
          });
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

router.route("/getPieChartData").get(verifyToken, (req, res, next) => {
  console.log("Inside AdminRouter getPieChartData");
  residential_id = req.payload.residential_id;
  visitors
    .countDocuments({ residential_id: residential_id })
    .then(
      (countVisitor) => {
        visitors
          .countDocuments({ verified: false, residential_id: residential_id })
          .then((countUnregisteredVisitor) => {
            console.log(countVisitor, countUnregisteredVisitor);
            res.status(200).json([
              {
                name: "Registered",
                y:
                  ((countVisitor - countUnregisteredVisitor) / countVisitor) *
                  100,
                sliced: true,
                selected: true,
              },
              {
                name: "Visitors",
                y: (countUnregisteredVisitor / countVisitor) * 100,
              },
            ]);
          });
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

router.route("/getunverifiedusers").get(verifyToken, (req, res, next) => {
  residential_id = req.payload.residential_id;
  users
    .find({ residential_id: residential_id, verified: false })
    .select({ password: 0, residential_id: 0 })
    .sort({ createdAt: -1 })
    .then(
      (users) => {
        res.status(200).json(users);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

router.route("/verifyusers").post(verifyToken, (req, res, next) => {
  residential_id = req.payload.residential_id;
  var arrayIds = req.body.arrayIds;
  var value = { verified: true };
  users
    .updateMany({ _id: { $in: arrayIds } }, { $set: value }, { multi: true })
    .then(
      (user) => {
        res.status(200).json(user);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

router.route("/graph").get(verifyToken, (req, res, next) => {
  let residential_id = req.payload.residential_id;
  console.log(new Date(Date.now() - 24 * 60 * 60 * 1000));
  visitors
    .aggregate([
      {
        $match: {
          createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        },
      },
      {
        $project: {
          realHour: {
            $hour: "$createdAt",
          },
          diff: {
            $hour: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      },
      {
        $group: {
          _id: {
            $subtract: ["$realHour", "$diff"],
          },
          count: { $sum: 1 },
        },
      },
    ])
    .then((visitor) => {
      console.log(visitor);
      let newData = [];
      for (let i = 0; i < visitor.length; i++) {
        if (visitor[i]._id || visitor[i]._id === 0) {
          newData[visitor[i]._id] = visitor[i].count;
        }
      }
      for (let i = 0; i < 24; i++) {
        if (newData[i] == undefined) {
          newData[i] = 0;
        }
      }
      console.log(newData);
      res.status(200).json(newData);
    });
});

router.route("/profileUpdate").post(verifyToken, (req, res, next) => {
  var mobile_number = req.payload.mobile_number;
  console.log(req.body);
  users
    .updateOne(
      { mobile_number: mobile_number },
      { $set: req.body.users },
      { $new: true }
    )
    .then(
      (user) => {
        res.status(200).json(user);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

module.exports.router = router;
