module.exports = {
  apps : [
    {
      name      : 'tickers',
      script    : 'tickers/tickers.js',
      watch     : ['tickers/.restart']
    }
  ]
};
