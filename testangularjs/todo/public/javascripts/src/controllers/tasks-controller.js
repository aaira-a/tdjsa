var TasksController = function(tasksService) {
    var controller = this;

    controller.tasks = [];
    controller.message = '';

    controller.getTasks = function() {
        tasksService.get(controller.updateTasks, controller.updateError);
    };
};

angular.module('todoapp')
    .controller('TasksController', ['TasksService', TasksController]);
