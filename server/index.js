var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
// var items = require('../database-mongo');
var pdf_table_extractor = require("pdf-table-extractor"); //<-- FF

var app = express();
app.use(bodyParser(json()));

app.use(express.static(path.join(__dirname + '/../react-client/dist')));

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});


app.get('/JTMBAK', function(req, res) {
  function success(result) {
    Result = JSON.parse( JSON.stringify(result) );
    // console.log(  Result["pageTables"][0].tables );
	res.send( Result["pageTables"][0].tables );
  }
  function error(err) {
    console.error('Error: ' + err);
  }
  pdf_table_extractor("cat1_live.pdf",success,error);
});

var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log(`Example app listening on ${port}`);
});

// From Test-Server.js


// var pdf_table_extractor = require("pdf-table-extractor");

// app.get('/', function(request, response) {  
//   function success(result) {
//     Result = JSON.parse( JSON.stringify(result) );
//     // console.log(  Result["pageTables"][0].tables );

// 	    response.send( Result["pageTables"][0].tables );
//   }
//   function error(err) {
//     console.error('Error: ' + err);
//   }
 
//   pdf_table_extractor("FinalExams.pdf",success,error);
// });

//var port = process.env.PORT || 3000;
// app.listen(port, function() {
//   console.log(`Example app listening on ${port}`);
// });