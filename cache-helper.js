'use strict';
import redisJson from 'redis-store-json'; //import the module
import redis from 'redis';  
const client = redis.createClient(); 
redisJson.use(client);   

class CacheHelper { 
    constructor() { 
        console.log('cachehelper ctor called');
    }

    addDataToCache(keyToAdd) { 
        let testSet = {
            "testKey1" : "test",
            "testKey2" : "test2",
            "testKey3" : {"test4":123}
        }
        redisJson.set("REDIS_DB_KEY", testSet)  // set a new JSON key
            .then(() =>{
                console.log("succefuly set data");
            })
            .catch(() =>{
                console.log("error when set data");
            })
    }
    
}

export default {
    CacheHelper
  }; 