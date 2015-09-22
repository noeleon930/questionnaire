var express = require('express');
var nodemailer = require('nodemailer');
var wellknown = require('nodemailer-wellknown');
var smtpTransport = require('nodemailer-smtp-transport');
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

// var mail_transporter = nodemailer.createTransport(smtpTransport({
// 	host: "debugmail.io",
// 	secureConnection: false,
// 	port: 25,
// 	auth: {
// 		user: '101703012@nccu.edu.tw',
// 		pass: 'a85af2c0-60e8-11e5-8777-9164a8a726e6'
// 	}
// }));

//
//	GET
//	/:id/
//
router.get('/:id', function(req, res, next) {

	var _id = req.params.id;

	users
		.findById(_id, function(err, rows) {

			var mailOptions = {
				from: 'info@kpmg.tw',
				to: rows.email,
				subject: '我們需要 您的意見與力量，敬請在 2015/10/08 前協助完成問卷填寫',
				text: '親愛的' + rows.name + '同仁，\n\n面臨數位轉型的重要時期，需要 您的意見與力量，請在 2015/10/08 前協助完成問卷填寫，\n\n填寫方式：點選您的個人連結  http://140.119.24.13:41224/static/user?uid=' + rows._id + ' ，按線上指示逐一填答即可。\n\n本問卷內容僅供統計，不涉個人工作，敬請放心填答，再次感謝 您的回饋！\n\n如有任何填答疑難或問題，請以本郵件回覆並說明情況，我們將盡速回覆您後續處理方式。'
			};

			mail_transporter.sendMail(mailOptions, function(err, info) {
				if (err) {
					res.json({
						'error': err
					});
				} else {
					res.json(true);
				}
			});

		});
});

module.exports = router;
