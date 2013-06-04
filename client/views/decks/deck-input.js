
Template.deckInput.rendered = function(e) {

	$("#title-field").autoResize({extraSpace:-4});
  $("#description-field").autoResize({extraSpace:-5});
	$("#deck-input-form").addClass("animated fadeInDown");  
};


Template.deckInput.events({

		'keydown #title-field, keydown #description-field' : function(e) {
			if(e.keyCode == 13) {
				e.preventDefault();
				if($("#title-field").val() !== "") submitDeck(e);			
			}
		},

    'click #submit-deck, tap #submit-deck' : function(e) {
    	if(ignoreClick(e)) return;
      submitDeck(e);
    },

    'click #cancel-deck, tap #cancel-deck' : function(e) {
    	if(ignoreClick(e)) return;
      Session.set("showDeckInput", false);
    },

    'submit #deck-input-form' : function(e) {
      submitDeck(e);
    },

});

Template.deckInput.helpers({

  currentPatent: function(e) {
    if(Session.get('currentPatent') === "") return true;
    return false;
  }

});


submitDeck = function(e) {

	e.preventDefault();

	if($("#title-field").val() !== "") {

		Decks.insert({
	  	createdAt: moment().format(),
	  	lastUpdated: moment().format(),
	    username: Meteor.user().username,
	    name: $("#title-field").val(),
	    description: $("#description-field").val(),
	    patents: [],
	    public: false
	  });

		if(Session.get('currentPatent') !== "") {

			var patent = Patents.findOne(Session.get('currentPatent'));
			var deck = Decks.findOne({name: $("#title-field").val()});
			Decks.update({ _id: deck._id }, { $push: { patents: patent.number } });
			Decks.update({ _id: deck._id }, { $set: { lastUpdated: moment().format() }});

		}

		Session.get('currentPatent', true);
    Session.set('resultStatus', false);
    Session.set('viewFullBiblio', false);
    Session.set('showDeckInput', false);
		Meteor.Router.to("decks", Meteor.user());

	}

};


