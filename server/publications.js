
Meteor.publish('users', function() {
  return Meteor.users.find();
});

Meteor.publish('decks', function() {
  return Decks.find();
});

Meteor.publish('patents', function() {
  return Patents.find();
});