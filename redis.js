// // import { createClient } from redis;
// // const redisClient = createClient({ legacyMode: true });
// // await redisClient.connect();

// const redis = require('redis')

// const client = redis.createClient({
//     port: 6379,
//     host: '127.0.0.1',
// })

// client.on('connect', () => {
//     legacyMode: true,
//     console.log('Client connected to redis...')
// })

// client.on('ready', () => {
//     console.log('Client connected to redis and ready to use...')
// })

// client.on('error', (err) => {
//     console.log(err.message)
// })

// client.on('end', () => {
//     console.log('Client disconnected from redis')
// })

// process.on('SIGINT', () => {
//     client.quit()
// })

// module.exports = client




const redis = require("redis");
const redisclient = redis.createClient();

(async() => {
    await redisclient.connect();
})();

console.log("Connecting to the Redis");

redisclient.on("ready", () => {
    console.log("Connected!");
});

redisclient.on("error", (err) => {
    console.log("Error in the Connection");
});