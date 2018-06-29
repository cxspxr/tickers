module.exports = function() {
    return new Promise(function(resolve, reject) {
        var completed = false;
        var intervalId = setInterval(function() {
            completed = !!Math.round(Math.random());
            if (completed) {
                console.log('deposit is sold with a revenue amount ' + amount);

                var amount  = Math.random() * 1000 * Math.random() * 10;
                clearInterval(intervalId);
                resolve(amount);
            }
        }, 10000);
    });
}
