var a = new Vue({
    el: '#aspects',
    data: {
        aspects: [],
        current_aspect_id: ''
    },
    ready: function() {
        this.current_aspect_id = '';
        this.get_all();
    },
    methods: {
        get_all: function() {
            $.get('../../aspects', function(db_aspects) {
                var tmp = db_aspects.map(function(aspect, i, arr) {
                    aspect.id = aspect._id;
                    return aspect;
                });
                a.aspects = tmp;
                a.select_aspect(a.aspects[0]);
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
                        } else if (question.answer == 'No') {
                            $('#yes-' + question.question_id).prop("checked", false);
                            $('#no-' + question.question_id).prop("checked", true);
                        }
                    });
                });
            });
        }
    }
});
