const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pdf_table_extractor = require("pdf-table-extractor"); //<-- FF
const Items = require('../database-mongo/dbPull.js');
// const post = require('../database-mongo/index.js');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../public')));

// :kw takes in /items/<any keyword> and passes the kw to req.params.kw below. 
app.get('/items/:kw', function (req, res) {
  var arr = [];
  var filterObj = [];
  var filterArr = [];
  // Goal here is to create a full search on all columns in the table
    Items.findOne( function(err, val) {
    val = JSON.parse(JSON.stringify(val));
    Object.keys(val).map( (key, index) =>  { arr.push(key) })
    // val is an Array
    // Loop is used to build an object with regex values.
    for (var i = 0; i < arr.length; i++){
      var key = arr[i];
      filterObj[arr[i]]={"$regex": req.params.kw, "$options":"i"}
    }
    // loop here is used to place data into the $or find method.
    for (var key in filterObj) {
      var smallObj = {};
      smallObj[key] = filterObj[key]
      smallObj = JSON.parse(JSON.stringify(smallObj))
      filterArr.push( smallObj )
    }
    // removing database added columns _id and __v from search
    filterArr = filterArr.slice(1,filterArr.length)
    var bigObj = {};
    bigObj.$or = filterArr
    console.log('DOES IS REACH?', bigObj)
    // bigObj is the main algorithm used to find data in the table    
    Items.find( bigObj ).limit(50).exec( function (err, data) {
      if (err) {
        console.log( 'server get request failure', err)
      } else {
        console.log('server get request Success!', data)
        // console.log('filterObj',Array.isArray(filterObj))
      }
      res.end(JSON.stringify(data));
    })  
  })
});

app.post('/data', function(req, res) {
	// take req.body.filter to pull data from our database
	console.log('Fake Post Data')
	res.send('yoiasf')
})


app.get('/allItems', function (req, res) {
  // console.log(req.params.kw)
  // Items.find({"Course Location ": "San Jose " }).limit(30).exec( function (err, data) {
  Items.find({}).limit(50).exec( function (err, data) {
    if (err) {
      console.log( 'server get request failure', err)
    } else {
      console.log('Success!')
    }
    res.end(JSON.stringify(data));
  })
});

const port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log(`Example app listening on ${port}`);
});

// From Test-Server.js


// var pdf_table_extractor = require("pdf-table-extractor");


//var port = process.env.PORT || 3000;
// app.listen(port, function() {
//   console.log(`Example app listening on ${port}`);
// });

