var db = require('../db');
var ObjectId = require('mongodb').ObjectId;

var collectionName = 'tasks';

module.exports = {
    all: function(callback) {
        db.get().collection(collectionName).find().toArray(callback);
    },

    get: function(taskId, callback) {
        db.get().collection(collectionName)
            .find({'_id': new ObjectId(taskId)}).limit(1).next(callback);
    },

    add: function(newTask, callback) {

        var found = function(err, task) {
            if(task) {
                callback(new Error('duplicate task'));
            }
            else {
                db.get().collection(collectionName).insertOne(newTask, callback);
            }
        };

        db.get().collection(collectionName).find(newTask).limit(1).next(found);
    },
};
