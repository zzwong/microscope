// Collection name is set to null b/c we only want this to be client-side - local collection
// This is where the errors will be stored and no need for persistence
// Advantage: reactive error display
Errors = new Mongo.Collection(null)

throwError = function(message) {
	Errors.insert({message: message})
}