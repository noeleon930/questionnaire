var express = require('express');
var fs = require("fs");
var json2xls = require('json2xls');
var json2xls_xml = require('json2xls-xml')({
	pretty: true
});
var router = express.Router();

//
//	DATABASE
//	OBJECTID
//
var users = require('../database/users');
var groups = require('../database/groups');
var questions = require('../database/questions');
var aspects = require('../database/aspects');

//
// in$
//
function in$(x, xs) {
	var i = -1,
		l = xs.length >>> 0;
	while (++i < l)
		if (x == xs[i]) return true;
	return false;
}

router.get('/users', json2xls.middleware, function(req, res, next) {

	// For sendFile settings
	// var sendFile_options = {
	// 	root: __dirname + '../questionnaire_downloads/',
	// 	dotfiles: 'deny',
	// 	headers: {
	// 		'x-timestamp': Date.now(),
	// 		'x-sent': true
	// 	}
	// };

	groups.find({}).toArray(function(err, group_rows) {
		users
			.find({}, {
				sort: '_id'
			})
			.toArray(function(err, user_rows) {

				var tmp = user_rows.map(function(user, i, arr) {
					return {
						'員工編號': user.serial,
						'連結': 'http://140.119.164.155:1224/static/user?uid=' + user._id,
						'姓名': user.name,
						'單位名稱': user.department,
						'職稱': user.place,
						'電子信箱': user.email,
						'群組': (group_rows.filter(function(g) {
							if (g._id == user.group)
								return true;
							else
								return false;
						}))[0].name,
					};
				});

				res.xls('users.xlsx', tmp);
			});
	});
});

router.get('/questions', function(req, res, next) {

	aspects.find({}).toArray(function(err, aspect_rows) {
		questions.find({}).toArray(function(err, question_rows) {

			var result_json = {};

			aspect_rows.forEach(function(a, i, arr) {

				var tmp = question_rows
					.filter(function(q) {
						if (q.aspect == a._id)
							return true;
						else
							return false;
					})
					.map(function(q, i, arr) {
						return {
							'構面名稱': a.name,
							'題號': q.number,
							'內容': q.content
						};
					});

				result_json[a.name] = tmp;
			});

			var timestamp = Date.now();
			var the_path = __dirname + '/../../questionnaire_downloads/questions_' + timestamp + '.xls';

			fs.writeFile(the_path, json2xls_xml(result_json), function(err) {
				if (err)
					res.json(err);
				else
					res.download(the_path, 'questions.xls', function(err) {
						if (err)
							res.json(err);
					});
			});
		});
	});
});

router.get('/statistics', function(req, res, next) {
	aspects.find({}).toArray(function(err, aspect_rows) {
		if (err) res.json(err);
		groups.find({}).toArray(function(err, group_rows) {
			if (err) res.json(err);
			users.find({}).toArray(function(err, db_users) {
				if (err) res.json(err);
				questions.find({}).toArray(function(err, question_rows) {
					if (err) res.json(err);

					var result_json = {};

					aspect_rows.forEach(function(the_aspect, i, arr) {

						// get questions in the_aspect
						var db_questions = question_rows.filter(function(_question) {
							return _question.aspect == the_aspect._id
						});

						// get groups'_id that contains the aspect
						var group_permission = group_rows
							.filter(function(group) {
								return (group.aspects
									.filter(function(_aspect) {
										return (_aspect.id == the_aspect._id && (_aspect.checked == 'true' || _aspect.checked == true));
									})
									.length > 0);
							})
							.map(function(group) {
								return group._id;
							});

						// get the length of how many users have the group
						var tmp_total = db_users
							.filter(function(user) {
								// console.log(user.name, ':', user.group);
								return (in$(user.group, group_permission));
							})
							.length;

						var tmp = db_questions
							.map(function(question, i, arr) {
								question.id = question._id;
								question.number = i + 1;
								return question;
							})
							.map(function(question, i, arr) {

								var ttmp = {
									id: question.id,
									number: question.number,
									content: question.content,
									yes: 0,
									no: 0,
									unknown: 0,
									total: tmp_total
								};

								db_users.forEach(function(user, i, arr) {
									user.questions.forEach(function(answer, i, arr) {
										if (answer.question_id == question._id) {
											if (answer.answer == 'Yes') {
												ttmp.yes = ttmp.yes + 1;
											} else if (answer.answer == 'No') {
												ttmp.no = ttmp.no + 1;
											}
										}
									});
								});

								ttmp.unknown = tmp_total - ttmp.yes - ttmp.no;

								if (ttmp.unknown < 0) ttmp.unknown = 0;

								if (ttmp.yes + ttmp.no + ttmp.unknown <= 0) {
									ttmp.yes_p = 0;
									ttmp.no_p = 0;
									ttmp.unknown_p = 0;
								} else {
									ttmp.yes_p = ttmp.yes / (ttmp.yes + ttmp.no + ttmp.unknown) * 100;
									ttmp.no_p = ttmp.no / (ttmp.yes + ttmp.no + ttmp.unknown) * 100;
									ttmp.unknown_p = ttmp.unknown / (ttmp.yes + ttmp.no + ttmp.unknown) * 100;
								}

								return ttmp;
							})
							.map(function(question, i, arr) {
								return {
									'構面名稱': the_aspect.name,
									'題號': question.number,
									'內容': question.content,
									'是%': question.yes_p,
									'否%': question.no_p,
									'總人數': tmp_total,
									'未答人數': question.unknown,
									'缺答率%': question.unknown_p,
								}
							});

						result_json[the_aspect.name] = tmp;
					});

					var timestamp = Date.now();
					var the_path = __dirname + '/../../questionnaire_downloads/statistics_' + timestamp + '.xls';

					fs.writeFile(the_path, json2xls_xml(result_json), function(err) {
						if (err)
							res.json(err);
						else
							res.download(the_path, 'statistics.xls', function(err) {
								if (err)
									res.json(err);
							});
					});

				});
			});
		});
	});
});

module.exports = router;
