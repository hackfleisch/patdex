

Template.decksHeader.events({

    'click #logout, tap #logout' : function(e) {
    	if(ignoreClick(e)) return;
    	Meteor.logout();
    	Meteor.Router.to("/");
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
	headerClass: sessionCheckBuilder("showDeckInput", "s-active", "")

});


