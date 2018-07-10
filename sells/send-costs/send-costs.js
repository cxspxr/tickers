const db = require('../../database/db.js');
const findCommission = require('./find-commission');

module.exports = (user, earnedCosts) => {
    return new Promise((resolve) => {
        findCommission(user, earnedCosts, (commission) => {
            let income = earnedCosts - earnedCosts * commission;

            console.log('original earned costs are ' + earnedCosts + ' and reduced to '
                + income + ' because of ' + commission * 100 + '% commission');

            let query = 'update users set balance = balance + ' + income +  ' where id = ' + user;
            db.query(query, (error, result) => {
                if (error) throw error;
                console.log('balance updated for user ' + user);
                resolve(income);
            });
        });
    });
}
