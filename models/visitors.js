var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose')

var Visitor = new Schema({
    visitor_number_plate:{
        type: String,
        default:''
    },
    residential_id:{
        type: Number,
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
        default:''
    },
},{
    timestamps:true
});

Visitor.plugin(passportLocalMongoose);
module.exports = mongoose.model('Visitor',Visitor);