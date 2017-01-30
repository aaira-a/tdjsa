var getTasks = function() {
    callService({method: 'GET', url: '/tasks'}, updateTasks);
};

var callService = function(options, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(options.method, options.url);

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            callback(xhr.status, xhr.response);
        }
    };
    
    xhr.send();
};

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
