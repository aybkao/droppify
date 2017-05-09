// index1.js// 


//################################################
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test11');

var db = mongoose.connection;
var itemSchema = mongoose.Schema({});
var Items = mongoose.model('Exp', itemSchema);
module.exports = Items;