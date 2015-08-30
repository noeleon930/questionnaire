var aspects = require('./database/aspects');
var questions = require('./database/questions');
var fs = require('fs');
var csv = require('csv-parser');

var aspect_id_pair = {
	1: "55e33f2e050feb6f0474be09",
	2: "55e33f30050feb6f0474be0b",
	3: "55e33f33050feb6f0474be0d",
	4: "55e33f39050feb6f0474be0f",
	5: "55e33f49050feb6f0474be11",
	6: "55e33f4e050feb6f0474be13",
	7: "55e33f51050feb6f0474be15",
	8: "55e33f57050feb6f0474be17",
};


fs.createReadStream('1.csv')
	.pipe(csv({
		raw: false,
		separator: '	',
		newline: '\n',
		strict: true
	}))
	.on('data', function(data) {
		questions.insert({
			aspect: aspect_id_pair[1],
			number: 0,
			content: data['題目-Chinese']
		}, function(err, rows) {
			console.log(rows);
		});
	});

fs.createReadStream('2.csv')
	.pipe(csv({
		raw: false,
		separator: '	',
		newline: '\n',
		strict: true
	}))
	.on('data', function(data) {
		questions.insert({
			aspect: aspect_id_pair[2],
			number: 0,
			content: data['題目-Chinese']
		}, function(err, rows) {
			console.log(rows);
		});
	});

fs.createReadStream('3.csv')
	.pipe(csv({
		raw: false,
		separator: '	',
		newline: '\n',
		strict: true
	}))
	.on('data', function(data) {
		questions.insert({
			aspect: aspect_id_pair[3],
			number: 0,
			content: data['題目-Chinese']
		}, function(err, rows) {
			console.log(rows);
		});
	});

fs.createReadStream('4.csv')
	.pipe(csv({
		raw: false,
		separator: '	',
		newline: '\n',
		strict: true
	}))
	.on('data', function(data) {
		questions.insert({
			aspect: aspect_id_pair[4],
			number: 0,
			content: data['題目-Chinese']
		}, function(err, rows) {
			console.log(rows);
		});
	});

fs.createReadStream('5.csv')
	.pipe(csv({
		raw: false,
		separator: '	',
		newline: '\n',
		strict: true
	}))
	.on('data', function(data) {
		questions.insert({
			aspect: aspect_id_pair[5],
			number: 0,
			content: data['題目-Chinese']
		}, function(err, rows) {
			console.log(rows);
		});
	});

fs.createReadStream('6.csv')
	.pipe(csv({
		raw: false,
		separator: '	',
		newline: '\n',
		strict: true
	}))
	.on('data', function(data) {
		questions.insert({
			aspect: aspect_id_pair[6],
			number: 0,
			content: data['題目-Chinese']
		}, function(err, rows) {
			console.log(rows);
		});
	});

fs.createReadStream('7.csv')
	.pipe(csv({
		raw: false,
		separator: '	',
		newline: '\n',
		strict: true
	}))
	.on('data', function(data) {
		questions.insert({
			aspect: aspect_id_pair[7],
			number: 0,
			content: data['題目-Chinese']
		}, function(err, rows) {
			console.log(rows);
		});
	});

fs.createReadStream('8.csv')
	.pipe(csv({
		raw: false,
		separator: '	',
		newline: '\n',
		strict: true
	}))
	.on('data', function(data) {
		questions.insert({
			aspect: aspect_id_pair[8],
			number: 0,
			content: data['題目-Chinese']
		}, function(err, rows) {
			console.log(rows);
		});
	});
