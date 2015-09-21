var prg = new Vue({
	el: '#progress',
	data: {
		total_num: 0,
		total_user_selected: 0,
		total_p: 0,
		aspect_p: 0,
		aspect_selected_num: 0,
		aspect_total_num: 0
	},
	compiled: function() {
		$.get('../../questions', function(db_questions) {

			setTimeout(function() {
				prg.total_num = db_questions
					.filter(function(question) {
						return ($.inArray(question.aspect, group_permission) != -1);
					})
					.length;
			}, 300);

		});
	},
	methods: {
		total_pc: function() {
			this.total_p = Math.floor(u.questions.length / prg.total_num * 100) > 100 ? 0 : Math.floor(u.questions.length / prg.total_num * 100);

			this.total_user_selected = u.questions.length;

			if (this.total_p + 1 != this.total_p + 1) {
				this.total_p = 0;
			}

			setTimeout(function() {
				$('#jquery-total').text('總進度 : ' + this.total_user_selected + ' / ' + prg.total_num);

				$('#jquery-total-p').text(this.total_p + '%');
				$('#jquery-total-p').css('width', this.total_p + '%');
			}, 50);

			$.ajax({
					url: '../../users/' + global_user_id + '/total_p',
					method: 'PUT',
					data: {
						total_p: this.total_p
					}
				})
				.done(function(data) {
					console.log('done_updating total_p' + data);
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

			this.aspect_p = Math.floor(tmp / q.questions.length * 100) || 0;

			this.aspect_selected_num = tmp;
			this.aspect_total_num = q.questions.length;

			setTimeout(function() {
				$('#jquery-aspect').text('構面進度 : ' + this.aspect_selected_num + ' / ' + this.aspect_total_num);

				$('#jquery-aspect-p').text(this.aspect_p + '%');
				$('#jquery-aspect-p').css('width', this.aspect_p + '%');
			}, 50);

			if (this.aspect_p == 100 || this.aspect_p == 100.0 || this.aspect_p == '100' || this.aspect_p == '100.0') {
				$.ajax({
						url: '../../users/' + global_user_id + '/completed_aspects',
						method: 'PUT',
						data: {
							aspects_json_string: JSON.stringify((u.aspects_json != undefined || u.aspects_json.length > 0) ? (function() {
								var aaa = u.aspects_json;
								aaa.push(a.current_aspect_id);
								return aaa;
							})() : [a.current_aspect_id])
						}
					})
					.done(function(data) {
						console.log('done_updating completed_aspects' + data);
						$('#aspect-' + a.current_aspect_id).addClass('success');
					});
			}
		}
	}
});
