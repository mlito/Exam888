
Assignment for 888

1) App port is 8081 
2) Cache keys have expiration period 5 minutes 
3) Continents codes are case sensitive
4) There preparation for support getting data from non-GraphQl sources (for example REST)
5) Basic handling of errors : wrong routes, invlid continent code 
6) NOT handled redis diconnection

There were some issue when running via docker.
In order to run without docker , in file 

cache-helper.js

const client = redis.createClient ({host: 'redis-server', port: 6379});

by 

const client = redis.createClient ({port: 6379});
