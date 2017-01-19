var validateTask = function(task) {
    if(task && task.name &&
        task.month && !isNaN(task.month)) {
        return true;
    }
    else {
        return false;
    }
};

(typeof module !== 'undefined') && (module.exports = validateTask);
