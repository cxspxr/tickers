const mysql = require('mysql');
const config = require('./config');
require('dotenv').load();

var con = mysql.createConnection(config);

module.exports = con;
