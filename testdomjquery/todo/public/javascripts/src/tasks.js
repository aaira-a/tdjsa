var getTasks = function() {
    callService({method: 'GET', url: '/tasks'}, updateTasks);
};

var callService = function() {};

var updateTasks = function(status, response) {
    if(status === 200) {
        var tasks = JSON.parse(response);

        document.getElementById('taskcount').innerHTML = tasks.length;

        var row = function(task) {
            return '<tr><td>' + task.name + '</td>' +
                '<td>' + task.month + '/' + task.day + '/' + task.year + '</td>' +
                '</tr>';
        };

        var table = '<table>' + tasks.map(row).join('') + '</table>';
        document.getElementById('tasks').innerHTML = table;

    } else {
        var message = response + ' (status: ' + status + ')';
        document.getElementById('message').innerHTML = message;
    }
};
