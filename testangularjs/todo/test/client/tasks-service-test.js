describe('tasks service tests', function() {
    var service;
    var httpBackend;
    var notCalled = function() { throw 'not expected'; };

    var newTaskJSON = {name: 'task a', month: 6, day: 10, year: 2016};

    beforeEach(module('todoapp'));

    beforeEach(inject(function(TasksService, $httpBackend) {
        service = TasksService;
        httpBackend = $httpBackend;
    }));

    it('get should call service, register success function', function(done) {
        httpBackend.expectGET('tasks')
            .respond(200, '...some data...');

        var success = function(data, status) {
            expect(status).to.be.eql(200);
            expect(data).to.be.eql('...some data...');
            done();
        };

        service.get(success, notCalled);
        httpBackend.flush();
    });

    it('get should call service, register error function', function(done) {
        httpBackend.expectGET('tasks')
            .respond(404, 'Not Found');

        var error = function(data, status) {
            expect(status).to.be.eql(404);
            expect(data).to.be.eql('Not Found');
            done();
        };

        service.get(notCalled, error);
        httpBackend.flush();
    });
});
