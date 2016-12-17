var expect = require('chai').expect;
var Util = require('../src/util')

describe('util tests', function() {
    it('should pass this canary test', function() {
        expect(true).to.eql(true);
    });

    it('should pass if f2c returns 0C for 32F', function() {
        var fahrenheit = 32;

        var celcius = util.f2c(fahrenheit);

        expect(celcius).to.eql(0);
    });

    it('should pass if f2c returns 10C for 50F', function() {
        var fahrenheit = 50;

        var celcius = util.f2c(fahrenheit);

        expect(celcius).to.eql(10);
    });


    var util;
    beforeEach(function() {
        util = new Util();
    });
});
