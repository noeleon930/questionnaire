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
	var _email = req.body.email;
	var _serial = req.body.serial;
	var _department = req.body.department;
	var _place = req.body.place;
	var _password = req.body.password;
	var _group = req.body.group;
	var _total_p = 0;

	var new_user = {
		name: _name,
		email: _email,
		serial: _serial,
		department: _department,
		place: _place,
		password: _password,
		group: _group,
		total_p: _total_p,
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
		.find({}, {
			sort: '_id'
		})
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
//	GET
//	/:id/
//
router.get('/:id/reset_questions', function(req, res, next) {

	var _id = req.params.id;

	var patched_user = {
		$set: {
			questions: [],
			aspects_json_string: '',
			total_p: 0
		}
	};

	users
		.updateById(_id, patched_user, function(err, rows) {
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
	var _email = req.body.email;
	var _serial = req.body.serial;
	var _department = req.body.department;
	var _place = req.body.place;
	var _password = req.body.password;
	var _group = req.body.group;
	// var _questions = req.body.questions == null ? [] : req.body.questions;
	// console.log(_questions);

	var patched_user = {
		$set: {
			name: _name,
			email: _email,
			serial: _serial,
			department: _department,
			place: _place,
			password: _password,
			group: _group,
			// questions: _questions,
		}
	};

	users
		.updateById(_id, patched_user, function(err, rows) {
			res.json(rows || []);
		});

});

//
//	PUT
//	/:id/
//	total_p
//
router.put('/:id/total_p', function(req, res, next) {

	var _id = req.params.id;

	var _total_p = parseInt(req.body.total_p);

	var patched_user = {
		$set: {
			total_p: _total_p
		}
	};

	users
		.updateById(_id, patched_user, function(err, rows) {
			res.json(rows || []);
		});

});

router.put('/:id/completed_aspects', function(req, res, next) {

	var _id = req.params.id;

	var _aspects_json_string = req.body.aspects_json_string;

	var patched_user = {
		$set: {
			aspects_json_string: _aspects_json_string
		}
	};

	users
		.updateById(_id, patched_user, function(err, rows) {
			res.json(rows || []);
		});
});

//
//	PUT
//	/:id/
//	mail_times
//
router.put('/:id/mail_times', function(req, res, next) {

	var _id = req.params.id;

	var patched_user = {
		$inc: {
			mail_times: 1
		}
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
	var _aspect_id = req.body.aspect_id;
	var _answer = req.body.answer;

	var answered = {
		question_id: _question_id,
		aspect_id: _aspect_id,
		answer: _answer
	};

	// 
	//	check if there is already a answered's question_id is _question_id
	//	if there is one, just update its answer
	//	else create one
	//
	users.findById(_id, function(err, rows) {

		if (rows == null) {
			res.json([]);
		} else {

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

	console.log('helllo');

});

module.exports = router;
