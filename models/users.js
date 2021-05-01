
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose')

var User = new Schema({
    residential_id:{
        type: Number,
        default:''
    },
    numberplate:[
        {
        type: String,
        default:''
        }
    ],
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
        default :''
    },
    mobile_number:{
        type:Number,
        default:'',
        unique:true
    },
    admin :{
        type : Boolean,
        default : false
    }
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',User);