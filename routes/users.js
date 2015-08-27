var express = require('express');
var router = express.Router();

//
//	DATABASE
//	OBJECTID
//
var users = require('../database/users');
var ObjectID = require('mongoskin').ObjectID;

//
//	POST 
//	name, password
//
router.post('/', function(req, res, next) {

	var _name = req.body.name;
	var _password = req.body.password;

	var new_user = {
		name: _name,
		password: _password,
		questions: []
	};

	users
		.insert(new_user, function(err, rows) {
			res.json(rows);
		});

});

//
//	GET
//	ALL
//
router.get('/', function(req, res, next) {

	users
		.find({})
		.toArray(function(err, rows) {
			res.json(rows);
		});

});

//
//	GET
//	/:id/
//
router.get('/:id', function(req, res, next) {

	var _id = req.params.id;

	users
		.findById(_id, function(err, rows) {
			res.json(rows || []);
		});

});

//
//	PUT
//	/:id/
//	name, password
//
router.put('/:id', function(req, res, next) {

	var _id = req.params.id;

	var _name = req.body.name;
	var _password = req.body.password;

	var patched_user = {
		name: _name,
		password: _password
	};

	users
		.updateById(_id, patched_user, function(err, rows) {
			res.json(rows || []);
		});

});

//
//	PUT
//	/answer/:id/
//	question_id, answer
//
router.put('/:id/answer', function(req, res, next) {

	var _id = req.params.id;
	
	var _question_id = req.body.question_id;
	var _answer = req.body.answer;

	var answered = {
		question_id: _question_id,
		answer: _answer
	};

	// 
	//	check if there is already a answered's question_id is _question_id
	//	if there is one, just update its answer
	//	else create one
	//
	users.findById(_id, function(err, rows) {

		var tmp_arr = rows.questions.filter(function(question, i, arr) {
			if (question.question_id == _question_id)
				return true;
			else
				return false;
		});

		if (tmp_arr.length > 0) {
			users
				.update({
					_id: ObjectID(_id),
					'questions.question_id': _question_id
				}, {
					$set: {
						'questions.$.answer': _answer
					}
				}, function(err, rows) {
					res.json(rows || []);
				});
		} else {
			users
				.updateById(_id, {
					$push: {
						questions: answered
					}
				}, function(err, rows) {
					res.json(rows || []);
				});
		}
	});
});

//
//	DELETE
//	ALL
//
router.delete('/', function(req, res, next) {

	users
		.remove({}, function(err, rows) {
			res.json(rows);
		});

});

//
//	DELETE
//	/:id/
//
router.delete('/:id', function(req, res, next) {

	var _id = req.params.id;

	users
		.removeById(_id, function(err, rows) {
			res.json(rows);
		});

});

module.exports = router;
