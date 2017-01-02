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

    it('read should return error if given file is empty', function(done) {
        var onError = function(err) {
            expect(err).to.be.eql('File tickers.txt has invalid content');
            done();
        };

        sandbox.stub(stockfetch, 'parseTickers').withArgs('').returns([]);

        sandbox.stub(fs, 'readFile', function(fileName, callback) {
            callback(null, '');
        });

        stockfetch.readTickersFile('tickers.txt', onError)
    });

    it('parseTickers should return tickers', function() {
        expect(stockfetch.parseTickers("A\nB\nC")).to.be.eql(['A', 'B', 'C']);
    });

    it('parseTickers should return empty array for empty content', function() {
        expect(stockfetch.parseTickers("")).to.be.eql([]);
    });

    it('parseTickers should return empty array for white-space', function() {
        expect(stockfetch.parseTickers(" ")).to.be.eql([]);
    });

    it('parseTickers should ignore unexpected format in content', function() {
        var rawData = "AAPL \nBla h\nGOOG\n\n ";
        expect(stockfetch.parseTickers(rawData)).to.be.eql(['GOOG']);
    });

    it('processTickers should call getPrice for each ticker symbol', function() {
        var stockfetchMock = sandbox.mock(stockfetch);
        stockfetchMock.expects('getPrice').withArgs('A');
        stockfetchMock.expects('getPrice').withArgs('B');
        stockfetchMock.expects('getPrice').withArgs('C');

        stockfetch.processTickers(['A', 'B', 'C']);
        stockfetchMock.verify();
    });

    it('processTickers should save tickers count', function() {
        sandbox.stub(stockfetch, 'getPrice');

        stockfetch.processTickers(['A', 'B', 'C']);
        expect(stockfetch.tickersCount).to.be.eql(3);
    });

    it('getPrice should call get on http with valid URL', function(done) {
        var httpStub = sandbox.stub(stockfetch.http, 'get', function(url) {
            expect(url)
            .to.be.eql('http://ichart.finance.yahoo.com/table.csv?s=GOOG');
            done();
            return { on: function() {} };
        });

        stockfetch.getPrice('GOOG');
    });

    it('getPrice should send a response handler to get', function(done) {
        var aHandler = function() {};

        sandbox.stub(stockfetch.processResponse, 'bind')
            .withArgs(stockfetch, 'GOOG')
            .returns(aHandler);

        var httpStub = sandbox.stub(stockfetch.http, 'get',
            function(url, handler) {
                expect(handler).to.be.eql(aHandler);
                done();
                return { on: function() {} };
        });

        stockfetch.getPrice('GOOG');
    });

    it('getPrice should register handler for failure to reach host', function(done) {
        var errorHandler = function() {};

        sandbox.stub(stockfetch.processHttpError, 'bind')
            .withArgs(stockfetch, 'GOOG')
            .returns(errorHandler);

        var onStub = function(event, handler) {
            expect(event).to.be.eql('error');
            expect(handler).to.be.eql(errorHandler);
            done();
        };

        sandbox.stub(stockfetch.http, 'get').returns({ on: onStub });

        stockfetch.getPrice('GOOG');
    });

    it('processResponse should call parsePrice with valid data', function() {
        var dataFunction;
        var endFunction;

        var response = {
            statusCode: 200,
            on: function(event, handler) {
                if(event === 'data') dataFunction = handler;
                if(event === 'end') endFunction = handler;
            }
        };

        var parsePriceMock = 
            sandbox.mock(stockfetch)
                .expects('parsePrice').withArgs('GOOG', 'some data');

        stockfetch.processResponse('GOOG', response);
        dataFunction('some ');
        dataFunction('data');
        endFunction();

        parsePriceMock.verify();
    });

    it('processResponse should call processError if response failed',
        function() {
        var response = { statusCode: 404 };

        var processErrorMock = sandbox.mock(stockfetch)
            .expects('processError')
            .withArgs('GOOG', 404);

        stockfetch.processResponse('GOOG', response);
        processErrorMock.verify();
    });

    it('processResponse should call processError only if response failed',
        function() {
        var response = {
            statusCode: 200,
            on: function() {}
        };

        var processErrorMock = sandbox.mock(stockfetch)
            .expects('processError')
            .never();

        stockfetch.processResponse('GOOG', response);
        processErrorMock.verify();
    });

    it('processHttpError should call processError with error details',
        function() {
        var processErrorMock = sandbox.mock(stockfetch)
            .expects('processError')
            .withArgs('GOOG', '...error code...');

        var error = { code: '...error code...' };
        stockfetch.processHttpError('GOOG', error);
        processErrorMock.verify();
    });
});
