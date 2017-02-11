describe('tasks-with builtin functions-tests', function() {
    it('should pass this canary test', function() {
        expect(true).to.be.true;
    });

    var sandbox;
    var domElements;
    var responseStub;
    var readySpy = sinon.spy($.fn, 'ready');

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

        xhr = sinon.useFakeXMLHttpRequest();
        xhr.requests = [];
        xhr.onCreate = function(req) { xhr.requests.push(req) };
    });

    afterEach(function() {
        sandbox.restore();
        xhr.restore();
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

    it('jCallService should make call to service', function() {
        jCallService({method: 'GET', url: '/tasks'}, sinon.spy());

        expect(xhr.requests[0].method).to.be.eql('GET');
        expect(xhr.requests[0].url).to.be.eql('/tasks');
        expect(xhr.requests[0].sendFlag).to.be.true;
    });

    it('jCallService should send xhr status code to callback', function() {
        var callback = sandbox.mock().withArgs(200).atLeast(1);

        jCallService({method: 'GET', url: '/tasks'}, callback);
        xhr.requests[0].respond(200);

        callback.verify();
    });

    it('jCallService should send response to callback', function() {
        var callback = sandbox.mock().withArgs(200, '..res..').atLeast(1);

        jCallService({method: 'GET', url: '/tasks'}, callback);
        xhr.requests[0].respond(200, {}, '..res..');

        callback.verify();
    });

    it('jCallService should send error response to callback', function() {
        var callback = sandbox.mock().withArgs(404, '..err..').atLeast(1);

        jCallService({method: 'GET', url: '/tasks'}, callback);
        xhr.requests[0].respond(404, {}, '..err..');

        callback.verify();
    });    

    it('jCallService should only send when final response received', function() {
        var callback = sandbox.spy();
        jCallService({method: 'GET', url: '/tasks', callback});

        expect(callback.callCount).to.be.eql(0);
    });

    it('jCallService should send data to the service', function() {
        jCallService({method: 'POST', url: '/tasks', data: '...some data...'});

        expect(xhr.requests[0].requestBody).to.be.eql('...some data...');
    });

    it('ajax should set dataType to text', function() {
        var ajaxMock = sandbox.mock($, 'ajax', function(options) {
            expect(options.dataType).to.be.eql('text');
        });
    });

    it('jCallService should have default content type', function() {
        jCallService({method: 'POST', url: '/tasks', data: '...some data...'});

        expect(xhr.requests[0].requestHeaders["Content-Type"]).contains("text/plain");
    });

    it('jCallService should set content type if present', function() {
        jCallService({method: 'POST', url: '/tasks', data: '...some data...',
            contentType: "whatever"});

        expect(xhr.requests[0].requestHeaders["Content-Type"]).contains("whatever");
    });

    it('should register jInitpage handler with document ready', function() {
        expect(readySpy.firstCall.args[0]).to.be.eql(jInitpage);
    });

    it('jInitpage should call jGetTasks', function(done) {
        sandbox.stub(window, 'jGetTasks', done);

        jInitpage();
    });

    it('jAddTask should call jCallService', function(done) {
        sandbox.stub(window, 'jCallService',
            function(params, callback) {
                expect(params.method).to.be.eql('POST');
                expect(params.url).to.be.eql('/tasks');
                expect(params.contentType).to.be.eql('application/json');

                var newTask = '{"name":"a new task","month":12,"day":11,"year":2016}';
                expect(params.data).to.be.eql(newTask);
                expect(callback).to.be.eql(jUpdateMessage);
                done();
            });

        jAddTask();
    });

});
