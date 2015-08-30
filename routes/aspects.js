var express = require('express');
var router = express.Router();

//
//	DATABASE
//
var aspects = require('../database/aspects');

//
//	POST
//	name, comment
//
router.post('/', function(req, res, next) {

	var _name = req.body.name;
	var _comment = req.body.comment;

	var new_aspect = {
		name: _name,
		comment: _comment,
		// questions: []
	}

	aspects
		.insert(new_aspect, function(err, rows) {
			res.json(rows);
		});

});

//
//	GET
//
router.get('/', function(req, res, next) {

	aspects
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

	aspects
		.findById(_id, function(err, rows) {
			res.json(rows || []);
		});

});

//
//	PUT
//	/:id/
//	name, comment
//
router.put('/:id', function(req, res, next) {

	var _id = req.params.id;

	var _name = req.body.name;
	var _comment = req.body.comment;

	var patched_aspect = {
		name: _name,
		comment: _comment
	};

	console.log(patched_aspect);

	aspects
		.updateById(_id, patched_aspect, function(err, rows) {
			res.json(rows);
		});
});

//
//	PUT
//	/:id/
//	name, questions
//
// router.put('/:id/add', function(req, res, next) {

// 	var _id = req.params.id;

// 	var _question_id = req.body.question_id;

// 	aspects
// 		.updateById(_id, {
// 			$addToSet: {
// 				questions: _question_id
// 			}
// 		}, function(err, rows) {
// 			res.json(rows || []);
// 		});
// });

//
//	DELETE
//
router.delete('/', function(req, res, next) {

	aspects
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

	aspects
		.removeById(_id, function(err, rows) {
			res.json(rows);
		});

});

module.exports = router;
