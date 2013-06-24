
Template.profilePage.events({

  'click #logout-button, tap #logout-button': function(e) {
    if(ignoreClick(e)) return;
    Meteor.logout();
    Meteor.Router.to("home");
  },

  'click #post-feedback, tap #post-feedback': function(e) {
    if(ignoreClick(e)) return;
    document.location.href = "mailto:brentriddell@me.com?subject=RE%3A%20PatDex%20Support/Feedback&body=%0D%0A%0D%0AThanks%2C%0D%0A" + Session.get('currentUser');
  },

  'click #user-decks, tap #user-decks': function(e) {
    if(ignoreClick(e)) return;
    Meteor.Router.to("decks", Session.get('currentUser'));
  }

});

Template.profilePage.helpers({

  loggedIn: function(e) {
    return Meteor.user();
  },

  username: function(e) {
    var username = Session.get('currentUser');
    var shortName = username.substring(0, 14);
    if(shortName.length == 14) {
      return shortName += "...";
    }
    return shortName;
  },

  deckAmount: function(e) {
    var decks = Decks.find({username: Session.get('currentUser')}).fetch();
    return decks.length;
  },

  patentAmount: function(e) {
    var patents = 0;
    var decks = Decks.find({username: Session.get('currentUser')}).fetch();
    for(i=0; i<decks.length; i++) {
      patents += decks[i].patents.length;
    }
    return patents;
  },

  memberSince: function(e) {
    if(Session.get('currentUser') !== undefined) {
      var currentUser = Meteor.users.findOne({username: Session.get('currentUser')});
      var memberSince = moment(currentUser.createdAt).format();
      return moment(memberSince).fromNow();
    }
  }

});




