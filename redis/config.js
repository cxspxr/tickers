require('dotenv').load();

module.exports = {
    port: process.env.REDIS_PORT,
    scope: process.env.REDIS_SCOPE
}
