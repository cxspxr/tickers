const db = require('../database/db');

module.exports = (name) => {
    return new Promise((resolve) => {
        let query = 'select ' + name + ' from configs limit 1';
        db.query(query, (error, config) => {
            if (error) throw error;
            resolve(config[0][name]);
        });
    });
}
