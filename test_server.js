var express = require('express');
var app = express();
var pdf_table_extractor = require("pdf-table-extractor");

app.get('/', function(request, response) {  
  function success(result) {
    Result = JSON.parse( JSON.stringify(result) );
    // console.log(  Result["pageTables"][0].tables );

	    response.send( Result["pageTables"][0].tables );
  }
  function error(err) {
    console.error('Error: ' + err);
  }
 
  pdf_table_extractor("FinalExams.pdf",success,error);
});

var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log(`Example app listening on ${port}`);
});