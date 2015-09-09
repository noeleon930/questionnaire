var express = require('express');
var router = express.Router();

//
//	DATABASE
//
var groups = require('../database/groups');

//
//	POST
//	name, comment
//
router.post('/', function(req, res, next) {

	var _name = req.body.name;
	var _aspects = req.body.aspects || [];

	var new_group = {
		name: _name,
		aspects: _aspects
	}

	groups
		.insert(new_group, function(err, rows) {
			res.json(rows);
		});

});

//
//	GET
//
router.get('/', function(req, res, next) {

	groups
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

	groups
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
	var _aspects = req.body.aspects || [];

	var patched_group = {
		name: _name,
		aspects: _aspects
	}

	groups
		.updateById(_id, patched_group, function(err, rows) {
			res.json(rows);
		});
});

//
//	DELETE
//
router.delete('/', function(req, res, next) {

	groups
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

	groups
		.removeById(_id, function(err, rows) {
			res.json(rows);
		});

});

module.exports = router;
