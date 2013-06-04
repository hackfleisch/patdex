
Template.pdfViewer.events({

    'click #cancel-button, tap #cancel-button' : function(e) {
    	if(ignoreClick(e)) return;
			Session.set('pdf-to-view', false);
    }
    
});


Template.pdfViewer.helpers({

	PDF: function(e) {
		return Session.get('pdf-to-view');
	}

});