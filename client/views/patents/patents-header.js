

Template.patentsHeader.events({

  'click #return-decks, tap #return-decks' : function(e) {
  	if(ignoreClick(e)) return;
    Session.set('viewFullBiblio', false);
  	Meteor.Router.to("decks", Meteor.user());
  }

});

Template.patentsHeader.helpers({

  loggedIn: function() {
    return Meteor.user();
  },

  currentDeckName: function() {
  	var deckName = Session.get('currentDeck').name;
  	var shortName = deckName.substring(0, 14);
  	if(shortName.length == 14) {
  		return shortName += "...";
  	}
  	return shortName;
  }

});

