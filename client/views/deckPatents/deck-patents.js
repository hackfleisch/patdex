

Template.deckPatents.rendered = function(e) {

  patentsSlider = $('.royalSlider').royalSlider({
    arrowsNav: false,
    controlNavigation: 'bullets',
    navigateByClick: false
  }).data('royalSlider');

};


Template.deckPatents.events({

  'click #goto-search, tap #goto-search' : function(e) {
    if(ignoreClick(e)) return;
    Meteor.Router.to("search");
  }

});

Template.deckPatents.helpers({

	checkDeckPatents : function(e) {
		if(Session.get('currentDeck') !== undefined) {
  		var deck = Session.get('currentDeck');
  		if(deck.patents.length === 0) { return false; }
  		for(i=0;i<deck.patents.length;i++) {
	        if(!Patents.findOne({number: deck.patents[i]})) return false;
	      }
      return true;
    }
	},

  patents : function(e) {
    var deck = Session.get('currentDeck');
    return Patents.find({number: {"$in": deck.patents}});
  },

  userLoggedIn : function(e) {
    if(Session.get('requestedUser') === Session.get('currentUser')) {
      return true;
    }
    return false;
  }


});