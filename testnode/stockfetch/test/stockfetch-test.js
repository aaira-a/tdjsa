var expect = require('chai').expect;
var sinon = require('sinon');
var fs = require('fs');
var Stockfetch = require('../src/stockfetch');

describe('Stockfetch tests', function() {

    var stockfetch;
    var sandbox;

    beforeEach(function() {
        stockfetch = new Stockfetch();
        sandbox = sinon.sandbox.create();
    });

    afterEach(function() {
        sandbox.restore();
    });

    it('should pass this canary test', function() {
        expect(true).to.be.true;
    });

    it('should invoke error handler for invalid file', function(done) {
        var onError = function(err) {
            expect(err).to.be.eql('Error reading file: InvalidFile');
            done();
        };

        sandbox.stub(fs, 'readFile', function(fileName, callback) {
            callback(new Error('failed'));
        });

        stockfetch.readTickersFile('InvalidFile', onError);
    });

    it('read should invoke processTickers for valid file', function(done) {
        var rawData = 'GOOG\nAAPL\nORCL\nMSFT';
        var parsedData = ['GOOG', 'AAPL', 'ORCL', 'MSFT'];

        sandbox.stub(stockfetch, 'parseTickers')
            .withArgs(rawData).returns(parsedData);

        sandbox.stub(stockfetch, 'processTickers', function(data) {
            expect(data).to.be.eql(parsedData);
            done();
        });

        sandbox.stub(fs, 'readFile', function(fileName, callback) {
            callback(null, rawData);
        });

        stockfetch.readTickersFile('tickers.txt');
    });
});
