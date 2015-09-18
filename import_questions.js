var aspects = require('./database/aspects');
var questions = require('./database/questions');
var fs = require('fs');
var csv = require('csv-parser');

var aspect_id_pair = [{
	"_id": "z"
}, {
	"_id": '55fc65525eff51287fed18c9',
	"name": "願景及策略",
	"comment": ""
}, {
	"_id": '55fc65525eff51287fed18ca',
	"name": "公司治理",
	"comment": ""
}, {
	"_id": '55fc65525eff51287fed18cb',
	"name": "組織人力",
	"comment": ""
}, {
	"_id": '55fc65525eff51287fed18cc',
	"name": "科技應用",
	"comment": ""
}, {
	"_id": '55fc65525eff51287fed18cd',
	"name": "資料分析",
	"comment": ""
}, {
	"_id": '55fc65525eff51287fed18ce',
	"name": "數位風險管理",
	"comment": ""
}, {
	"_id": '55fc65525eff51287fed18cf',
	"name": "客戶經營",
	"comment": ""
}, {
	"_id": '55fc65525eff51287fed18d0',
	"name": "通路體驗",
	"comment": ""
}].map(function(item, i, arr) {
	return item._id;
});

console.log(aspect_id_pair);


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
