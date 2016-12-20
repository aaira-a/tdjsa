var expect = require('chai').expect;
var linesCount = require('../src/files');

describe('test promises', function() {
    it('should return correct lines count for a valid file', function(done) {
        var checkCount = function(count) {
            expect(count).to.be.eql(15);
            done();
        };

        linesCount('src/files.js')
            .then(checkCount);
    });
});
