module.exports = {
    connection: null,

    get: function() { return this.connection; },

    close: function() { this.connection = null; },
};
