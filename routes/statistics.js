var express = require('express');
var router = express.Router();

//
//	DATABASE
//
var questions = require('../database/questions');
var users = require('../database/users');

router.get('/yes', function(req, res, next) {

	var _aspect_id = req.body.aspect;

	// questions
	// 	.find({
	// 		aspect: _aspect_id
	// 	}, {
	// 		sort: 'number'
	// 	})
	// 	.toArray(function(err, rows) {

	// 		var tmp = rows.map(function(row, i, arr) {
	// 			return row._id;
	// 		});

	users.find({
		'questions.answer': 'Yes'
	}).toArray(function(err, rows) {
		res.json(rows);
	});
	// });

});

// router.get('/no', function(req, res, next) {

// 	var _aspect = req.body.aspect;

// 	questions.aggregate()

// });

// router.get('/unknown', function(req, res, next) {

// 	var _aspect = req.body.aspect;

// 	questions.aggregate()

// });

module.exports = router;
