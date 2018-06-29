const db = require('../database/db');

module.exports = function (name) {
    return new Promise(function (resolve) {
        let query = 'select ' + name + ' from configs limit 1';
        db.query(query, function (error, config) {
            if (error) throw error;
            resolve(config[0][name]);
        });
    });
}
