var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
const users = require('./users');

var numberplate = new Schema({
    visitor_number_plate:{
        type: String,
        default:''
    },
    usr_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : users
    }
});

numberplate.plugin(passportLocalMongoose);
module.exports = mongoose.model('numberplate',numberplate);