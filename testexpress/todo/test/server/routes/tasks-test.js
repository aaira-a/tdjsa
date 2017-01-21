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
});
