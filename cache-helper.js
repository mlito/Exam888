'use strict';
import redisJson from 'redis-store-json'; 
import redis from 'redis';
const client = redis.createClient (
    {host: 'redis-server', port: 6379}
    );
//const client = redis.createClient ({port: 6379});
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
                console.log("succefuly set data" + keyToAdd);
            })
            .catch(() => {
                console.log("error when set data");
            })
    }

    /*if key exists - then  callbackExists will be called , else callbackNotExists*/
    checkDataByKey(keyToCheck, callbackExists, callbackNotExists) {
        client.exists(keyToCheck, function (err, reply) {
            if (reply === 1) {
                console.log('exists in cache');
                redisJson.getJSON(keyToCheck)
                    .then(data => callbackExists(data))
                    .catch(err => console.error(err))
            } else {
                console.log('Does not exist in cache. Will be taken from outside');
                callbackNotExists(keyToCheck);
            }
        })
    }
}

export default {
    CacheHelper
}; 