var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose')

var Residential = new Schema({
    society_name:{
        type: String,
        default:''
    },
    address:{
        type: String,
        default:''
    },
    pincode : {
        type : Number,
        default : ''
    }
});

Residential.plugin(passportLocalMongoose);
module.exports = mongoose.model('Residential',Residential);