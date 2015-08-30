var ai = new Vue({
    el: '#aspect-info',
    data: {
        name: '',
        comment: ''
    },
    methods: {
        update_info: function() {

            var theIndex = 0;
            var tmp = a.aspects.map(function(aspect, i, arr) {
                if (aspect.id == a.current_aspect_id) {
                    aspect.name = ai.name;
                    aspect.comment = ai.comment;
                    theIndex = i;
                }
                return aspect;
            });

            a.aspects = tmp;
            a.update_content(theIndex);
        }
    }
});
