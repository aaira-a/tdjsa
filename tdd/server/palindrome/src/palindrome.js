module.exports = function(phrase) {
    return phrase.length > 0 &&
        phrase.split('').reverse().join('') === phrase;
};
