var express = require('express');
var task = require('../models/task');
var router = express.Router();

router.get('/', function(req, res, next) {
    task.all(function(err, tasks) {
        res.send(tasks);
    });
});

router.get('/:id', function(req, res, next) {});

module.exports = router;
