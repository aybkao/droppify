const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const items = require('../database-mongo');
const pdf_table_extractor = require("pdf-table-extractor"); //<-- FF

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../public')));

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
    Result = JSON.parse(JSON.stringify(result));
    // console.log(  Result["pageTables"][0].tables );
	res.send(Result["pageTables"][0].tables);
  }
  function error(err) {
    console.error('Error: ' + err);
  }
  pdf_table_extractor("cat1_live.pdf",success,error);
});

const port = process.env.PORT || 5000;

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

let columns = [2,3,4,5,6];
let schema = {};

for (let val of columns) {  
  schema[val] = typeof val 
}

console.log(schema);