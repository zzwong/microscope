// No var because we want this Posts collection to be globally scoped
Posts = new Mongo.Collection('posts')

// Since we are no longer using insecure, we can now authorize post insertion only with logged in user
Posts.allow({
	insert: function(userId, doc) {
		// only allow posting if loggedin, aka client has userId 
		return !! userId
	},
	update: function(userId, post) { return ownsDocument(userId, post) },
	remove: function(userId, post) { return ownsDocument(userId, post) }
})

Posts.deny({
	update: function(userId, post, fieldNames) {
		// may only edit the following two fields:
		return (_.without(fieldNames, 'url', 'title').length > 0)
	}
})

Posts.deny({
	update: function(userId, post, fieldNames, modifier) {
		let errors = validatePost(modifier.$set)
		return errors.title || errors.url		
	}
})

validatePost = function (post) {
	let errors = {}

	if (!post.title) 
		errors.title = "Please fill in a headline"

	if (!post.url)
		errors.url = "Please fill in a URL"

	return errors
}

Meteor.methods({
	postInsert: function(postAttributes) {
		// check they are strings
		check(Meteor.userId(), String)
		check(postAttributes, {
			title: String,
			url:   String
		})

		// to compensate for latency we use a stub 
		// stub: a Method simulation that Meteor runs on the client in parallel, while real Method runs on server
		// if (Meteor.isServer) {
		// 	postAttributes.title += "(server)"
		// 	// sleep 5s
		// 	Meteor._sleepForMs(5000)
		// } else {
		// 	postAttributes.title += "(client)"
		// }
		let errors = validatePost(postAttributes)
		if (errors.title || errors.url)
			throw new Meteor.Error('invalid-post', "You must set a title and URL for your post")

		// check if existing post
		let postWithSameLink = Posts.findOne({url: postAttributes.url})
		if (postWithSameLink) {
			return {
				postExists: true,
				_id: postWithSameLink._id
			}
		}

		let user = Meteor.user()
		let post = _.extend(postAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date(),
			commentsCount: 0
		})

		let postId = Posts.insert(post)

		return {
			_id: postId
		}
	}
})