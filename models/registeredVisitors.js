var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose')
var User = require('./users')

var registeredVisitor = new Schema({
    first_name :{
        type: String,
        default:''
    },
    last_name :{
        type: String,
        default:''
    },
    mobile_number :{
        type: String,
        default:''
    },
    email_id :{
        type: String,
        default:''
    },
    expected_date : {
        type: Date,
        default: null
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref : User
    }
},{
    timestamps:true
});

registeredVisitor.plugin(passportLocalMongoose);
module.exports = mongoose.model('registeredVisitor',registeredVisitor);