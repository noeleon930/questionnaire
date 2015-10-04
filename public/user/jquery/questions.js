var q = {
	questions: [],
	get_all: function(callback) {
		$.ajax({
				url: '../../questions/aspect/' + a.current_aspect_id,
				cache: false
			})
			.done(function(db_questions) {

				var tmp = db_questions.map(function(question, i, arr) {
					question.id = question._id;
					question.answer = '';
					question.number = i + 1;
					return question;
				});

				q.questions = tmp;

				// console.log(tmp);

				draw_questions();

				callback();
			});
	},
	pickYes: function(id) {

		// console.log('click yes!');

		$.ajax({
				url: '../../users/' + global_user_id + '/answer',
				method: 'PUT',
				cache: false,
				data: {
					answer: 'Yes',
					question_id: id,
					aspect_id: a.current_aspect_id
				}
			})
			.done(function(data) {
				// console.log('done_adding' + data);
				$('#yes-' + id).prop("checked", true);
				$('#no-' + id).prop("checked", false);

				u.load(function() {

					prg.total_pc();
					prg.aspect_pc();

					$('#question-' + id + ' > div > div.panel').addClass('answered');
				});
			});
	},
	pickNo: function(id) {

		// console.log('click no!');

		$.ajax({
				url: '../../users/' + global_user_id + '/answer',
				method: 'PUT',
				cache: false,
				data: {
					answer: 'No',
					question_id: id,
					aspect_id: a.current_aspect_id
				}
			})
			.done(function(data) {
				// console.log('done_adding' + data);
				$('#yes-' + id).prop("checked", false);
				$('#no-' + id).prop("checked", true);

				u.load(function() {

					prg.total_pc();
					prg.aspect_pc();

					$('#question-' + id + ' > div > div.panel').addClass('answered');
				});
			});
	}
};

function get_start_questions() {
	q.get_all(function() {});
}

function draw_questions() {
	$('#_questions').empty();
	q.questions.forEach(function(qq) {
		$('#_questions').append('<div id="question-' + qq.id + '" class="row collapse" style="padding-top:14px">\
                            <div class="small-10 columns">\
                                <div class="panel" style="margin:0px; padding: 15px">\
                                    <h5>' + qq.number + '.&nbsp;&nbsp;' + qq.content + '</h5>\
                                </div>\
                            </div>\
                            <div class="small-2 columns" style="top: 10px; left: 17px;">\
                                <div class="row">\
                                    <div id="yes-' + qq.id + '-div" class="small-6 columns" style="padding: 0px;">\
                                        <div style="cursor: pointer;">\
                                            <input id="yes-' + qq.id + '" style="margin-bottom: 0px;" type="radio" value="Yes">\
                                            <label style="font-size: larger">是</label>\
                                        </div>\
                                    </div>\
                                    <div id="no-' + qq.id + '-div" class="small-6 columns" style="padding: 0px;">\
                                        <div style="cursor: pointer;">\
                                            <input id="no-' + qq.id + '" style="margin-bottom: 0px;" type="radio" value="No">\
                                            <label style="font-size: larger">否</label>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>');
		$('#yes-' + qq.id + '-div').on('click', function() {
			q.pickYes(qq.id);
		});
		$('#no-' + qq.id + '-div').on('click', function() {
			q.pickNo(qq.id);
		});
	})
}
