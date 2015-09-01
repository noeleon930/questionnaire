var a = new Vue({
    el: '#aspects',
    data: {
        aspects: [],
        current_aspect_id: ''
    },
    compiled: function() {
        this.current_aspect_id = '';
        this.get_all(function() {
            a.select_aspect(a.aspects[0]);
            $('#' + a.aspects[0]._id).addClass('secondary');
        });
    },
    methods: {
        get_all: function(callback) {
            $.get('../../aspects', function(db_aspects) {
                var tmp = db_aspects.map(function(aspect, i, arr) {
                    aspect.id = aspect._id;
                    return aspect;
                });
                a.aspects = tmp;

                callback();
            });
        },
        put_all: function() {
            a.aspects.forEach(function(aspect, i, arr) {
                a.update_content(i);
            });
        },
        update_content: function(n) {
            $.ajax({
                    url: '../../aspects/' + a.aspects[n]._id,
                    method: 'PUT',
                    data: {
                        name: a.aspects[n].name,
                        comment: a.aspects[n].comment
                    }
                })
                .done(function(data) {
                    console.log('done_updating ' + data);
                });
        },
        add_new: function() {

            a.aspects.push({
                name: 'Aspects ' + (a.aspects.length + 1),
                comment: ''
            });

            $.ajax({
                    url: '../../aspects/',
                    method: 'POST',
                    data: {
                        name: a.aspects[a.aspects.length - 1].name,
                        comment: a.aspects[a.aspects.length - 1].comment
                    }
                })
                .done(function(data) {
                    a.update_all();
                    console.log('done_adding' + data);
                });
        },
        select_aspect: function(aspect) {
            a.current_aspect_id = aspect._id;
            ai.name = aspect.name;
            ai.comment = aspect.comment;
            q.get_all();
            setTimeout(function() {
                $('.zzz').removeClass('secondary');
                $('#' + aspect._id).addClass('secondary');
            }, 100);
        },
        update_all: function() {
            this.put_all();
            this.get_all(function() {});
        }
    }
});
