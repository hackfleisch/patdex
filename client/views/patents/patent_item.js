
Template.patentItem.events({

	'click #pdf-link, tap #pdf-link' : function(e) {
  	if(ignoreClick(e)) return;
    Session.set('pdf-to-view', this.PDF);
  },

  'click .expand-biblio, tap .expand-biblio' : function(e) {
    if(ignoreClick(e)) return;
    Session.set('viewFullBiblio', true);
  },

  'click #remove-patent, tap #remove-patent' : function(e) {
    if(ignoreClick(e)) return;
    var deck = Session.get('currentDeck');
    Decks.update({ _id: deck._id }, { $pull: { patents: this.number }});
  }
    
});

Template.patentItem.helpers({

  showFullBiblio: function() {
    return Session.get('viewFullBiblio');
  },

  resultCheck: function(e) {
    return Session.get('resultStatus');
  },

  loggedIn: function() {
    return Meteor.user();
  }

});