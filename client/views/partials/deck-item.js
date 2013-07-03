

Template.deckItem.rendered = function(e) {

};


Template.deckItem.events({

  'click .deck-delete, tap .deck-delete' : function(e) {
    if(ignoreClick(e)) return;
    // $(e.target.parentElement.parentElement).toggleClass("error");
    Decks.remove({_id: this._id});	
  },

  'click #goto-deck, tap #goto-deck' : function(e) {
    if(ignoreClick(e)) return;
    var deck = Decks.findOne(this._id);
    Session.set('currentDeck', deck);
    Meteor.Router.to("deck", Session.get('requestedUser'), this._id);
  },

  'click #addto-deck, tap #addto-deck' : function(e) {
    if(ignoreClick(e)) return;

    var patent = Patents.findOne(Session.get('currentPatent'));
    var deck = Decks.findOne(this._id);
    var patentInDeck = false;

    for(i=0; i<this.patents.length; i++) {
      if(patent.number === this.patents[i]) {
        patentInDeck = true;
      }
    }

    if(patentInDeck === false) { 
      Decks.update({ _id: deck._id }, { $push: { patents: patent.number } });
      Decks.update({ _id: deck._id }, { $set: { lastUpdated: moment().format() }});

      Session.set('deckInputStatus', false);
      Session.set('addPatent', false);
      Session.set('currentPatent', undefined);

      Session.set('currentDeck', deck);
      Meteor.Router.to("deck", Session.get('requestedUser'), this._id);
    } else {
      alert("The chosen deck already contains this patent!");
    }

  }

});

Template.deckItem.helpers({

	patentCount : function(e) {
		return this.patents.length;
	},

	lastUpdatedFromNow : function(e) {
		return moment(this.lastUpdated).fromNow();
	},

  userLoggedIn : function(e) {
    if(Session.get('requestedUser') === Session.get('currentUser')) {
      return true;
    }
    return false;
  },

  addPatent: function(e) {
    return Session.get('addPatent');
  }

});