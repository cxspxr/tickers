module.exports = {
  apps : [
    {
      name      : 'tickers',
      script    : 'tickers/tickers.js',
      watch     : ['tickers/watch-me.js']
    },
    {
      name      : 'rate',
      script    : 'rate/rate.js',
      watch     : false
    }
  ]
};
