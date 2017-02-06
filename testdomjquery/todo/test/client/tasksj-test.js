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

    it('jGetTasks should call jCallService', function(done) {
        sandbox.stub(window, 'jCallService',
            function(params) {
                expect(params.method).to.be.eql('GET');
                expect(params.url).to.be.eql('/tasks');
                done();
            });

        jGetTasks();
    });
});
