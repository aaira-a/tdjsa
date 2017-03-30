describe('tasks controller tests', function() {
    it('should pass this canary test', function() {
        expect(true).to.be.true;
    });

    var controller;
    var tasksServiceMock;

    beforeEach(module('todoapp'));

    beforeEach(inject(function($controller) {
        tasksServiceMock = {};

        controller = $controller('TasksController', {
            TasksService: tasksServiceMock
        });
    }));

    it('tasks should be empty on create', function() {
        expect(controller.tasks).to.be.eql([]);
    });

    it('message should be empty on create', function() {
        expect(controller.message).to.be.eql('');
    });

    it('getTasks should interact with the service', function(done) {
        controller.updateTasks = function() {};
        controller.updateError = function() {};

        tasksServiceMock.get = function(success, error) {
            expect(success).to.be.eql(controller.updateTasks);
            expect(error).to.be.eql(controller.updateError);
            done();
        };

        controller.getTasks();
    });

    it('updateTasks should update tasks', function() {
        var tasksStub = [{sample: 1}];
        controller.updateTasks(tasksStub);
        expect(controller.tasks).to.be.eql(tasksStub);
    });

    it('updateError should update message', function() {
        controller.updateError('Not Found', 404);
        expect(controller.message).to.be.eql('Not Found (status: 404)');
    });
});
