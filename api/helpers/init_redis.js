'use strict';

const redis = require('redis');

const client = redis.createClient({ connectTimeout: 50000, });
(async() => { client.on('error', (err) => console.log('Redis Client Error', err)); })();
(async() => {
    await client.connect();
})();
console.log("Connecting to the Redis");
client.on("ready", () => {
    console.log("Redis Connected! succesfully");
});
client.on("error", (err) => {
    console.log("Error in the Connection");
});
process.on('SIGINT', () => {
    client.quit()
})

module.exports = client;