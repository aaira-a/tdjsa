var expect = require('chai').expect;
require('chai').use(require('chai-as-promised'));

describe('tasks ui test', function() {
    beforeEach(function() {
        browser.ignoreSynchronization = true;
        browser.get('/tasksj.html');
    });

    afterEach(function() {
        browser.ignoreSynchronization = false;
    });

    it('should show correct task count', function() {
        expect(element(by.id('taskscount')).getText()).to.be.eventually.eql('4');
    });
});
