const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/users');
const residential = require('../models/residential');
const visitors = require('../models/visitors');
const numberplate = require('../models/visitors');
// const cors = require('./cors');

const router = express.Router();
router.use(bodyParser.json());


router.route('/checkvisitors')
.post((req, res, next) => {
    // console.log("Inside checkvisitor")
    var numberplate = req.body.numberplate;
    var residential_id= req.body.residential_id;
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

User.find({numberplate:numberplate})
    .then(result=>{
        console.log(result.length)
        if(result.length==0)
        {
            console.log(false)
            var newVisitor = {
                        visitor_number_plate : numberplate,
                        residential_id
                    }
                    visitors.create(newVisitor)
                    .then(response=> {
                        res.statusCode = 200;
                        res.setHeader('content-type','application/json');
                        res.json({Resident : false, Visitor: response});

                    },(err) => next(err)).catch((err)=> next(err))
                }
                else{
                    console.log(true)
                    res.statusCode = 200;
            res.setHeader('content-type','application/json');
            res.json({Resident : true });

                }
    },(err) => next(err)).catch((err)=> next(err)) 
})


router.route('/postusers')
.post((req, res, next) => {
    console.log("Inside postusers")
    var {residential_id, numberplate, password, firstname, lastname, email_id, mobile_number} = req.body
    const newUser = {
        residential_id, numberplate, password, firstname, lastname, email_id, mobile_number
    }
    User.create(newUser)
    .then(user=> {
        console.log("User created" + user);
        res.statusCode = 200;
        res.setHeader('content-type','application/json');
        res.json(user);
    },(err) => next(err)).catch((err)=> next(err))
})


router.route('/addSociety')
.post((req, res, next) => {
    console.log("Inside Add Society")
    var {society_name, address, pincode} = req.body
    const newSociety = {
        society_name, address, pincode
    }
    residential.create(newSociety)
    .then(data=> {
        console.log("Society created" + data);
        res.statusCode = 200;
        res.setHeader('content-type','application/json');
        res.json(data);
    },(err) => next(err)).catch((err)=> next(err))
})


router.route('/newvisitor')
.post((req, res, next) => {
    console.log("Inside Visitor")
    var {visitor_number_plate, residential_id} = req.body
    const newVisitor = {
        visitor_number_plate, residential_id
    }
    numberplate.create(newVisitor)
    .then(data=> {
        console.log("Society created" + data);
        res.statusCode = 200;
        res.setHeader('content-type','application/json');
        res.json(data);
    },(err) => next(err)).catch((err)=> next(err))
})

module.exports.router = router;