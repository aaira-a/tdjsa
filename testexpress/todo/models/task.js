var db = require('../db');
var ObjectId = require('mongodb').ObjectId;

var collectionName = 'tasks';

module.exports = {
    all: function(callback) {
        db.get().collection(collectionName).find().toArray(callback);
    },
};
