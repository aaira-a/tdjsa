var TasksController = function(tasksService, $filter, $document) {
    var controller = this;

    controller.tasks = [];
    controller.message = '';

    controller.getTasks = function() {
        tasksService.get(controller.updateTasks, controller.updateError);
    };

    controller.updateTasks = function(tasks) {
        controller.tasks = controller.sortTasks(tasks);
    };

    controller.updateError = function(error, status) {
        controller.message = error + ' (status: ' + status + ')';
    };

    controller.sortTasks = function(tasks) {
        var orderBy = $filter('orderBy');
        return orderBy(tasks, ['year', 'month', 'day', 'name']);
    };

    $document.ready(controller.getTasks);
};

angular.module('todoapp')
    .controller('TasksController', 
        ['TasksService', '$filter', '$document', TasksController]);
