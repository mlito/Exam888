import express from 'express';
import CountriesService from './countries-service.js';
//var myreq = require('./coutries-service');
let app = express();
let countries = new CountriesService.CountriesService();

app.get('/', function (req, res) {
  res.send('Test path');
});

app.get('/api/country/:contcode', function (req, res) {
  var callback = function (inp) {
    res.json(inp);
  }
  let continentCode = req.params.contcode;
  countries.getContinentCountries(continentCode,callback);
});

app.get('/api/continents', function (req, res) {
  var callback = function (inp) {
    res.json(inp);
  }
  countries.getContinentsData(callback);
});

app.listen(3000, function () {
  console.log('Start listening on port 3000');
});
