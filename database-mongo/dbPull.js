// index1.js// 


//################################################
var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test11');
mongoose.connect('mongodb://freedomfighters:freedomfighters@ds133231.mlab.com:33231/heroku_tn5ml1b6');

var db = mongoose.connection;
var itemSchema = mongoose.Schema({});
var Items = mongoose.model('Exp', itemSchema);
module.exports = Items;