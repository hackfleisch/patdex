


Template.deckPatentsHeader.rendered = function(e) {

};


Template.deckPatentsHeader.events({

  'click #goto-decks, tap #goto-decks' : function(e) {
  	if(ignoreClick(e)) return;
  	Meteor.Router.to("decks", Session.get('currentUser'));
  }

});

Template.deckPatentsHeader.helpers({

	deckName : function(e) {
	  if(Session.get('currentDeck') !== undefined) {
  	var deckName = Session.get('currentDeck').name;
  	var shortName = deckName.substring(0, 14);
  	if(shortName.length == 14) {
  		return shortName += "...";
  	}
  	return shortName;
	  }
	}

});