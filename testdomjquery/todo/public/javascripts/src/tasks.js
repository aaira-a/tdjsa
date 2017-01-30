var getTasks = function() {
    callService({method: 'GET', url: '/tasks'}, updateTasks);
};

var callService = function() {};

var updateTasks = function(status, response) {
    var message = response + ' (status: ' + status + ')';
    document.getElementById('message').innerHTML = message;
};
