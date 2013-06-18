
Template.patentsPage.rendered = function(e) {

    $('#content-slider').royalSlider({
      arrowsNav: false,
      controlNavigation: 'bullets',
      navigateByClick: false,
      deeplinking: {
        enabled: true,
        change: true,
        prefix: 'patent-'
      }
    });

};

Template.patentsPage.events({

    'click #search-button, tap #search-button' : function(e) {
    	if(ignoreClick(e)) return;
    	Meteor.Router.to("search");
    }
    
});

Template.patentsPage.helpers({

	patentCheck: function() {
		var deck = Session.get('currentDeck');
		if(deck.patents.length == 0) return false;
		return true;
	},

  patents: function() {
  	var deck = Session.get('currentDeck');
  	return Patents.find({number: {"$in": deck.patents}});
  },

  pdfVisible: function(e) {
    return Session.get('pdf-to-view');
  }

});