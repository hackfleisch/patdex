
Template.decksPage.rendered = function(e) {

  Session.set('currentPatent', "");
  Session.set('loadingStatus', false);
  Session.set('viewFullBiblio', false);
  Session.set('resultStatus', false);
  Session.set('currentPatents', "");
  Session.set('currentPatent', "");

};


Template.decksPage.events({

    'click #search-button, tap #search-button' : function(e) {
    	if(ignoreClick(e)) return;
    	Meteor.Router.to("search");
    }
    
});


Template.decksPage.helpers({

  decks: function() {
  	var currentUser = Meteor.user().username;
    return Decks.find({username: currentUser},{sort: {lastUpdated: -1}});
  },

  inputActive: function() {
  	return (Session.get("showDeckInput"));  
  },

  deckCheck: function() {
    var currentUser = Meteor.user().username;
    if(Decks.findOne({username: currentUser})) return true;
    return false;
  }

});