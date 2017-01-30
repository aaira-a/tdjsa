var getTasks = function() {
    callService({method: 'GET', url: '/tasks'}, updateTasks);
};

var callService = function() {};

var updateTasks = function() {};
