// Controller
// Helper to populate data on the template
Template.postsList.helpers({	
	posts: () => { return Posts.find() }
})

