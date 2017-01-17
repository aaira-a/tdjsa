var expect = require('chai').expect;
var db = require('../../../db');
var ObjectId = require('mongodb').ObjectId;
var task = require('../../../models/task');

describe('task model tests', function() {
    var sampleTask;
    var sampleTasks;

    before(function(done) {
        db.connect('mongodb://localhost/todotest', done);
    });

    after(function() {
        db.close();
    });
});
