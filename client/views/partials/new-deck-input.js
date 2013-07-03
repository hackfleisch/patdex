
Template.newDeckInput.rendered = function(e) {

};


Template.newDeckInput.events({

  'click .cancel-deck, tap .cancel-deck' : function(e) {
  	if(ignoreClick(e)) return;
    Session.set("deckInputStatus", false);
  },

	'keydown .deck-label-input, keydown .deck-description-input' : function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			if($(".deck-label-input").val() !== "") createNewDeck(e);			
		}
	},

  'click .submit-deck, tap .submit-deck' : function(e) {
  	if(ignoreClick(e)) return;
    createNewDeck(e);
  },

  'submit #create-new-deck' : function(e) {
    createNewDeck(e);
  }

});

Template.newDeckInput.helpers({

	addPatent: function(e) {
    return Session.get('addPatent');
  }

});

createNewDeck = function(e) {

	e.preventDefault();

	if($(".deck-label-input").val() !== "") {

		if(!Decks.findOne({username: Meteor.user().username, name: $(".deck-label-input").val()})) {

			Decks.insert({
		  	createdAt: moment().format(),
		  	lastUpdated: moment().format(),
		    username: Meteor.user().username,
		    name: $(".deck-label-input").val(),
		    description: $(".deck-description-input").val(),
		    patents: []
		  });

			if(Session.get('currentPatent') !== undefined) {

				var patent = Patents.findOne(Session.get('currentPatent'));
				var deck = Decks.findOne({name: $(".deck-label-input").val()});
				Decks.update({ _id: deck._id }, { $push: { patents: patent.number } });
				Decks.update({ _id: deck._id }, { $set: { lastUpdated: moment().format() }});
				Session.set('deckInputStatus', false);
				Session.set('addPatent', false);
  			Session.set('currentPatent', undefined);
				Meteor.Router.to("deck", Session.get('requestedUser'), deck._id);

			} else {

				Session.set('deckInputStatus', false);

			}

	 	} else {

	 		alert('This deck already exists!');

	 	}

	}

};