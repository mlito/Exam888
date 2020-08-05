'use strict';
import fetch from 'isomorphic-fetch';
import CacheHelper from './cache-helper.js';
const GRAPHQL_DATA_URL = 'https://countries.trevorblades.com/';
class CountriesDataProvider {
    constructor() {
        console.log('CountriesDataProvider ctor called');
        this.cacheHelper = new CacheHelper.CacheHelper(); 
    }

    /*private methods*/
    //There is now awailable # modifier for private , as I know it is not supported for all engines
    _getCountriesQueryBody(continentCode) {
        const languagesField = ' languages {name} ';
        const countryFieldsList = ['code', 'name', 'phone', 'capital', 'currency'].join(' ') + languagesField;
        let countriesBody = `countries { ${countryFieldsList} }`;
        let resultRequestBody = `{continent(code:"${continentCode}") { ${countriesBody} }}`;
        return resultRequestBody;
    }

    _getDataFromOutside(queryBody,callback) { 
        let bodyToSend = JSON.stringify({query: queryBody} );
        fetch(GRAPHQL_DATA_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: bodyToSend,
        })
        .then(res =>res.json())
        .then(res => callback(res.data))
    }
    /*end of private methods*/
    getContinentsData(callback) { 
        let queryBody = '{ continents { code name}} ';
        this._getDataFromOutside(queryBody,callback);
    }

    getCountriesForContinent(continentCode, callback) {
        let foundInCache = false;
        if (foundInCache) {
            //let dataFromCache = getDataFromCache; 
            this.cacheHelper.addDataToCache();
        }
        else {
            let queryBody = this._getCountriesQueryBody(continentCode);
            let that = this;
            let callbackForCache = function(inputData) {
                that.cacheHelper.addDataToCache(continentCode,inputData); 
                //that.cacheHelper.setKeyExpiration(continentCode);
                callback(inputData);
            } 
            this._getDataFromOutside(queryBody,callbackForCache);
        }
    }

    
}

export default {
    CountriesDataProvider
}; 