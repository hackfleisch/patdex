
Template.deckItem.events({

    'click #delete-deck, tap #delete-deck' : function(e) {
      if(ignoreClick(e)) return;
      Decks.remove({_id: this._id}); 	
    },

    'click #deck-link, tap #deck-link' : function(e) {
      if(ignoreClick(e)) return;
      var deck = Decks.findOne(this._id);
      Session.set('currentDeck', deck);
      Meteor.Router.to("patents", Session.get('currentUser'), this._id);

    }
    
    
});


Template.deckItem.helpers({
  count: function() {
    var counter = this.patents.length;
    return counter;
  },

  lastUpdated : function() {
  	return moment(this.lastUpdated).fromNow();
  },

  currentPatent: function(e) {
    if(Session.get('currentPatent') === "") return true;
    return false;
  },

  loggedIn: function() {
    return Meteor.user();
  }

});