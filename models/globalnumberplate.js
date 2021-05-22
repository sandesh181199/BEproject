var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var globalnumberplate = new Schema({
    number_plate:{
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
        unique : true
    },
    mobile_number:{
        type:Number,
        unique:false
    }
});

globalnumberplate.plugin(passportLocalMongoose);
module.exports = mongoose.model('globalnumberplate',globalnumberplate);