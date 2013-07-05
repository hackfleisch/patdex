
Template.patentItem.rendered = function(e) {

};


Template.patentItem.events({

  'click #view-PDF, tap #view-PDF' : function(e) {
    if(ignoreClick(e)) return;
    alert("PDF!");
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