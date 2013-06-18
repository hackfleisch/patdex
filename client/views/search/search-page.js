
Template.searchPage.rendered = function(e) {

    $('#content-slider').royalSlider({
      // example of slider options
      arrowsNav: false,
      controlNavigation: 'bullets',
      navigateByClick: false
    });

};

Template.searchPage.events({

  'click #add-button, tap #add-button' : function(e) {
    if(ignoreClick(e)) return;
    Session.set('resultStatus', false);
    Session.set('viewFullBiblio', false);
    Meteor.Router.to("add", Meteor.user());
  } 

});

Template.searchPage.helpers({

	resultCheck: function(e) {
		return Session.get('resultStatus');
	},

	results: function(e) {
		var currentPatents = Session.get('currentPatents');
		return Session.get('currentPatents');
	},

	pdfVisible: function(e) {
		return Session.get('pdf-to-view');
	}

});