'use strict';
import fetch from 'isomorphic-fetch';
import CacheHelper from './cache-helper.js';
const GRAPHQL_DATA_URL = 'https://countries.trevorblades.com/';
class GraphQLDataProvider {
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

    _handleFetchErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    _processJsonResponse(resp, respCallBackOk, respCallBackError) {
        console.log(resp);
        if ((resp.data != null) &&
            ((resp.data['continent'] != null) || (resp.data['continents'] != null))){
            respCallBackOk(resp.data);
        }
        else {
            respCallBackError({ 'error': 'Illegal request parameter' });
        }
    }

    _getDataFromOutside(queryBody, callbackSuccess, callbackError) {
        let bodyToSend = JSON.stringify({ query: queryBody });
        fetch(GRAPHQL_DATA_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: bodyToSend,
        })
            .then(this._handleFetchErrors)
            .then(res => res.json())
            .then(res => this._processJsonResponse(res, callbackSuccess, callbackError));
    }
    /*end of private methods*/

    getContinentsData(responseCallBack) {
        let queryBody = '{ continents { code name}} ';
        /*in this case we don't add to cache - thus callbacks are same for ok and failed */
        this._getDataFromOutside(queryBody, responseCallBack, responseCallBack);
    }

    getCountriesForContinent(continentCode, callback) {
        let that = this;
        let callbackForNonExists = function () {
            let queryBody = that._getCountriesQueryBody(continentCode);
            let callbackReqOk = function (inputData) {
                that.cacheHelper.addDataToCache(continentCode, inputData);
                callback(inputData);
            }
            that._getDataFromOutside(queryBody, callbackReqOk, callback);
        }

        this.cacheHelper.checkDataByKey(continentCode, callback, callbackForNonExists);
    }


}

export default {
    GraphQLDataProvider: GraphQLDataProvider
}; 