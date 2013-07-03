
Template.userDecksHeader.rendered = function(e) {

};


Template.userDecksHeader.events({

	'click #new-deck, tap #new-deck' : function(e) {
		if(ignoreClick(e)) return;
  	var deckInputStatus = !Session.get("deckInputStatus");
  	Session.set("deckInputStatus", deckInputStatus);
	},
 
 	'click #goto-profile, tap #goto-profile' : function(e) {
 		if(ignoreClick(e)) return;
 		Meteor.Router.to("profile", Session.get('currentUser'));
	},

 	'click #logout, tap #logout' : function(e) {
 		if(ignoreClick(e)) return;
 		Meteor.logout();
    Meteor.Router.to("home");
	}	

});

Template.userDecksHeader.helpers({

	headerAction : function(e) {
  	var deckInputStatus = Session.get("deckInputStatus");
  	if(deckInputStatus) return "Delete";
  	return "Plus";
	},

	headerText : function(e) {
  	var deckInputStatus = Session.get("deckInputStatus");
  	if(deckInputStatus) return "New Deck";
  	return Session.get('currentUser');
	},

	userLoggedIn : function(e) {
		return Meteor.user();
	}

});