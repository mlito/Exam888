'use strict';
import CountriesDataProvider from './countries-data-provider.js'
class CountriesService  {
    constructor() {
      console.log('CountriesService ctor called');
      this.dataProvider = new CountriesDataProvider.CountriesDataProvider();
    }

    getContinentCountries(continentCode, callback) {
      this.dataProvider.getCountriesForContinent(continentCode,callback);
    }

    getContinentsData(callback) { 
      this.dataProvider.getContinentsData(callback);
    }
}

export default {
  CountriesService
}; 