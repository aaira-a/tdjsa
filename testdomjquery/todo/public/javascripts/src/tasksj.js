var jInitpage = function() {
	jGetTasks();
};

$(document).ready(jInitpage);

var jGetTasks = function() {
    jCallService({method: 'GET', url: '/tasks'}, jUpdateTasks);
};

var jCallService = function(options, callback) {
	$.ajax({
		method: options.method,
		url: options.url,
		contentType: options.contentType || 'text/plain',
		dataType: 'text',
		data: options.data,
		success: function(data, status, xhr) {
			callback(xhr.status, data);
		},
		error: function(xhr, status, errorThrown) {
			callback(xhr.status, xhr.responseText);
		}
	});
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

var jAddTask = function() {
    var date = new Date($('#date').val());
    var newTask = {
        name: $('#name').val(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        year: date.getFullYear(),
    };

    jCallService({method: 'POST', url: '/tasks',
        contentType: 'application/json',
        data: JSON.stringify(newTask)}, jUpdateMessage);
};

var jUpdateMessage = function() {};
