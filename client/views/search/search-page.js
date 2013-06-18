
Template.searchPage.rendered = function(e) {

    $('#content-slider').royalSlider({
      arrowsNav: false,
      controlNavigation: 'bullets',
      navigateByClick: false
    });

    slider = $("#content-slider").data('royalSlider');

};

Template.searchPage.events({

  'click #add-button, tap #add-button' : function(e) {
    if(ignoreClick(e)) return;
    Session.set('resultStatus', false);
    Session.set('viewFullBiblio', false);
    var currentPatent = Session.get('currentPatents')[slider.currSlide.id];
    Session.set('currentPatent', currentPatent);
    Meteor.Router.to("add", Meteor.user());
  }, 

  'click #status-message, tap  #status-message' : function(e) {
    if(ignoreClick(e)) return;  
    $("#search-field").val("Transformable lunchbox robot");
    submitSearch(e);
  }

});

Template.searchPage.helpers({

	resultCheck: function(e) {
		return Session.get('resultStatus');
	},

  loadingCheck: function(e) {
    return Session.get('loadingStatus');
  },

	results: function(e) {
		return Session.get('currentPatents');
	},

	pdfVisible: function(e) {
		return Session.get('pdf-to-view');
	}

});