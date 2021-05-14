const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const users = require('../models/users');
const jwt = require('jsonwebtoken');
var config = require('../config');
const { verifyToken } = require('../middlewares/verifyToken');
const visitors = require('../models/visitors');



const router = express.Router();
router.use(bodyParser.json());



router.route('/login')
    .post((req, res, next) => {
        console.log('Inside AdminRouter Login');
        users.find({mobile_number : req.body.mobile_number}).then(data =>{
            bcrypt.compare(req.body.password, data[0].password, (error, verify) =>{
                if (error) {
                    console.log(error);
                    res.status(503).json({
                        message: "Bcryptjs Error"
                    });
                } else if (verify === false) {
                    res.status(400).json({
                        message: "Wrong Username or Password"
                    });
                } else {
                    jwt.sign({
                        userid: data[0]._id,
                        email_id : data[0].email_id,
                        mobile_number : data[0].mobile_number,
                        society_name : data[0].society_name,
                        residential_id : data[0].residential_id
                    }, config.secretKey, (error, token) => {
                        if (error) {
                            console.log(error);
                            res.status(500).json({ message: "Token generation Failed" });
                        } else {
                            // token generated
                            console.log('Token generated');
                            res.status(200).json({token : token});
                        }
                    });
                }
            })
        }).catch(err => {
            res.status(500).json({message : err.message});
        })
    })

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
.get(verifyToken, (req,res,next)=> {
    console.log("Inside admin router getallusers");
    residential_id = req.payload.residential_id


    users.find({verified : true, residential_id: residential_id}).then(user=>{
        console.log(user)
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.json(user);
    },  (err) => next(err)).catch((err) => next(err))
})

router.route('/getrecentvisitor')
.get( verifyToken, (req,res,next)=> {
    residential_id = req.payload.residential_id
    visitors.find().sort({createdAt : 1, residential_id: residential_id}).limit(20).then(visitor=> {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.json(visitor);
    }, (err) => next(err)).catch((err) => next(err))
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

//totalvisitorcounthours

router.route('/getcount')
.get( (req,respond,next)=> {
    residential_id = req.payload.residential_id
    console.log(req.payload)
    const res = []
    console.log("inside")
    visitors.countDocuments({residential_id: residential_id}).then(countVisitor=> {
        res.push({TotalVisitorsCount : countVisitor})
        visitors.countDocuments({verified : false,residential_id: residential_id}).then(countVisitor=> {
            res.push({TotalUnregisteredVisitorsCount : countVisitor})
            users.countDocuments({residential_id: residential_id}).then(residents=> {
                res.push({TotalResidents : residents})
                users.countDocuments({verified: false, residential_id: residential_id}).then(residents=> {
                    res.push({TotalUnregisteredResidents : residents})
                    respond.status = 200
                    respond.json(res)
                })           
            })
        })
    },(err) => next(err)).catch((err) => next(err));
})




module.exports.router = router;