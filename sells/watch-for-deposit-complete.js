module.exports = function (transaction) {
    return new Promise(function(resolve) {
        var completed = false;
        var intervalId = setInterval(function() {
            completed = !!Math.round(Math.random());
            if (completed) {
                console.log('deposit is complete for transaction ' + transaction);
                clearInterval(intervalId);
                resolve(Math.random() * 100);
            }
        }, 5000);
    });
}
