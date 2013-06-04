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

	patent: function(e) {
		var currentPatent = Session.get('currentPatent');
		return Patents.findOne(currentPatent);
	},

	pdfVisible: function(e) {
		return Session.get('pdf-to-view');
	}

});