// Use waitOn so that the subscriber finished grapping data from server
// and then display data

Router.configure({
	layoutTemplate:   'layout',
	loadingTemplate:  'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return Meteor.subscribe('posts') } 
})

// Main pg: list of posts
Router.route('/', {'name':'postsList'})

// Dynamic route for one post by _id
Router.route('/posts/:_id', {
	name: 'postPage',
	data: function() {
		return Posts.findOne(this.params._id)
	}
})


// Inserting new post route
Router.route('/submit', {name: 'postSubmit'})

var requireLogin = function() {
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate)
		} else {
			this.render('accessDenied')
		}
	} else {
		this.next()
	}
}

// For invalid requests to /posts/id  (not found)
Router.onBeforeAction('dataNotFound', {only: 'postPage'})

// require user to be logged in to access the postSubmit page
Router.onBeforeAction(requireLogin, {only: 'postSubmit'})