// Controller
// Helper to populate data on the template
Template.postsList.helpers({	
	posts: function() { return Posts.find({}, {sort: {submitted: -1}}) }
})

