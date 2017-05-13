// index1.js// 


//################################################
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/test1');
mongoose.connect('mongodb://freedomfighters:freedomfighters@ds133231.mlab.com:33231/heroku_tn5ml1b6');

var db = mongoose.connection;
var itemSchema = mongoose.Schema({});
var Items = mongoose.model('Exp', itemSchema);

//// login schema 
var UserSchema = mongoose.Schema({
  googleID: {type: String, unique: true},
  name: String, 
  email: String
}) 
var User = mongoose.model('User', UserSchema);

var allSchemas = {};
allSchemas.user = User;
allSchemas.items = Items;
module.exports = allSchemas;