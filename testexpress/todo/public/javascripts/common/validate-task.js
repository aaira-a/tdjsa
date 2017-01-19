var validateTask = function(task) {
    if(task && task.name) {
        return true;
    }
    else {
        return false;
    }
};

(typeof module !== 'undefined') && (module.exports = validateTask);
