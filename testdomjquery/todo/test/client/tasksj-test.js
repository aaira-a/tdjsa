describe('tasks-with builtin functions-tests', function() {
    it('should pass this canary test', function() {
        expect(true).to.be.true;
    });

    var sandbox;
    var domElements;
    var responseStub;

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

        responseStub = JSON.stringify([
            {_id: '123412341201', name: 'task a', month: 8, day: 1, year: 2016},
            {_id: '123412341202', name: 'task b', month: 9, day: 10, year: 2016},
            {_id: '123412341203', name: 'task c', month: 10, day: 11, year: 2017},
        ]);
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

    it('jUpdateTasks should update taskscount', function() {
        jUpdateTasks(200, responseStub);

        expect(domElements['#taskscount']).to.be.eql(3);
    });

    it('jUpdateTasks should update tasks table', function() {
        jUpdateTasks(200, responseStub);
    
        expect(domElements['#tasks']).contains('<table>');
        expect(domElements['#tasks']).contains('<td>task a</td>');
        expect(domElements['#tasks']).contains('<td>8/1/2016</td>');
        expect(domElements['#tasks']).contains('<td>task b</td>');
    });

});
