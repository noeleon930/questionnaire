// console.fuck = (a) => console.log("fuck " + a);
var u = new Vue({
	el: '#users',
	data: {
		users: []
	},
	ready: function() {
		this.get_all();
	},
	methods: {
		get_all: function() {
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
						password: ''
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
								password: tmp[0].password
							}
						})
						.done(function(data) {
							console.log('get_first_one ' + data);
							u.update_all();
						});
				} else {
					u.users = tmp;
				}

				console.log(tmp);
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
				password: ''
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
						password: u.users[u.users.length - 1].password
					}
				})
				.done(function(data) {
					u.update_all();
					console.log('done_adding' + data);
				});
		},
		update_content: function(user) {
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
			$.ajax({
					url: '../../users/' + u.users[n]._id,
					method: 'DELETE'
				})
				.done(function(data) {
					u.update_all();
					console.log('done_deleting' + data);
				});
		},
		update_all: function() {
			this.put_all();
			this.get_all();
		}
	}
});
