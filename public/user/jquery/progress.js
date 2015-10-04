var prg = {
	total_num: 0,
	total_user_selected: 0,
	total_p: 0,
	aspect_p: 0,
	aspect_selected_num: 0,
	aspect_total_num: 0,
	total_pc: function() {
		prg.total_p = Math.floor(u.questions.length / prg.total_num * 100) > 100 ? 0 : Math.floor(u.questions.length / prg.total_num * 100);

		prg.total_user_selected = u.questions.length;

		if (prg.total_p + 1 != prg.total_p + 1) {
			prg.total_p = 0;
		}

		$('#jquery-total').text('總進度 : ' + prg.total_user_selected + ' / ' + prg.total_num);

		$('#jquery-total-p').text(prg.total_p + '%');
		$('#jquery-total-p').css('width', prg.total_p + '%');

		$.ajax({
				url: '../../users/' + global_user_id + '/total_p',
				method: 'PUT',
				cache: false,
				data: {
					total_p: prg.total_p
				}
			})
			.done(function(data) {
				// console.log('done_updating total_p' + data);
				if (prg.total_p >= 100.0 && entered == true) {
					alert('感謝您的填答，因為您的配合使得本行數位化發展更進一步，\n如確定完成請點選右上離開系統件離開本問卷。');
				}
			});
	},
	aspect_pc: function() {

		var tmp = 0;

		q.questions.forEach(function(question1, i, arr) {
			u.questions.forEach(function(question2, i, arr) {
				if (question1._id == question2.question_id) {
					tmp = tmp + 1;
				}
			});
		});

		prg.aspect_p = Math.floor(tmp / q.questions.length * 100) || 0;

		prg.aspect_selected_num = tmp;
		prg.aspect_total_num = q.questions.length;

		$('#jquery-aspect').text('構面進度 : ' + prg.aspect_selected_num + ' / ' + prg.aspect_total_num);

		$('#jquery-aspect-p').text(prg.aspect_p + '%');
		$('#jquery-aspect-p').css('width', prg.aspect_p + '%');

		if (prg.aspect_p == 100 || prg.aspect_p == 100.0 || prg.aspect_p == '100' || prg.aspect_p == '100.0') {
			$.ajax({
					url: '../../users/' + global_user_id + '/completed_aspects',
					method: 'PUT',
					cache: false,
					data: {
						aspects_json_string: JSON.stringify((u.aspects_json != undefined || u.aspects_json.length > 0) ? (function() {
							var aaa = u.aspects_json;
							aaa.push(a.current_aspect_id);
							return aaa;
						})() : [a.current_aspect_id])
					}
				})
				.done(function(data) {
					// console.log('done_updating completed_aspects' + data);
					$('#aspect-' + a.current_aspect_id).addClass('success');
				});
		}
	}
};

function get_start_progress() {
	$.ajax({
			url: '../../questions',
			cache: false
		})
		.done(function(db_questions) {

			setTimeout(function() {
				prg.total_num = db_questions
					.filter(function(question) {
						return ($.inArray(question.aspect, group_permission) != -1);
					})
					.length;
			}, 300);

		});
}
