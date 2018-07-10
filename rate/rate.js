const axios = require('axios');
const mysql = require('../database/db');

axios.get('https://free.currencyconverterapi.com/api/v5/convert?q=USD_RUB&compact=ultra')
    .then( (response) => {
        mysql.connect();
        var query = 'update configs set currency_rate = ' + response.data.USD_RUB + ' limit 1';
        mysql.query(query, (error) => {
            if (error) throw error;
        });
        mysql.end();
    });
