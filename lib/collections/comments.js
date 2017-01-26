Comments = new Mongo.Collection('comments')

Meteor.methods({
	commentInsert: function(commentAttributes) {
		check(this.userId, String)
		check(commentAttributes, {
			postId: String,
			body:   String
		})

		let user = Meteor.user()
		let post = Posts.findOne(commentAttributes.postId)

		if (!post)
			throw new Meteor.Error('invalid-comment', 'You must comment on a post')

		comment  = _.extend(commentAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		})

		// increment post's comment count
		Posts.update(comment.postId, {$inc: {commentsCount: 1}})

		// create comment, save id
		comment._id = Comments.insert(comment)
		// create notification to inform user that there has been a comment
		createCommentNotification(comment)

		return comment._id
	}
})