Template.errors.helpers({
	errors: function() {
		return Errors.find()
	}
})

// cb triggered once template is rendered in browser
// this refers to the current template instance
// this.data === current error 
Template.error.onRendered(function() {
	let error = this.data
	Meteor.setTimeout(function() {
		Errors.remove(error._id)
	}, 3000)
})