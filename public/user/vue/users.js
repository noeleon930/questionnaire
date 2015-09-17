var global_user_id = global_query['uid'];
var u = new Vue({
	el: '#personal',
	data: {
		name: '',
		email: '',
		serial: '',
		department: '',
		place: '',
		group: '',
		aspects_json: [],
		questions: [],
	},
	ready: function() {
		this.load(function() {
			$('#the_title').html('數位轉型問卷 - ' + u.name);
			setTimeout(function() {
				u.aspects_json.forEach(function(uu, ii, arr) {
					$('#aspect-' + uu).addClass('success');
				});
			}, 200);
		});
	},
	methods: {
		load: function(callback) {
			$.get('../../users/' + global_user_id, function(user) {

				u.name = user.name || '';
				u.email = user.email || '';
				u.serial = user.serial || '';
				u.department = user.department || '';
				u.place = user.place || '';
				u.group = user.group || '';
				u.aspects_json = ((user.aspects_json_string == undefined || user.aspects_json_string == '') ? [] : JSON.parse(user.aspects_json_string));
				u.questions = user.questions;

				callback();
			});
		}
	}
});
