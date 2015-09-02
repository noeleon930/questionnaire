var prg = new Vue({
	el: '#progress',
	data: {
		total_num: 0,
		total_p: 0,
		aspect_p: 0
	},
	ready: function() {
		$.get('../../questions', function(db_questions) {
			prg.total_num = db_questions.length;
		});
	},
	methods: {
		total_pc: function() {
			this.total_p = Math.floor(u.questions.length / prg.total_num * 100);
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
		}
	}
});
