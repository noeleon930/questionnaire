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
				u.update_content(i);
			});
		},
		add_below: function(n) {

			// if we click the add_below at last item
			if (n + 1 == u.users.length) {
				u.users.push({
					name: '',
					email: '',
					serial: '',
					department: '',
					place: '',
					password: ''
				});
			} else {
				u.users.splice(n + 1, 0, {
					name: '',
					email: '',
					serial: '',
					department: '',
					place: '',
					password: ''
				});
			}

			// n + 1 is new-added's index
			// n + 2 is new-added's number

			$.ajax({
					url: '../../users/',
					method: 'POST',
					data: {
						name: u.users[n + 1].name,
						email: u.users[n + 1].email,
						serial: u.users[n + 1].serial,
						department: u.users[n + 1].department,
						place: u.users[n + 1].place,
						password: u.users[n + 1].password
					}
				})
				.done(function(data) {
					u.update_all();
					console.log('done_adding' + data);
				});
		},
		update_content: function(n) {
			$.ajax({
					url: '../../users/' + u.users[n]._id,
					method: 'PUT',
					data: {
						name: u.users[n].name,
						email: u.users[n].email,
						serial: u.users[n].serial,
						department: u.users[n].department,
						place: u.users[n].place,
						password: u.users[n].password
					}
				})
				.done(function(data) {
					console.log('done_updating ' + data);
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
