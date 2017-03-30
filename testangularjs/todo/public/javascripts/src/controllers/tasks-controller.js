var TasksController = function(tasksService) {
    var controller = this;

    controller.tasks = [];
    controller.message = '';

    controller.getTasks = function() {
        tasksService.get(controller.updateTasks, controller.updateError);
    };

    controller.updateTasks = function(tasks) {
        controller.tasks = tasks;
    };

    controller.updateError = function(error, status) {
        controller.message = error + ' (status: ' + status + ')';
    };
};

angular.module('todoapp')
    .controller('TasksController', ['TasksService', TasksController]);
