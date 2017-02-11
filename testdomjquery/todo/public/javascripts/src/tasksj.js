var jGetTasks = function() {
    jCallService({method: 'GET', url: '/tasks'}, jUpdateTasks);
};

var jCallService = function(options, callback) {
	$.ajax(options);
};

var jUpdateTasks = function(status, response) {
	if(status === 200) {
		var tasks = JSON.parse(response);

		$('#taskscount').html(tasks.length);

        var row = function(task) {
            return '<tr><td>' + task.name + '</td>' +
                '<td>' + task.month + '/' + task.day + '/' + task.year + '</td>' +
                '</tr>';
        };

        var table = '<table>' + tasks.map(row).join('') + '</table>';
        $('#tasks').html(table);

	} else {
		var message = response + ' (status: ' + status + ')';
		$('#message').html(message);
	}
};
