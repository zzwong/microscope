// Use jQuery to find and parse values from the form field to populate post object from the results

Template.postSubmit.events({
	'submit form': function(e) {
		// Ensures that browser doesn't try to submit the form
		e.preventDefault()
	
		var post = {
			url:   $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		}

		post._id = Posts.insert(post)
		// Go to newly inserted post page
		Router.go('postPage', post)
	}
})