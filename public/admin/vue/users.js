// console.fuck = (a) => console.log("fuck " + a);
var u = new Vue({
	el: '#users',
	data: {
		users: [],
		groups: []
	},
	ready: function() {
		this.get_all();
	},
	methods: {
		get_all: function() {
			$.get('../../groups', function(db_groups) {
				u.groups = db_groups;

				$.get('../../users/', function(db_users) {

					var tmp = db_users.map(function(user, i, arr) {
						user.id = user._id;
						user.i7d = user.id.substring(0, 7);
						user.link = '../user?uid=' + user.id;
						if (user.serial == '' || user.serial == undefined || user.name == '' || user.name == undefined) {
							user.link = '';
							user.i7d = '';
						}
						return user;
					});

					if (tmp.length == 0) {
						tmp = [{
							name: '',
							email: '',
							serial: '',
							department: '',
							place: '',
							password: '',
							group: ''
						}];
						$.ajax({
								url: '../../users/',
								method: 'POST',
								data: {
									name: tmp[0].name,
									email: tmp[0].email,
									serial: tmp[0].serial,
									department: tmp[0].department,
									place: tmp[0].place,
									password: tmp[0].password,
									group: tmp[0].group
								}
							})
							.done(function(data) {
								console.log('get_first_one ' + data);
								u.update_all();
							});
					} else {
						var tmp2 = tmp
							.map(function(user, i, arr) {

								var the_group = u.groups.filter(function(group) {
									return group._id === user.group;
								});

								if (the_group.length == 1) {
									user.group = the_group[0].name;
								} else {
									user.group = '';
								}

								return user;
							});
							// .sort(function(u1, u2) {
							// 	if (u1.serial < u2.serial) {
							// 		return -1;
							// 	} else if (u1.serial > u2.serial) {
							// 		return 1;
							// 	} else {
							// 		return 0;
							// 	}
							// });
						u.users = tmp2;

						// u.check_duplicate(true);
					}
				});
			});

		},
		put_all: function() {

			// call update_content foreach
			u.users.forEach(function(user, i, arr) {
				u.update_content(user);
			});
		},
		add_below: function() {

			u.users.push({
				name: '',
				email: '',
				serial: '',
				department: '',
				place: '',
				password: '',
				group: ''
			});

			$.ajax({
					url: '../../users/',
					method: 'POST',
					data: {
						name: u.users[u.users.length - 1].name,
						email: u.users[u.users.length - 1].email,
						serial: u.users[u.users.length - 1].serial,
						department: u.users[u.users.length - 1].department,
						place: u.users[u.users.length - 1].place,
						password: u.users[u.users.length - 1].password,
						group: u.users[u.users.length - 1].group
					}
				})
				.done(function(data) {
					u.update_all();
					console.log('done_adding' + data);
				});
		},
		update_content: function(user, change_group) {
			if (change_group) {

				if (user.questions.length != 0) {
					if (confirm('確認更改群組 -> 「' + user.name + '  ' + user.department + '  ' + user.place + '」 至 ' + '「' + user.group + '」 嗎?')) {
						$.get('../../users/' + user._id + '/reset_questions', function(data) {
							console.log('user ' + user.name + ' has been reset questions');
						});
					} else {
						return;
					}
				}
			}

			$.ajax({
					url: '../../users/' + user._id,
					method: 'PUT',
					data: {
						name: user.name,
						email: user.email,
						serial: user.serial,
						department: user.department,
						place: user.place,
						password: user.password,
						group: (function() {
							var tmp = u.groups.filter(function(group) {
								return (group.name === user.group);
							});
							if (tmp.length == 1) {
								return tmp[0]._id;
							} else {
								return '';
							}
						})()
					}
				})
				.done(function(data) {
					if (user.id == undefined) {
						// console.fuck('ME');
					} else {
						user.i7d = user.id.substring(0, 7);
						user.link = '../user?uid=' + user.id;
					}
				});

		},
		delete: function(n) {
			if (confirm('確認刪除 -> 「' + u.users[n].name + '  ' + u.users[n].department + '  ' + u.users[n].place + '」 嗎?')) {
				$.ajax({
						url: '../../users/' + u.users[n]._id,
						method: 'DELETE'
					})
					.done(function(data) {
						u.update_all();
						console.log('done_deleting' + data);
					});
			}
		},
		delete_all: function() {
			if (confirm('確認刪除 -> 「所有使用者」 嗎?')) {
				$.ajax({
						url: '../../users/',
						method: 'DELETE'
					})
					.done(function(data) {
						u.update_all();
						console.log('done_deleting' + data);
					});
			}
		},
		update_all: function() {
			this.put_all();
			this.get_all();
		},
		check_duplicate: function(fileupload) {
			// Warn duplicated data 
			var countTmp = {};
			this.users.forEach(function(uu, ii, arrr) {
				if (countTmp[uu.serial] == undefined || countTmp[uu.serial] == null) {
					countTmp[uu.serial] = 1;
				} else {
					countTmp[uu.serial] += 1;
				}
			});

			var summmm = '';
			var alerttt = false;
			Object.keys(countTmp).forEach(function(p, ii, arrrr) {
				if (countTmp[p] > 1) {
					summmm += '員工編號 ' + p + ' 有重複資料，請檢查\n';
					alerttt = true;
				}
			});

			console.log(countTmp);
			console.log('wowowow', countTmp[4]);

			if (alerttt) {
				alert(summmm);
			} else if (alerttt == false && fileupload != true) {
				alert('資料正確');
			} else if (alerttt == true && fileupload == true) {
				alert(summmm);
			}
		}
	}
});

var parse_data = function(input) {

	var tmp = parseInt(input);

	if (tmp + 1 != tmp + 1) {
		return input;
	} else {
		return tmp.toString();
	}
};

$('#users_upload_button').click(function(event) {

	event.preventDefault();

	var formData = new FormData($('#users_upload')[0]);

	$.ajax({
			url: '../../upload/users',
			type: 'POST',
			data: formData,
			cache: false,
			contentType: false,
			processData: false,
		})
		.done(function(data) {

			var tmp = [];

			for (var i = 1; i < data.length; i++) {
				tmp.push(data[i]);
			}

			var ttmp = tmp.map(function(user, i, arr) {
				return {
					name: user[1],
					email: user[4],
					serial: parse_data(user[0]),
					department: user[2],
					place: user[3],
					password: '',
					group: parse_data(user[5])
				};
			});

			console.log(ttmp);

			ttmp.forEach(function(user, i, arr) {
				$.ajax({
					url: '../../users/',
					method: 'POST',
					data: {
						name: user.name,
						email: user.email,
						serial: user.serial,
						department: user.department,
						place: user.place,
						password: user.password,
						group: (function() {
							var tmp = u.groups.filter(function(group) {
								return (group.name === user.group);
							});
							if (tmp.length == 1) {
								return tmp[0]._id;
							} else {
								return '';
							}
						})()
					}
				});
			});

			u.get_all();

			$('#users_upload_status').text('上傳成功');
			$('#users_file').val('');

			// u.check_duplicate(true);
		})
		.fail(function() {

			$('#users_upload_status').text('上傳失敗');
			$('#users_file').val('');
		});

});

$('#users_download').click(function() {
	$(this).attr("href", "../../download/users");
});
