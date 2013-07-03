

Template.userProfile.rendered = function(e) {

};


Template.userProfile.events({
 

});

Template.userProfile.helpers({

	userLoggedIn : function(e) {
    if(Session.get('requestedUser') === Session.get('currentUser')) {
      return true;
    }
		return false;
	},

	deckAmount: function(e) {
    var decks = Decks.find({username: Session.get('requestedUser')}).fetch();
    return decks.length;
  },

  patentAmount: function(e) {
    var patents = 0;
    var decks = Decks.find({username: Session.get('requestedUser')}).fetch();
    for(i=0; i<decks.length; i++) {
      patents += decks[i].patents.length;
    }
    return patents;
  },

  memberSince: function(e) {
    if(Session.get('requestedUser') !== undefined) {
      var requestedUser = Meteor.users.findOne({username: Session.get('requestedUser')});
      if(requestedUser !== undefined) {
        var memberSince = moment(requestedUser.createdAt).format();
        return moment(memberSince).fromNow();
      }
    }
  },

  username: function(e) {
  	return Session.get('requestedUser');
  }

});