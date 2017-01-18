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

    var id = function(idValue) {
        return new ObjectId(idValue);
    };

    beforeEach(function(done) {
        sampleTask = {name: 'a new task', month: 12, day: 10, year: 2016};

        sampleTasks = [
            {_id: id('123412341240'), name: 'task1', month: 10, day: 5, year: 2016},
            {_id: id('123412341241'), name: 'task2', month: 11, day: 2, year: 2016},
            {_id: id('123412341242'), name: 'task3', month: 12, day: 8, year: 2016},
        ];

        db.get().collection('tasks').insert(sampleTasks, done);
    });

    afterEach(function(done) {
        db.get().collection('tasks').drop(done);
    });

    it('all should return all the tasks', function(done) {
        var callback = function(err, tasks) {
            expect(tasks).to.eql(sampleTasks);
            done();
        };

        task.all(callback);
    });

    it('get should return task with given id', function(done) {
        var callback = function(err, task) {
            expect(task.name).to.be.eql('task1');
            done();
        };

        task.get('123412341240', callback);
    });

    it('get should return null for non-existing task', function(done) {
        var callback = function(err, task) {
            expect(task).to.be.null;
            done();
        };

        task.get(2319, callback);
    });
});
