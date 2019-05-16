var express = require('express');
var request = require('request');
var app = express();
var queryUrl = 'https://api.mercadolibre.com/sites/MLA/search?q=:';
var itemUrl = 'https://api.mercadolibre.com/items/';

app.get('/', function (req, res) {  
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

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
