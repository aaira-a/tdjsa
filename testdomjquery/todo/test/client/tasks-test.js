describe('tasks-with builtin functions-tests', function() {
    it('should pass this canary test', function() {
        expect(true).to.be.true;
    });

    var sandbox;

    beforeEach(function() {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function() {
        sandbox.restore();
    });

    it('getTasks should call callService', function(done) {
        sandbox.stub(window, 'callService',
            function(params) {
                expect(params.method).to.be.eql('GET');
                expect(params.url).to.be.eql('/tasks');
                done();
            });

        getTasks();
    });

    it('getTasks should register updateTasks with callService', function() {
        var callServiceMock = sandbox.mock(window)
            .expects('callService')
            .withArgs(sinon.match.any, updateTasks);

        getTasks();
        callServiceMock.verify();
    });

});
