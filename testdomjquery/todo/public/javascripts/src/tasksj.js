var jGetTasks = function() {
    jCallService({method: 'GET', url: '/tasks'}, jUpdateTasks);
};

var jCallService = function() {};

var jUpdateTasks = function(status, response) {
	if(status === 200) {
		var tasks = JSON.parse(response);
		
		$('#taskscount').html(tasks.length);
	} else {
		var message = response + ' (status: ' + status + ')';
		$('#message').html(message);
	}
};
