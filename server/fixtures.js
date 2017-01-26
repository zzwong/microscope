// Fixture data

if (Posts.find().count() === 0) {

	Posts.insert({
		title: 'Introducing Telescope',
		url:   'http://sachagreif.com/introducing-telescope/'
	})

	Posts.insert({
		title: 'Meteor',
		url:   'http://meteor.com'
	})

	Posts.insert({
		title: 'The Meteor Book', 
		url:   'http://themeteorbook.com'
	})
}

if (Comments.find().count() === 0) {
	let now = new Date().getTime()

	let tomId = Meteor.users.insert({
		profile: { name: 'Tome Coleman' }
	})
	let tom  = Meteor.users.findOne(tomId)
	let sachaId = Meteor.users.insert({
		profile: { name: 'Sacha Greif' }
	})
	let sacha = Meteor.users.findOne(sachaId)

	let telescopeId = Posts.insert({
		title: 'Introducing Telescope',
		userId: sacha._id,
		author: sacha.profile.name,
		url: 'http://sachagreif.com/introducing-telescope',
		submitted: new Date(now - 7 * 3600 * 1000),
		commentsCount: 2
	})

	Comments.insert({
		postId: telescopeId,
		userId: tom._id,
		author: tom.profile.name,
		submitted: new Date(now - 5 * 3600 * 1000),
		body: 'Interesting project Sacha, can I get involved?',
		commentsCount: 0
	})

	Comments.insert({
		postId: telescopeId,
		userId: sacha._id,
		author: sacha.profile.name,
		submitted: new Date(now - 3 * 3600 * 1000),
		body: 'You sure can Tom!',
		commentsCount: 0
	})


}