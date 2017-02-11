describe('tasks-with builtin functions-tests', function() {
    it('should pass this canary test', function() {
        expect(true).to.be.true;
    });

    var sandbox;
    var domElements;

    beforeEach(function() {
        sandbox = sinon.sandbox.create();

        domElements = {};

        sandbox.stub(window, '$', function(selector) {
            return {
                html: function(value) {domElements[selector] = value;},
                click: function(value) {domElements[selector] = value;},
                val: function() {
                    if(selector === '#name') {return 'a new task';}
                    else {return '12/11/2016';}
                }
            }
        });
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

    it('jGetTasks should register jUpdateTasks with jCallService', function() {
        var jCallServiceMock = sandbox.mock(window)
            .expects('jCallService')
            .withArgs(sinon.match.any, jUpdateTasks);

        jGetTasks();
        jCallServiceMock.verify();
    });

    it('jUpdateTasks should update message if status!=200', function() {
        jUpdateTasks(404, '..err..');

        expect(domElements['#message']).to.be.eql('..err.. (status: 404)');
    });
});
