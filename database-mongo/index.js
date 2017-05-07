var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var pdf_table_extractor = require('pdf-table-extractor');


// callback if pdf table extractor success
function success(result) { 

  // use first array in first page to generate schema
  var colNames = result.pageTables[0].tables[0];
  var schemaObj = {};
  for (var i = 0; i < colNames.length; i++) {
    schemaObj[colNames[i]] = typeof colNames[i];
  }
  console.log("SCHEMA", schemaObj);
  var exampleSchema = mongoose.Schema(schemaObj);
  var Exp = mongoose.model('exp', exampleSchema);  

  // helper function to set particular page and set starting row for saving
  function savePageTableToMongo(page, begin_row) {
    for (var j = begin_row; j < result.pageTables[page].tables.length; j++) {
      var data = result.pageTables[page].tables[j];
      var dataObj = {};
      for (var i = 0; i < colNames.length; i++) {
        dataObj[colNames[i]] = data[i];
      }
      var oneRecord = new Exp(dataObj);
      oneRecord.save((err, oneRecord) => {}); 
    }   
  };  
  
  // For first page we save all data except first row 
  savePageTableToMongo(0, 1);
  
  // For all other pages we save all rows. After page 39 all rows are empty.
  for (var k = 1; k < 39; k++) {
    savePageTableToMongo(k, 0);
  }
};

//Error 
function error(err) {
   console.error('Error: ' + err);
}
 
pdf_table_extractor("../PDF/cat1_live.pdf",success,error);