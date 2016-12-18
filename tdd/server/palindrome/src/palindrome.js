module.exports = function(phrase) {
    return phrase.split('').reverse().join('') === phrase;
};
