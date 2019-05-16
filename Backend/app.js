var express = require('express');
var request = require('request');
var app = express();
var queryUrl = 'https://api.mercadolibre.com/sites/MLA/search?q=:';
var itemUrl = 'https://api.mercadolibre.com/items/';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


app.get('/', function (req, res) {  
  res.send("Hello world");
});

app.get('/api/query/:query', function (req, res) {
    var query = req.params.query;
    var url = queryUrl + query;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body)          
          res.send(info);
        }
      })
});

app.get('/api/item/:id', function (req, res) {
    var id = req.params.id;    
    var url = itemUrl + id;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body)          
          res.send(info);
        }
      })
});

app.get('/api/item/:id/description', function (req, res) {
    var id = req.params.id;    
    var url = itemUrl + id + "/description";
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body)          
          res.send(info);
        }
      })
});

app.listen(3030, function () {
  console.log('listening on port 3030!');
});
