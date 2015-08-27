var express = require('express');
var router = express.Router();

var users = require('../database/users');
var questions = require('../database/questions');

router.post('/', function(req, res, next) {

	var _name = req.query.name;
	var _age = parseInt(req.query.age);

	var new_user = {
		name: _name,
		age: _age
	};

	users.insert(new_user, function(err, rows) {
		res.json(rows);
	});

});

router.get('/', function(req, res, next) {

	users.find({}).toArray(function(err, rows) {
		res.json(rows);
	});

});

router.delete('/', function(req, res, next) {

	users.remove({}, function(err, rows) {
		res.json(rows);
	});

});

module.exports = router;
