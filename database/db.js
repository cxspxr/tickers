const mysql = require('mysql');
const config = require('../config/config');
require('dotenv').load();

var con = mysql.createConnection(config[process.env.APP_ENV ? process.env.APP_ENV : 'development']);

con.connect();

con.end();

module.exports = con;
