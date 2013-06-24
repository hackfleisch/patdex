
Meteor.publish('users', function() {
  return Meteor.users.find();
});

Meteor.publish('decks', function() {
	// removed for now so that public URLs work 
		// if a user is found then return only their decks to the client
		// if(this.userId !== null) {
			// decks are identified by username rather than userId
			// var user = Meteor.users.findOne(this.userId);
			// return Decks.find({username: user.username});
		// }
	return Decks.find();
});

Meteor.publish('patents', function() {
  return Patents.find();
});