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
				subject: '請於10月 8日前完成數位成熟度問卷',
				html: '<p>親愛的' + rows.name + '同仁，</p>' +
					'<p>為瞭解行內數位成熟度的現況，煩請撥冗填答KPMG規劃之數位成熟度問卷，並於10/08 (四)前完成。</p>' +
					'<p>請點選<a href="http://140.119.164.155:1224/static/user?uid=' + rows._id + '">個人連結</a>，並按線上指示逐一填答。</p>' +
					'<p>本問卷內容僅需您寶貴20分鐘，其內容僅供內部分析統計，作為行內數位策略規劃依據，您的寶貴意見將有助於行內順利推動數位轉型！</p>' +
					'<p>如有任何填答或連線疑難，請以郵件聯絡<a href="mailto:gracewang2@kpmg.com.tw">數位成熟度問卷小組</a>，將於收信後盡速回覆。</p>' +
					'<p> </p> <p> </p> <p> </p>'
			};

			setTimeout(function() {
				mail_transporter.sendMail(mailOptions, function(err, info) {
					if (err) {
						res.json({
							'error': err
						});
					} else {
						res.json(true);
					}
				});
			}, 100);

		});
});

module.exports = router;
