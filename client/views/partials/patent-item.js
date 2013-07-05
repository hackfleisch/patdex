
Template.patentItem.rendered = function(e) {

};


Template.patentItem.events({

  'click #delete-patent, tap #delete-patent' : function(e) {
    if(ignoreClick(e)) return;
    var patentNumber = this.number;
    $(".patent").addClass("fadeOutDown");
    setTimeout(function(){
      var deck = Session.get('currentDeck');
      Decks.update({ _id: deck._id }, { $pull: { patents: patentNumber }}); 
      $(".patent").removeClass("fadeOutDown");
    }, 1000);  
  }

});

Template.patentItem.helpers({

	pdfLink : function(e) {
		return this.PDF;
	},

	searchResults: function(e) {
		return Session.get('viewDeck');
	},

  userLoggedIn : function(e) {
    if(Session.get('requestedUser') === Session.get('currentUser')) {
      return true;
    }
    return false;
  }

});