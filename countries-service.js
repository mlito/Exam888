'use strict';
import * as dpFactory from './data-provider-factory.js'
class CountriesService  {
    constructor() {
      console.log('CountriesService ctor called');
      this.dataProvider = dpFactory.createDataProvider(dpFactory.GRAPHQL_PROVIDER)//
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