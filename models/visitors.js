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
},{
    timestamps:true
});

Visitor.plugin(passportLocalMongoose);
module.exports = mongoose.model('Visitor',Visitor);