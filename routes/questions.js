var express = require('express');
var router = express.Router();

//
//	DATABASE
//
var questions = require('../database/questions');

//
//	POST 
//	aspect, number, content
//
router.post('/', function(req, res, next) {

	var _aspect = req.body.aspect;
	var _number = parseInt(req.body.number);
	var _content = req.body.content;

	var new_question = {
		aspect: _aspect,
		number: _number,
		content: _content
	};

	questions
		.insert(new_question, function(err, rows) {
			res.json(rows);
		});
});

//
//	GET
//	ALL
//
router.get('/', function(req, res, next) {

	questions
		.find({}, {
			sort: 'number'
		})
		.toArray(function(err, rows) {
			res.json(rows);
		});

});

//
//	GET
//	aspect's id
//
router.get('/aspect/:id', function(req, res, next) {

	var _aspect_id = req.params.id;

	questions
		.find({
			aspect: _aspect_id
		}, {
			sort: 'number'
		})
		.toArray(function(err, rows) {
			res.json(rows || []);
		});

});

//
//	GET
//	/:id/
//
router.get('/:id', function(req, res, next) {

	var _id = req.params.id;

	questions
		.findById(_id, function(err, rows) {
			res.json(rows || []);
		});

});

//
//	PUT
//	/:id/
//	aspect, number, content
//
router.put('/:id', function(req, res, next) {

	var _id = req.params.id;

	var _aspect = req.body.aspect;
	var _number = parseInt(req.body.number);
	var _content = req.body.content;

	var patched_question = {
		aspect: _aspect,
		number: _number,
		content: _content
	};

	questions
		.updateById(_id, patched_question, function(err, rows) {
			res.json(rows);
		});

});

//
//	DELETE
//	ALL
//
router.delete('/', function(req, res, next) {

	questions
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

	questions
		.removeById(_id, function(err, rows) {
			res.json(rows);
		});

});

module.exports = router;
