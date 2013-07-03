
Template.addPatentHeader.rendered = function(e) {

	$(".content").removeClass('search');

};


Template.addPatentHeader.events({

  'click #goto-search, tap #goto-search' : function(e) {
  	if(ignoreClick(e)) return;
  	$(".content").addClass('search');
  	Session.set('addPatent', false);
  }

});

Template.addPatentHeader.helpers({

	patentNumber: function(e) {
		return Session.get('currentPatent').number;
	}

});