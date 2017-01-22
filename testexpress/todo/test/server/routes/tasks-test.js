var expect = require('chai').expect;
var sinon = require('sinon');
var task = require('../../../models/task');
var express = require('express');

describe('tasks route test', function() {
    var sandbox;
    var router;

    beforeEach(function() {
        sandbox = sinon.sandbox.create();

        sandbox.stub(express, 'Router').returns({
            get: sandbox.spy(),
            post: sandbox.spy(),
            delete: sandbox.spy()
        });

        router = require('../../../routes/tasks');
    });

    afterEach(function() {
        sandbox.restore();
    });

    it('should register URI / for get', function() {
        expect(router.get.calledWith('/', sandbox.match.any)).to.be.true;
    });

    var stubResSend = function(expected, done) {
        return { send: function(data) {
            expect(data).to.be.eql(expected);
            done();
        }};
    };

    it("get / handler should call model's all & return result",
        function(done) {
        var sampleTasks = [{name: 't1', month: 12, day: 1, year: 2016}];

        sandbox.stub(task, 'all', function(callback) {
            callback(null, sampleTasks);
        });

        var req = {};
        var res = stubResSend(sampleTasks, done);

        var registeredCallback = router.get.firstCall.args[1];
        registeredCallback(req, res);
    });

    it('should register URI /:id for get', function() {
        expect(router.get.calledWith('/:id', sandbox.match.any)).to.be.true;
    });

    it("get /:validid handler should call model's get & return a task",
        function(done) {
        var sampleTask = [{name: 't1', month: 12, day: 1, year: 2016}];
        
        sandbox.stub(task, 'get', function(id, callback) {
            expect(id).to.be.eql(req.params.id);
            callback(null, sampleTask);
        });

        var req = {params: {id: 2319}};
        var res = stubResSend(sampleTask, done);

        var registeredCallback = router.get.secondCall.args[1];
        registeredCallback(req, res);
    });

    it("get /:invalidid handler should call model's get & return {}",
        function(done){
        var sampleTask = {};

        sandbox.stub(task, 'get', function(id, callback) {
            expect(id).to.be.eql(req.params.id);
            callback(null, null);
        });

        var req = {params: {id: 2319}};
        var res = stubResSend(sampleTask, done);

        var registeredCallback = router.get.secondCall.args[1];
        registeredCallback(req, res);
    });

    it('should register URI / for post', function() {
        expect(router.post.calledWith('/', sandbox.match.any)).to.be.true;
    });

    it("post / handler should call model's add & return success message",
        function(done) {
        var sampleTask = {name: 't1', month: 12, day: 1, year: 2016};

        sandbox.stub(task, 'add', function(newTask, callback) {
            expect(newTask).to.be.eql(sampleTask);
            callback(null);
        });

        var req = {body: sampleTask};
        var res = stubResSend('task added', done);

        var registeredCallback = router.post.firstCall.args[1];
        registeredCallback(req, res);

    });

});
