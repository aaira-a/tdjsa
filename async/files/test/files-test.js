var expect = require('chai').expect;
var linesCount = require('../src/files');

describe('test server-side callback', function() {
    it('should return correct lines count for a valid file', function() {
        var callback = function(count) {
            expect(count).to.be.eql(-2319);
        };

        linesCount('src/files.js', callback);
    });
});
