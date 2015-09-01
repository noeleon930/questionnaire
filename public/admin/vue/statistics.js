var statistics = new Vue({
	el: '#statisticss',
	data: {
		current_aspect_id: '',
		aspects: [],
		questions: [],
		sortRule: {
			'number': false,
			'yes_p': false,
			'no_p': false,
			'total': false,
			'void': false,
			'void_p': false,
		}
	},
	compiled: function() {
		this.get_all_aspects();
	},
	methods: {
		get_all_aspects: function() {
			$.get('../../aspects', function(db_aspects) {
				var tmp = db_aspects.map(function(aspect, i, arr) {
					aspect.id = aspect._id;
					return aspect;
				});
				statistics.aspects = tmp;

				statistics.select_aspect(statistics.aspects[0]);
			});
		},
		select_aspect: function(aspect) {

			statistics.current_aspect_id = aspect.id;

			setTimeout(function() {
				$('.zzzx').removeClass('secondary');
				$('#statistics-apects-' + aspect._id).addClass('secondary');
			}, 100);

			$.get('../../questions/aspect/' + statistics.current_aspect_id, function(db_questions) {

				$.get('../../users', function(db_users) {

					var tmp = db_questions
						.map(function(question, i, arr) {
							question.id = question._id;
							question.number = i + 1;
							return question;
						})
						.map(function(question, i, arr) {

							var ttmp = {
								id: question.id,
								number: question.number,
								yes: 0,
								no: 0,
								unknown: 0
							};

							db_users.forEach(function(user, i, arr) {
								user.questions.forEach(function(answer, i, arr) {

									if (answer.question_id == question._id) {
										if (answer.answer == 'Yes') {
											ttmp.yes = ttmp.yes + 1;
										} else if (answer.answer == 'No') {
											ttmp.no = ttmp.no + 1;
										}
										// else {
										// 	ttmp.unknown = ttmp.unknown + 1;
										// }
									}
								});
							});

							ttmp.unknown = u.users.length - ttmp.yes - ttmp.no;

							if (ttmp.unknown < 0) ttmp.unknown = 0;

							if (ttmp.yes + ttmp.no + ttmp.unknown <= 0) {
								ttmp.yes_p = 0;
								ttmp.no_p = 0;
								ttmp.unknown_p = 0;
							} else {
								ttmp.yes_p = ttmp.yes / (ttmp.yes + ttmp.no + ttmp.unknown) * 100;
								ttmp.no_p = ttmp.no / (ttmp.yes + ttmp.no + ttmp.unknown) * 100;
								ttmp.unknown_p = ttmp.unknown / (ttmp.yes + ttmp.no + ttmp.unknown) * 100;
							}

							return ttmp;
						});

					statistics.questions = tmp;

				});
			});
		},
		sortBy: function(target) {
			switch (target) {
				case 'number':
					this.questions.sort(function(aa, bb) {
						if (statistics.sortRule[target]) {
							return aa.number - bb.number;
						} else {
							return bb.number - aa.number;
						}
					});
					break;
				case 'yes_p':
					this.questions.sort(function(aa, bb) {
						if (statistics.sortRule[target]) {
							return aa.yes_p - bb.yes_p;
						} else {
							return bb.yes_p - aa.yes_p;
						}
					});
					break;
				case 'no_p':
					this.questions.sort(function(aa, bb) {
						if (statistics.sortRule[target]) {
							return aa.no_p - bb.no_p;
						} else {
							return bb.no_p - aa.no_p;
						}
					});
					break;
				case 'total':
					this.questions.sort(function(aa, bb) {
						if (statistics.sortRule[target]) {
							return (aa.yes + aa.no + aa.unknown) - (bb.yes + bb.no + bb.unknown);
						} else {
							return (bb.yes + bb.no + bb.unknown) - (aa.yes + aa.no + aa.unknown);
						}
					});
					break;
				case 'void':
					this.questions.sort(function(aa, bb) {
						if (statistics.sortRule[target]) {
							return aa.unknown - bb.unknown;
						} else {
							return bb.unknown - aa.unknown;
						}
					});
					break;
				case 'void_p':
					this.questions.sort(function(aa, bb) {
						if (statistics.sortRule[target]) {
							return aa.unknown_p - bb.unknown_p;
						} else {
							return bb.unknown_p - aa.unknown_p;
						}
					});
					break;
			}
			statistics.sortRule[target] = !statistics.sortRule[target];
		},
		mouseOver: function(question) {
			$('#quesiton-row-' + question.id).addClass('overedTableRow');
		},
		mouseOut: function(question) {
			$('#quesiton-row-' + question.id).removeClass('overedTableRow');
		}
	}
});
