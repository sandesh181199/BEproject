const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const users = require('../models/users');
const jwt = require('jsonwebtoken');
var config = require('../config');
const { verifyToken } = require('../middlewares/verifyToken');



const router = express.Router();
router.use(bodyParser.json());

router.route('/register')
    .post((req, res, next) => {
        console.log('Inside AdminRouter Register');
        bcrypt.hash(req.body.password, 8, (error, hash) => {
            let newUser = {
                residential_id: req.body.residential_id,
                password: hash,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email_id: req.body.email_id,
                mobile_number: req.body.mobile_number,
                admin: true
            }
            users.create(newUser).then(data => {
                console.log("New user  created" + data);
                res.statusCode = 200;
                res.setHeader('content-type', 'application/json');
                res.json(data);
            }, (err) => next(err)).catch((err) => next(err))
        })
    })

router.route('/getallusers')
.get((req,res,next)=> {
    console.log("Inside admin router getallusers");

    users.find().then(user=>{
        console.log(user)
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.json(data);
    },  (err) => next(err)).catch((err) => next(err))

})


//Dashboard
router.route('/getUserInfo')
.get(verifyToken,(req,res,next)=>{
    console.log('getuserInfo');
    return res.status(200).json({payload : req.payload});
})
//getAllUsers

//getAllVisitors

//get Unverified users


module.exports.router = router;