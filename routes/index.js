const express = require('express');
var router = express.Router();

var visitor = require('./visitorRouter');
router.use('/visitor', visitor.router);

var admin = require('./adminRouter');
router.use('/admin', admin.router);

var user = require('./userRouter');
router.use('/user', user.router);
module.exports.router = router; 