var getTasks = function() {
    callService({method: 'GET', url: '/tasks'}, updateTasks);
};

var callService = function() {};

var updateTasks = function(status, response) {
    if(status === 200) {
        var tasks = JSON.parse(response);

        document.getElementById('taskcount').innerHTML = tasks.length;
    } else {
        var message = response + ' (status: ' + status + ')';
        document.getElementById('message').innerHTML = message;
    }
};
