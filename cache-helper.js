'use strict';
import redisJson from 'redis-store-json'; //import the module
import redis from 'redis';
const client = redis.createClient();
redisJson.use(client);
const KEY_TTL_SECONDS = 300;

class CacheHelper {
    constructor() {
        console.log('cachehelper ctor called');

    }

    addDataToCache(keyToAdd, dataToAdd) {
        redisJson.set(keyToAdd, dataToAdd)  // set a new JSON key
            .then(() => {
                client.expire(keyToAdd, KEY_TTL_SECONDS);
                console.log("succefuly set data with TTL" + keyToAdd);
            })
            .catch(() => {
                console.log("error when set data");
            })
    }

    checkDataByKey(keyToCheck, callbackExists,callbackNotExists) {
        client.exists(keyToCheck, function (err, reply) {
            if (reply === 1) {
                console.log('exists');
                redisJson.getJSON(keyToCheck)
                    .then(data => callbackExists(data))
                    .catch(err => { console.error(err); })
            } else {
                console.log('Not exist');
                callbackNotExists(keyToCheck);
            }
        })
    }
}

export default {
    CacheHelper
}; 