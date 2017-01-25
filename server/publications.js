Meteor.publish('posts', () => {
	// publish all posts
	return Posts.find() 
})