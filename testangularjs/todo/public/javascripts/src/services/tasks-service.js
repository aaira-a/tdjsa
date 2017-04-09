var TasksService = function($http) {
    var service = this;

    service.get = function(success, error) {
        $http.get('tasks')
            .success(success)
            .error(error);
    };
};

angular.module('todoapp')
    .service('TasksService', ['$http', TasksService]);
