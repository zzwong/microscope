// Use jQuery to find and parse values from the form field to populate post object from the results

Template.postSubmit.events({
	'submit form': function(e) {
		// Ensures that browser doesn't try to submit the form
		e.preventDefault()
	
		let post = {
			url:   $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		}

		let errors = validatePost(post)
		if (errors.title || errors.url)
			return Session.set('postSubmitErrors', errors)

		// Handle insert with a Meteor Method
		// Meteor.call calls a Method name by first arg, with a callback attached which is executed server-side
		// Meteor Method callbacks always have two args: error and result
		Meteor.call('postInsert', post, function(error, result) {
			// display error to user and abort
			if (error) 
				return alert(error.reason)

			if (result.postExists)
				throwError('This link has already been posted')

			Router.go('postPage', {_id: result._id})
			
		})

		// post._id = Posts.insert(post)
		// Go to newly inserted post page
		// Router.go('postPage', post)
	}
})


Template.postSubmit.onCreated(function() {
	// place error messages in this following object that will be stored in Session
	Session.set('postSubmitErrors', {})
})


Template.postSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('postSubmitErrors')[field]
	},
	errorClass: function(field) {
		return !!Session.get('postSubmitErrors')[field] ? 'has-error' : ''
	}
})