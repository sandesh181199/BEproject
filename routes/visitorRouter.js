const express = require("express");
const bodyParser = require("body-parser");
const User = require("../models/users");
const residential = require("../models/residential");
const visitors = require("../models/visitors");
const numberplate = require("../models/visitors");
// const cors = require('./cors');
const axios = require('axios');
const { response } = require("express");
const registeredVisitor = require('../models/registeredVisitors')

const router = express.Router();
router.use(bodyParser.json());

router.route("/checkvisitors")
.post((req, res, next) => {
  // console.log("Inside checkvisitor")
  var numberplate = req.body.numberplate;
  console.log(numberplate)
  var residential_id = "608d6f00011dbc9826b29520";
  //    User.find({residential_id:residential_id})
  //     .then(result=>{
  //         // User.find({numberplate : numberplate})
  //         // .then(final=>{
  //         //     console.log(final)
  //         // })
  //         console.log(result[0].numberplate, numberplate)
  //         if(result[0].numberplate===numberplate)
  //         {
  //             res.statusCode = 200;
  //             res.setHeader('content-type','application/json');
  //             res.json({Resident : true });
  //         }
  //         else{
  //             var newVisitor = {
  //                 visitor_number_plate : numberplate,
  //                 residential_id
  //             }
  //             visitors.create(newVisitor)
  //             .then(response=> {
  //                 res.statusCode = 200;
  //                 res.setHeader('content-type','application/json');
  //                 res.json({Resident : false, Visitor: response});

  //             },(err) => next(err)).catch((err)=> next(err))

  //         }
  //     },(err) => next(err)).catch((err)=> next(err))

  User.find({ number_plate:  {$eq : numberplate}})
    .then(
      (result) => {
        if (result.length == 0) {
          axios.post("http://127.0.0.1:3000/numberplate/getdetails", {
            numberplate : numberplate
          })
          .then(response=> {
            var data = response.data[0]
            registeredVisitor
            .find({mobile_number : data.mobile_number })
            .then(result=> {
              console.log("INSIDE RESULT"+result.length)
              if(result.length!=0)
              {
                var newVisitor = {
                  visitor_number_plate: numberplate,
                  residential_id,
                  verified : true
                };
                   visitors
                    .create(newVisitor)
                  .then(
                  (response) => {
                      res.statusCode = 200;
                      res.setHeader("content-type", "application/json");
                      res.json({ Resident: false, Visitor: response });
                      registeredVisitor.deleteOne({mobile_number : data.mobile_number})
                      .then(res=> {
                        console.log("VISITOR DELETED FROM REGISTERED VISITOR" + res)
                      })
                  },(err) => next(err)
              )
              .catch((err) => next(err));
              }
              else{
                var newVisitor = {
                  visitor_number_plate: numberplate,
                  residential_id,
                  verified : false
                };
                   visitors
                    .create(newVisitor)
                  .then(
                  (response) => {
                      res.statusCode = 200;
                      res.setHeader("content-type", "application/json");
                      res.json({ Resident: false, Visitor: response });
                  },(err) => next(err)
              )
              .catch((err) => next(err));
              }            
            })
            
          })
          .catch(err=> {
            console.log("ERRROR"+err)
          })
        } else {
          console.log(true);
          res.statusCode = 200;
          res.setHeader("content-type", "application/json");
          res.json({ Resident: true });
        }
      }
      // (err) => next(err)
    )
    .catch((err) => next(err));
});

router.route("/postusers").post((req, res, next) => {
  console.log("Inside postusers");
  var {
    residential_id,
    numberplate,
    password,
    firstname,
    lastname,
    email_id,
    mobile_number,
  } = req.body;
  const newUser = {
    residential_id,
    numberplate,
    password,
    firstname,
    lastname,
    email_id,
    mobile_number,
  };
  User.create(newUser)
    .then(
      (user) => {
        console.log("User created" + user);
        res.statusCode = 200;
        res.setHeader("content-type", "application/json");
        res.json(user);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

router.route("/newvisitor").post((req, res, next) => {
  console.log("Inside Visitor");
  var { visitor_number_plate, residential_id } = req.body;
  const newVisitor = {
    visitor_number_plate,
    residential_id,
  };
  numberplate
    .create(newVisitor)
    .then(
      (data) => {
        console.log("New Visitor Created" + data);
        res.statusCode = 200;
        res.setHeader("content-type", "application/json");
        res.json(data);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

module.exports.router = router;
