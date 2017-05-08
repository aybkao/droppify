const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const items = require('../database-mongo');
const pdf_table_extractor = require("pdf-table-extractor"); //<-- FF

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../public')));

app.get('/items', function (req, res) {
  res.send('items')
});

app.post('/data', function(req, res) {
	// take req.body.filter to pull data from our database
	console.log('app.post',req.body.filter)
	res.send('yoiasf')
})


app.get('/TestDynamic', function(request, response) {  
  function success(result) {
  	// Push all items from table Parse into 1 array to return to client
  	resultArr = [];
    Result = JSON.parse( JSON.stringify(result) );
    Result.pageTables.map( (val)=> {
    	val.tables.map( (row)=>{
    		resultArr.push(row);
    	})
    })
    // console.log('resultArr',resultArr);
    response.send(resultArr);
  }
  function error(err) {
    console.error('Error: ' + err);
  }
 
  pdf_table_extractor("PDF/finalExams.pdf",success,error);
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

