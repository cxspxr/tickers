const NRP = require('node-redis-pubsub');
const config = require('./config');

module.exports = new NRP(config);
