var express = require('express');
var router = express.Router();

var excelParser = require('excel-parser');

router.post('/users', function(req, res, next) {

	excelParser.parse({
		inFile: req.file.path,
		worksheet: 1,
	}, function(err, records) {
		if (err) {
			// console.error(err);
			res.json(err)
		} else {
			// console.log(records);
			res.json(records);
		};
	});

});

module.exports = router;
