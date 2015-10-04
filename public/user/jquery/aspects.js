var group_permission = [];

var a = {
	aspects: [],
	user_group: '',
	current_aspect_id: '',
	get_all: function() {
		$.ajax({
				url: '../../aspects',
				cache: false
			})
			.done(function(db_aspects) {
				$.ajax({
						url: '../../groups/' + a.user_group,
						cache: false
					})
					.done(function(db_group) {
						group_permission = db_group
							.aspects
							.filter(function(_aspect) {
								return _aspect.checked == 'true';
							})
							.map(function(_aspect, i, arr) {
								return _aspect.id;
							});

						var tmp = db_aspects
							.map(function(aspect, i, arr) {
								aspect.id = aspect._id;
								return aspect;
							})
							.filter(function(aspect) {
								return ($.inArray(aspect.id, group_permission) != -1);
							});

						a.aspects = tmp;
						draw_aspects();
						a.select_aspect(a.aspects[0].id);
					});
			});
	},
	select_aspect: function(aspect_id) {
		a.current_aspect_id = aspect_id;
		q.get_all(function() {
			$.ajax({
					url: '../../users/' + global_user_id,
					cache: false
				})
				.done(function(user) {
					user.questions.forEach(function(question, i, arr) {
						if (question.answer == 'Yes') {
							$('#yes-' + question.question_id).prop("checked", true);
							$('#no-' + question.question_id).prop("checked", false);
							$('#question-' + question.question_id + ' > div > div.panel').addClass('answered');
						} else if (question.answer == 'No') {
							$('#yes-' + question.question_id).prop("checked", false);
							$('#no-' + question.question_id).prop("checked", true);
							$('#question-' + question.question_id + ' > div > div.panel').addClass('answered');
						}
					});

					setTimeout(function() {
						prg.total_pc();
						prg.aspect_pc();
					}, 350);

					$('#questions').scrollTop(0);

					setTimeout(function() {
						$('.button').removeClass('secondary');
						$('#aspect-' + aspect_id).toggleClass('secondary');
					}, 100);
				});
		});
	}
}

function get_start_aspects() {
	$.ajax({
			url: '../../users/' + global_user_id,
			cache: false
		})
		.done(function(user) {
			a.user_group = user.group || '';
			a.current_aspect_id = '';
			a.get_all();
		});
}

function draw_aspects() {
	a.aspects.forEach(function(aa) {
		$('#aspects').append('<li style="margin:0px">\
                        <a id="aspect-' + aa.id + '" class="button expand" style="height:60px;margin-top:0px; margin-bottom:14px;">' + aa.name + '</a>\
                    </li>')
		$('#aspect-' + aa.id).on('click', function() {
			a.select_aspect(aa.id);
		});
	})
}
