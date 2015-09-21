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
				subject: '我們需要 您的意見與力量，敬請在YYYY/MM/DD前協助完成問卷填寫',
				text: '親愛的' + rows.name + '同仁，\n\n面臨數位轉型的重要時期，需要 您的意見與力量，請在YYYY/MM/DD前協助完成問卷填寫，\n\n填寫方式：點選您的個人連結  ' + rows._id + ' ，按線上指示逐一填答即可。\n\n本問卷內容僅供統計，不涉個人工作，敬請放心填答，再次感謝 您的回饋！\n\n如有任何填答疑難或問題，請以本郵件回覆並說明情況，我們將盡速回覆您後續處理方式。'
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
