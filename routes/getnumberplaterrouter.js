const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const users = require("../models/users");
const jwt = require("jsonwebtoken");
const config = require("../config");
const verifyToken = require("../middlewares/verifyToken");
const globalnumberplate = require('../models/globalnumberplate')

const router = express.Router();
router.use(bodyParser.json());

router.route("/getdetails")
.post((req, res, next) => {
    const numberplate = req.body.numberplate;
    globalnumberplate.find({number_plate:numberplate})
    .then((info)=> {
        res.status(200).json(info);
    }, (err) => next(err))
    .catch((err) => next(err));  
});



module.exports.router = router;
