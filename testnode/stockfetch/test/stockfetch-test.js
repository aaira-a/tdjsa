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
});
