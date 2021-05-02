
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
const residential = require('./residential');

var User = new Schema({
    residential_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref : residential
    },
    password:{
        type: String,
        default:'' 
    },
    firstname : {
        type : String,
        default : ''
    },
    lastname : {
        type : String,
        default : ''
    },
    email_id:{
        type:String,
        default :'',
        unique : true
    },
    mobile_number:{
        type:Number,
        default:'',
        unique:true
    },
    admin :{
        type : Boolean,
        default : false
    },
    verified : {
        type : Boolean,
        default : false
    }
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',User);