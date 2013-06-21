
Template.addHeader.rendered = function(e) {

};

Template.addHeader.events({

  'click #cancel-add, tap #cancel-add' : function(e) {
  	if(ignoreClick(e)) return;
    Session.set('viewFullBiblio', false);
  	Meteor.Router.to("decks", Meteor.user());
  }

});

Template.addHeader.helpers({

  currentPatent: function(e) {
  	if(Session.get('currentPatent') !== undefined) {
	    var patent = Patents.findOne(Session.get('currentPatent'));
	    return patent.number;
	  }
  }

});
