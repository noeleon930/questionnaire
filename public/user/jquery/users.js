var global_user_id = global_query['uid'];

var u = {
	name: '',
	email: '',
	serial: '',
	department: '',
	place: '',
	group: '',
	aspects_json: [],
	questions: [],
	load: function(callback) {
		$.ajax({
				url: '../../users/' + global_user_id,
				cache: false
			})
			.done(function(user) {

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

function get_start_users() {
	u.load(function() {
		$(document).attr('title', '數位轉型問卷 - ' + u.name);
		setTimeout(function() {
			u.aspects_json.forEach(function(uu, ii, arr) {
				$('#aspect-' + uu).addClass('success');
			});
		}, 500);

		$('#jquery_department_name').text('單位 : ' + u.department);
		$('#jquery_name_name').text('姓名 : ' + u.name);
		$('#jquery_place_name').text('職稱 : ' + u.place);
		$('#jquery_msg_name_name').text('親愛的' + u.name + '同仁，');
	});
}
