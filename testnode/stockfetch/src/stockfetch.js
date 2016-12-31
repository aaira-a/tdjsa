var Stockfetch = function() {
    this.readTickersFile = function(filename, onError) {
        onError('Error reading file: ' + filename);
    };
};

module.exports = Stockfetch;
