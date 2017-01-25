// No var because we want this Posts collection to be globally scoped
Posts = new Mongo.Collection('posts')

// Since we are no longer using insecure, we can now authorize post insertion only with logged in user
Posts.allow({
	insert: function(userId, doc) {
		// only allow posting if loggedin, aka client has userId
		return !! userId
	}
})