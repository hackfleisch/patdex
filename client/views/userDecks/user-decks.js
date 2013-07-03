
Template.userDecks.rendered = function(e) {
	$(".deck-label-input").autoResize({extraSpace:-4});
  $(".deck-description-input").autoResize({extraSpace:-5});
};


Template.userDecks.events({

	'click #goto-search, tap #goto-search' : function(e) {
	  if(ignoreClick(e)) return;
		Meteor.Router.to("search");
	}

});

Template.userDecks.helpers({

	newDeckInputActive : function(e) {
		return Session.get("deckInputStatus");
	},

	decks : function(e) {
		return Decks.find({username: Session.get('currentUser')},{sort: {lastUpdated: -1}});
	},

	checkUserDecks : function(e) {
		if(Decks.findOne({username: Session.get('currentUser')})) return true;
    return false;
	},

	userLoggedIn : function(e) {
		return Meteor.user();
	}

});