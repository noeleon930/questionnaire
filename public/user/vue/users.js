var global_user_id = global_query['uid'];
var u = new Vue({
	el: '#personal',
	data: {
		name: '',
		email: '',
		serial: '',
		department: '',
		place: '',
		questions: [],
	},
	ready: function() {
		this.load(function(){});
	},
	methods: {
		load: function(callback) {
			$.get('../../users/' + global_user_id, function(user) {
				
				u.name = user.name || '';
				u.email = user.email || '';
				u.serial = user.serial || '';
				u.department = user.department || '';
				u.place = user.place || '';
				u.questions = user.questions;

				callback();
			});
		}
	}
});
