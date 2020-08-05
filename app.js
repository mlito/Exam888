import express from 'express';
import CountriesService from './countries-service.js';

let app = express();
let countries = new CountriesService.CountriesService();

app.get('/', function (req, res) {
  res.send('Hello from Continents and Countries Service');
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

//all wrong routes go here
app.get('/*', function(req, res) {
  res.send('Wrong route');
});

app.listen(8081, function () {
  console.log('Start listening on port 8081');
});
