var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.send('I went around the blocks');
});

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`successfully listening on ${port}`);
});