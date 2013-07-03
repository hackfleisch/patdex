
Template.searchHeader.rendered = function(e) {


};


Template.searchHeader.events({


});

Template.searchHeader.helpers({

	currentQuery : function(e) {
		if(Session.get('currentQuery') !== undefined) {
			return Session.get('currentQuery');
		}
	}

});