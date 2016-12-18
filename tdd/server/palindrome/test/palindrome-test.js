var expect = require('chai').expect;
var isPalindrome = require('../src/palindrome');

describe('palindrome-test', function() {
    it('should pass this canary test', function() {
        expect(true).to.be.true;
    });

    it('should return true for argument mom', function() {
        expect(isPalindrome('mom')).to.be.true;
    });

    it('should return true for argument dad', function() {
        expect(isPalindrome('dad')).to.be.true;
    });

    it('should return false for argument dude', function() {
        expect(isPalindrome('dude')).to.be.false;
    });
});
