module.exports = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(function () {
            var amount  = Math.random() * 1000 * Math.random() * 10;
            console.log('deposit is sold with a revenue amount ' + amount);
            resolve(amount);
        }, 5000);
    });
}
