var expect = require('chai').expect;
var db = require('../../db');

describe('db tests', function() {
    it('should pass this canary test', function() {
        expect(true).to.be.true;
    });

    it('get should return null connection by default', function() {
        expect(db.get()).to.be.null;
    });

    it('close should set connection to null', function() {
        db.close();
        expect(db.connection).to.be.null;
    });
});
