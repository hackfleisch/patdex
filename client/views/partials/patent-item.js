
Template.patentItem.rendered = function(e) {

};


Template.patentItem.events({

  'click #delete-patent, tap #delete-patent' : function(e) {
    if(ignoreClick(e)) return;
    var deck = Session.get('currentDeck');
    Decks.update({ _id: deck._id }, { $pull: { patents: this.number }});
  },

  'click #view-PDF, tap #view-PDF' : function(e) {
    if(ignoreClick(e)) return;
    Session.set('pdf-to-view', this.PDF);
  }

});

Template.patentItem.helpers({

	pdfLink : function(e) {
		return this.PDF;
	},

	searchResults: function(e) {
		return Session.get('resultStatus');
	},

  userLoggedIn : function(e) {
    if(Session.get('requestedUser') === Session.get('currentUser')) {
      return true;
    }
    return false;
  }

});