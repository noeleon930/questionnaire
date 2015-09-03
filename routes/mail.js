var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

//
//	DATABASE
//	OBJECTID
//
var users = require('../database/users');

var mail_transporter = nodemailer.createTransport({

	service: 'Gmail',
	auth: {
		user: '101703012@mail2.nccu.tw',
		pass: 'nj24nj24'
	}

});

//
//	GET
//	/:id/
//
router.get('/:id', function(req, res, next) {

	var _id = req.params.id;

	users
		.findById(_id, function(err, rows) {

			var mailOptions = {
				from: '101703012@mail2.nccu.tw',
				to: rows.email,
				subject: '請填寫數位轉型問卷',
				text: '請填寫數位轉型問卷'
			};

			mail_transporter.sendMail(mailOptions, function(err, info) {
				if (err) {
					res.json(false);
				} else {
					res.json(true);
				}
			});

		});
});

module.exports = router;
