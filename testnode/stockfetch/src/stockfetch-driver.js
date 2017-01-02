var Stockfetch = require('./stockfetch');

var onError = function(error) { console.log(error) };

var display = function(prices, errors) {
    var print = function(data) { console.log(data[0] + '\t' + data[1]); };

    console.log("Prices for ticker symbols:");
    prices.forEach(print);

    console.log("Ticker symbols with error:");
    errors.forEach(print);
};

new Stockfetch().getPriceForTickers('mixedTickers.txt', display, onError);
