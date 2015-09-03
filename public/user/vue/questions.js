var q = new Vue({
    el: '#questions',
    data: {
        questions: []
    },
    ready: function() {
        this.get_all(function() {});
    },
    methods: {
        get_all: function(callback) {
            $.get('../../questions/aspect/' + a.current_aspect_id, function(db_questions) {

                var tmp = db_questions.map(function(question, i, arr) {
                    question.id = question._id;
                    question.answer = '';
                    question.number = i + 1;
                    return question;
                });

                q.questions = tmp;

                // console.log(tmp);

                callback();
            });
        },
        pickYes: function(id) {
            $.ajax({
                    url: '../../users/' + global_user_id + '/answer',
                    method: 'PUT',
                    data: {
                        answer: 'Yes',
                        question_id: id,
                        aspect_id: a.current_aspect_id
                    }
                })
                .done(function(data) {
                    console.log('done_adding' + data);
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
            $.ajax({
                    url: '../../users/' + global_user_id + '/answer',
                    method: 'PUT',
                    data: {
                        answer: 'No',
                        question_id: id,
                        aspect_id: a.current_aspect_id
                    }
                })
                .done(function(data) {
                    console.log('done_adding' + data);
                    $('#yes-' + id).prop("checked", false);
                    $('#no-' + id).prop("checked", true);

                    u.load(function() {
                        prg.total_pc();
                        prg.aspect_pc();
                        $('#question-' + id + ' > div > div.panel').addClass('answered');
                    });
                });
        },
    }
});
