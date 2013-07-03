

Template.userProfileHeader.rendered = function(e) {

};


Template.userProfileHeader.events({
 
 	'click #goto-decks, tap #goto-decks' : function(e) {
 		if(ignoreClick(e)) return;
    Session.set('deckInputStatus', false);
 		Meteor.Router.to("decks", Session.get('currentUser'));
	},

 	'click #logout, tap #logout' : function(e) {
 		if(ignoreClick(e)) return;
 		Meteor.logout();
    Meteor.Router.to("home");
	}	

});

Template.userProfileHeader.helpers({

	userLoggedIn : function(e) {
		return Meteor.user();
	},

	displayUsername: function(e) {
		return Session.get('currentUser');
	}

});