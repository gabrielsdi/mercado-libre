var express = require('express');
var request = require('request');
var app = express();
var queryUrl = 'https://api.mercadolibre.com/sites/MLA/search?q=:';
var itemUrl = 'https://api.mercadolibre.com/items/';
const fetch = require('node-fetch');

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
      var info = JSON.parse(body);

      var resultsItems = info.results;
      var items = [];
      var categories = [];
      for (let i = 0; i < resultsItems.length; i++) {

        categories.push(resultsItems[i].category_id);

        items.push({
          id: resultsItems[i].id, title: resultsItems[i].title,
          price: { currency: resultsItems[i].currency_id, amount: resultsItems[i].price, decimals: 0 },
          picture: resultsItems[i].thumbnail, condition: resultsItems[i].condition, free_shipping: resultsItems[i].free_shipping, address: resultsItems[i].address.city_name
        })
      }
      res.json({ author: { name: "Gabriel", lastname: "Splendiani" }, categories: [categories], items: [items] })
    }
  })

});

app.get('/api/item/:id', function (req, res) {
  var id = req.params.id;
  var url = itemUrl + id
  var descriptionUrl = url + "/description";
  const urls = [
    url,
    descriptionUrl
  ];

  Promise.all(urls.map(url =>
    fetch(url)
      .then(checkStatus)
      .then(parseJSON)
      .catch(error => console.log('There was a problem!', error))
  ))
    .then(data => {
      res.json({
        author: { name: "Gabriel", lastname: "Splendiani" },
        item: {
          id: data[0].id, title: data[0].title,
          price: { currency: data[0].currency_id, amount: data[0].price, decimals: data[0].base_price },
          picture: data[0].thumbnail, condition: data[0].condition, free_shipping: data[0].free_shipping,
          sold_quantity: data[0].sold_quantity, description: data[1].plain_text
        }
      });
    })
});

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function parseJSON(response) {
  return response.json();
}

app.listen(3030, function () {
  console.log('listening on port 3030!');
});
