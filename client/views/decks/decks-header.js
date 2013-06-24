

Template.decksHeader.events({

    'click #profile, tap #profile' : function(e) {
    	if(ignoreClick(e)) return;
    	Meteor.Router.to("profile", Session.get('currentUser'));
    },

    'click #logout, tap #logout': function(e) {
      if(ignoreClick(e)) return;
      Meteor.logout();
      Meteor.Router.to("home");
    },

    'click #new-deck, tap #new-deck' : function(e) {
    	if(ignoreClick(e)) return;
    	var deckStatus = !Session.get("showDeckInput");
    	Session.set("showDeckInput", deckStatus);
    }
    
});


sessionCheckBuilder = function(sessionVar, trueString, falseString) {
	return function() {
  	var deckStatus = Session.get(sessionVar);
  	if(deckStatus) return trueString;
  	return falseString;
  }
};

Template.decksHeader.helpers({

	headerText: sessionCheckBuilder("showDeckInput", "New Deck", "My Decks"),
	headerAction: sessionCheckBuilder("showDeckInput", "Delete", "Plus"),
	headerClass: sessionCheckBuilder("showDeckInput", "s-active", ""),

  loggedIn: function() {
    return Meteor.user();
  },

  deckHeader: function() {
    var username = Session.get('currentUser');
    var shortName = username.substring(0, 14);
    if(shortName.length == 14) {
      return shortName += "...";
    }
    return shortName;
  }
  
});


