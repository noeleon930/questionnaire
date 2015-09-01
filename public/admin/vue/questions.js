var q = new Vue({
	el: '#questions',
	data: {
		questions: []
	},
	// ready: function() {
	//     this.get_all();
	// },
	methods: {
		get_all: function() {
			$.get('../../questions/aspect/' + a.current_aspect_id, function(db_questions) {

				// add id from _id foreach
				var tmp = db_questions.map(function(question, i, arr) {
					question.id = question._id;
					question.number = i + 1;
					return question;
				});

				// if there is no question in DB
				if (tmp.length == 0 && a.current_aspect_id != '') {
					tmp = [{
						content: '',
						aspect: a.current_aspect_id,
						number: 1
					}];
					$.ajax({
							url: '../../questions/',
							method: 'POST',
							data: {
								aspect: tmp[0].aspect,
								number: tmp[0].number,
								content: tmp[0].content
							}
						})
						.done(function(data) {
							console.log('get_first_one ' + data);
							// location.reload();
							q.update_all();
						});
				}

				q.questions = tmp;
			});
		},
		put_all: function() {

			// call update_content foreach
			q.questions.forEach(function(question, i, arr) {
				q.update_content(i);
			});
		},
		add_below: function(n) {

			// if we click the add_below at last item
			if (n + 1 == q.questions.length) {
				q.questions.push({
					content: '',
					aspect: a.current_aspect_id,
				});
			} else {
				q.questions.splice(n + 1, 0, {
					content: '',
					aspect: a.current_aspect_id,
				});
			}

			var tmp = q.questions.map(function(question, i, arr) {
				question.number = i + 1;
				return question;
			});

			q.question = tmp;

			// n + 1 is new-added's index
			// n + 2 is new-added's number

			$.ajax({
					url: '../../questions/',
					method: 'POST',
					data: {
						aspect: q.questions[n + 1].aspect,
						number: q.questions[n + 1].number,
						content: q.questions[n + 1].content
					}
				})
				.done(function(data) {
					q.update_all();
					console.log('done_adding' + data);
				});
		},
		update_content: function(n) {
			$.ajax({
					url: '../../questions/' + q.questions[n]._id,
					method: 'PUT',
					data: {
						aspect: q.questions[n].aspect,
						number: q.questions[n].number,
						content: q.questions[n].content
					}
				})
				.done(function(data) {
					console.log('done_updating ' + data);
				});
		},
		delete: function(n) {
			$.ajax({
					url: '../../questions/' + q.questions[n]._id,
					method: 'DELETE'
				})
				.done(function(data) {
					q.update_all();
					console.log('done_deleting' + data);
				});
		},
		update_all: function() {
			// var tmp = q.questions.map(function(question, i, arr) {
			//     question.number = i + 1;
			//     return question;
			// });
			// q.questions = tmp;
			// console.log(q.questions);
			this.put_all();
			this.get_all();
		}
	}
});
