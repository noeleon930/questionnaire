var urge = new Vue({
	el: '#urges',
	data: {
		aspects: [],
		users: [],
		questions: [],
	},
	compiled: function() {
		this.get_all_aspects();
		this.get_all_users();
		this.get_all_questions();
	},
	methods: {
		get_all_aspects: function() {
			$.get('../../aspects', function(db_aspects) {
				urge.aspects = db_aspects;
			});
		},
		get_all_users: function() {
			$.get('../../users', function(db_users) {

				var tmp = db_users.map(function(user, i, arr) {
					user.id = user._id;
					user.i7d = user.id.substring(0, 7);
					user.link = '../user?uid=' + user.id;
					if (user.serial == '' || user.serial == undefined || user.name == '' || user.name == undefined) {
						user.link = '';
						user.i7d = '';
					}

					user.selected = false;

					if (user.mail_times > 0 && user.mail_times != undefined) {
						user.mail_status = '已寄送' + user.mail_times + '次';
					} else {
						user.mail_status = '';
					}


					return user;
				});

				urge.users = tmp;

				console.log('get all urge users');
			});
		},
		get_all_questions: function() {
			$.get('../../questions', function(db_questions) {
				urge.questions = db_questions;

				console.log('get all urge questions');
			});
		},
		get_aspects_p: function(user, aspect) {

			var tmp1 = user.questions.filter(function(question) {
				if (question.aspect_id == aspect._id) {
					return true;
				} else {
					return false;
				}
			});

			var tmp2 = urge.questions.filter(function(question) {
				if (question.aspect == aspect._id) {
					return true;
				} else {
					return false;
				}
			});

			return Math.floor(tmp1.length / tmp2.length * 100);

		},
		get_all_p: function(user) {
			// var tmp = Math.floor(user.questions.length / (urge.questions.length) * 100);
			// if (tmp >= 100) {
			// 	// $('#send-' + user._id).hide(1);
			// 	tmp = 100;
			// 	user.lock = true;
			// 	document.getElementById('send-' + user._id).disabled = true;
			// }
			// return tmp;
			if (user.total_p >= 100) {
				user.lock = true;
				document.getElementById('send-' + user._id).disabled = true;
				user.total_p = 100;
			} else if ((user.total_p + 1 != user.total_p + 1) || (users.total_p <= 0)) {
				user.total_p = 0;
			}
			return user.total_p;
		},
		toggle_send: function(user) {
			if (user.lock) {
				user.selected = false;
				document.getElementById('send-' + user._id).disabled = true;
			} else {
				user.selected = !user.selected;
				$('#send-' + user._id).prop("checked", user.selected);
			}
		},
		toggle_all: function(target) {
			for (var i = 0; i < urge.users.length; i++) {
				if (urge.users[i].lock) {
					urge.users[i].selected = false;
					document.getElementById('send-' + urge.users[i]._id).disabled = true;
				} else {
					urge.users[i].selected = target;
					$('#send-' + urge.users[i]._id).prop("checked", target);
				}
			}
		},
		send_mail: function() {

			var tmp = urge.users.filter(function(user) {
				return user.selected;
			});

			if (tmp.length == 0) {
				alert('請至少選擇一位使用者');
				return
			}

			tmp.forEach(function(user, i, arr) {
				$.get('../../mail/' + user._id, function(result) {
					if (result == true || result == 'true') {
						$.ajax({
								url: '../../users/' + user._id + '/mail_times',
								method: 'PUT',
							})
							.done(function(data) {
								$.get('../../users/' + user._id, function(_user) {
									user.mail_status = '已寄送' + _user.mail_times + '次';
								});
							});

					} else {
						user.mail_status = '失敗';
					}
				});
			});
		},
		mouseOver: function(user) {
			$('#urge-row-' + user.id).addClass('overedTableRow');
		},
		mouseOut: function(user) {
			$('#urge-row-' + user.id).removeClass('overedTableRow');
		}
	}
});
