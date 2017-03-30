var TasksController = function() {
    var controller = this;

    controller.tasks = [];
    controller.message = '';
};

angular.module('todoapp')
    .controller('TasksController', [TasksController]);
