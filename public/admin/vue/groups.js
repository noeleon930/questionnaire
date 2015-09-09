var g = new Vue({
	el: '#groupss',
	data: {
		groups: [],
		aspects: []
	},
	computed: {
		aspects: function() {
			return a.aspects;
		}
	},
	compiled: function() {
		this.get_all(function() {
			if (g.groups.length == 0) {
				g.add_new();
			}
		});
	},
	// attached: function() {
	// 	this.groups.forEach(function(group) {
	// 		this.render_checked(group);
	// 	});
	// },
	methods: {
		get_all: function(callback) {
			$.get('../../groups', function(groups) {
				var tmp = groups.map(function(group, i, arr) {
					group.id = group._id;
					group.aspects = group.aspects.map(function(aspect, i, arr) {
						aspect.checked = (aspect.checked == 'true' ? true : false);
						return aspect;
					});
					return group;
				});
				g.groups = tmp;
				callback();
			});
		},
		add_new: function() {
			g.groups.push({
				name: '',
				aspects: a.aspects.map(function(aspect, i, arr) {
					return {
						id: aspect._id,
						checked: false
					};
				})
			});

			$.ajax({
					url: '../../groups/',
					method: 'POST',
					data: {
						name: g.groups[g.groups.length - 1].name,
						aspects: g.groups[g.groups.length - 1].aspects
					}
				})
				.done(function(data) {
					g.update_all();
					console.log('done_adding' + data);
				});
		},
		delete: function(group) {
			if (confirm('確認刪除 -> 「' + group.name + '」 嗎?')) {
				$.ajax({
						url: '../../groups/' + group._id,
						method: 'DELETE'
					})
					.done(function(data) {
						g.update_all();
						console.log('done_deleting' + data);
						// if (g.groups.length == 0) {
						// 	g.add_new();
						// }

					});
			}
		},
		put_all: function() {
			g.groups.forEach(function(group, i, arr) {
				g.update_content(i);
			});
		},
		update_content: function(n) {
			$.ajax({
					url: '../../groups/' + g.groups[n]._id,
					method: 'PUT',
					data: {
						name: g.groups[n].name,
						aspects: g.groups[n].aspects
					}
				})
				.done(function(data) {
					console.log('done_updating ' + data);
				});
		},
		update_content2: function(group) {
			$.ajax({
					url: '../../groups/' + group._id,
					method: 'PUT',
					data: {
						name: group.name,
						aspects: group.aspects
					}
				})
				.done(function(data) {
					console.log('done_updating ' + data);
					// g.render_checked(group);
				});
		},
		handle_check: function(group, n) {

			// group.aspects[n].checked = $('#' + group.id + '-' + group.aspects[n].id).prop('checked');
			group.aspects[n].checked = !group.aspects[n].checked;
			this.update_content2(group);

		},
		mouseOver: function(group, aspect) {
			$('#' + group._id + '-' + aspect + '-td').addClass('group-aspect-td');
			// console.log('#' + group._id + '-' + aspect + '-td');
		},
		mouseOut: function(group, aspect) {
			$('#' + group._id + '-' + aspect + '-td').removeClass('group-aspect-td');
			// console.log('#' + group._id + '-' + aspect + '-td');
		},
		// render_checked: function(group) {
		// 	group.aspects.forEach(function(aspect, i, arr) {
		// 		$('#' + group.id + '-' + aspect.id).prop('checked', aspect.checked);
		// 	});
		// },
		update_all: function() {
			this.put_all();
			this.get_all(function() {});
		}
	}
});
