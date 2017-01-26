Meteor.publish('posts', () => {
	// publish all posts
	return Posts.find() 
})

Meteor.publish('comments', (postId) => {
	check(postId, String)
	// publish comment by thread
	return Comments.find({postId: postId}) 
})

Meteor.publish('notifications', () => {
	return Notifications.find({userId: this.userId, read: false})
})
