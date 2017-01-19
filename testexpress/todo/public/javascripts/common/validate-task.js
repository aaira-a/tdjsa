var validateTask = function(task) {
    if(task) {
        return true;
    }
    else {
        return false;
    }
};

(typeof module !== 'undefined') && (module.exports = validateTask);
