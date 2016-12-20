var expect = require('chai').expect;
var linesCount = require('../src/files');
require('chai').use(require('chai-as-promised'));

describe('test promises', function() {
    it('should return correct lines count for a valid file', function(done) {
        var checkCount = function(count) {
            expect(count).to.be.eql(15);
            done();
        };

        linesCount('src/files.js')
            .then(checkCount);
    });

    it('should return correct lines count - using return', function() {
        var callback = function(count) {
            expect(count).to.be.eql(15);
        };

        return linesCount('src/files.js')
            .then(callback);
    });

    it('should return correct lines count - using eventually', function() {
        return expect(linesCount('src/files.js')).to.eventually.eql(15);
    });
});
