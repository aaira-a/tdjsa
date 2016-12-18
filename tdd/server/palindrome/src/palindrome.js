module.exports = function(phrase) {
    return phrase.trim().length > 0 &&
        phrase.split('').reverse().join('') === phrase;
};
