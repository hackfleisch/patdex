
Template.deckItem.events({

    'click #delete-deck, tap #delete-deck' : function(e) {
      if(ignoreClick(e)) return;
      Decks.remove({_id: this._id}); 	
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
  }

});