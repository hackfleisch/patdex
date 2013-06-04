Template.addPage.events({

  'click .deck-name, tap .deck-name' : function(e) {
  	if(ignoreClick(e)) return;

  	var patent = Patents.findOne(Session.get('currentPatent'));
		var deck = Decks.findOne({name: this.name});
		var patentInDeck = false;

		for(i=0; i<this.patents.length; i++) {
			if(patent.number === this.patents[i]) {
				patentInDeck = true;
			}
		}

		if(patentInDeck === false) {

			Decks.update({ _id: deck._id }, { $push: { patents: patent.number }});
			Decks.update({ _id: deck._id }, { $set: { lastUpdated: moment().format() }});
			Session.get('currentPatent', true);
	    Session.set('resultStatus', false);
	    Session.set('viewFullBiblio', false);
	    Session.set('showDeckInput', false);
			Meteor.Router.to("decks", Meteor.user());

		}

  }

});

Template.addPage.helpers({

  decks: function() {
  	var currentUser = Meteor.user().username;
    return Decks.find({username: currentUser},{sort: {createdAt: -1}});
  },

  deckCheck: function() {
    var currentUser = Meteor.user().username;
    if(Decks.findOne({username: currentUser})) return true;
    return false;
  }

});