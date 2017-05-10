const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pdf_table_extractor = require("pdf-table-extractor"); //<-- FF
const Items = require('../database-mongo/dbPull.js');
// const post = require('../database-mongo/index.js');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../public')));

app.get('/items/:kw', function (req, res) {
  Items.find(
  { "Course Location ": 
    {"$regex": req.params.kw, 
      "$options":"i"
    } 
  }).limit(30).exec( function (err, data) {
    if (err) {
      console.log( 'server get request failure', err)
    } else {
      console.log('server get request Success!', data)
    }
    res.end(JSON.stringify(data));
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
  Items.find({}).limit(30).exec( function (err, data) {
    if (err) {
      console.log( 'server get request failure', err)
    } else {
      console.log('Success!')
    }

    res.end(JSON.stringify(data));
  })
});

app.post('/data', function(req, res) {
  // take req.body.filter to pull data from our database
  
  res.send('yoiasf')
})


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

