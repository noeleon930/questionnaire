var group_permission = [];
var a = new Vue({
	el: '#aspects',
	data: {
		aspects: [],
		user_group: '',
		current_aspect_id: ''
	},
	ready: function() {
		$.get('../../users/' + global_user_id, function(user) {
			a.user_group = user.group || '';
			a.current_aspect_id = '';
			a.get_all();
		});
	},
	methods: {
		get_all: function() {
			$.get('../../aspects', function(db_aspects) {
				$.get('../../groups/' + a.user_group, function(db_group) {
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
					a.select_aspect(a.aspects[0]);
				});
			});
		},
		select_aspect: function(aspect) {
			a.current_aspect_id = aspect.id;
			q.get_all(function() {
				$.get('../../users/' + global_user_id, function(user) {
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
					}, 400);

					$('#questions').scrollTop(0);

					setTimeout(function() {
						$('.button').removeClass('secondary');
						$('#aspect-' + aspect.id).toggleClass('secondary');
					}, 100);
				});
			});
		}
	}
});
