

Template.userProfile.rendered = function(e) {

};


Template.userProfile.events({
 

});

Template.userProfile.helpers({

	userLoggedIn : function(e) {
		return Meteor.user();
	},

	deckAmount: function(e) {
    var decks = Decks.find({username: Session.get('currentUser')}).fetch();
    return decks.length;
  },

  patentAmount: function(e) {
    var patents = 0;
    var decks = Decks.find({username: Session.get('currentUser')}).fetch();
    for(i=0; i<decks.length; i++) {
      patents += decks[i].patents.length;
    }
    return patents;
  },

  memberSince: function(e) {
    if(Session.get('currentUser') !== undefined) {
      var currentUser = Meteor.users.findOne({username: Session.get('currentUser')});
      var memberSince = moment(currentUser.createdAt).format();
      return moment(memberSince).fromNow();
    }
  },

  username: function(e) {
  	return Session.get('currentUser');
  }

});