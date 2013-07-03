

Meteor.Router.add({

  '/': { 
    as: 'home',
    to: 'landingPage'
  },

  '/search/' : {
    as: 'search',
    to: 'searchPage'
  },

  '/:username/': { 
    as: 'profile',
    to: 'userProfile'
  }, 

  '/:username/decks/': { 
    as: 'decks',
    to: 'userDecks'
  },

  '/:username/decks/:id' : { 
    as: 'deck',
    to: 'deckPatents',
    and: function(username, id) {
      var deck = Decks.findOne({_id: id});
      if(deck !== undefined) { 
        Session.set('currentDeck', deck);
      }
    }
  },

  '/*': '404Page' // not a true 404 HTTP response

});

Meteor.Router.filters({

  'requireLogin': function(page) {
    if (Meteor.user())
      return page;
    else if (Meteor.loggingIn())
      return 'loadingPage';
    else
      return '404Page';
  }, 

  'detectDevice': function() {

    // detect device
    var isiDevice = /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());

    if (isiDevice) {
      if (navigator.standalone == true) {
        // iOS pinned app - hide 'pin to homescreen drawer'
        Session.set('showDrawer', false);
        return 'landingPage';
      } else {
        // iOS safari - slide up 'pin to homescreen drawer'
				Session.set('showDrawer', true);
        return 'landingPage';
      }
    } else { 
      // Anything else - hide 'pin to homescreen drawer'
      Session.set('showDrawer', false);
      return 'landingPage';
    }
  },

  'forwardUser': function(page) {

    if (Meteor.loggingIn()) {
      return 'loadingPage';
    } else if (Meteor.user()) {
      Meteor.Router.to("decks", Meteor.user());
      return 'userDecks';
    } else {
      return page;
    }
  },

  'verfiyUser': function(page) {
    if (Meteor.user()) {
      Session.set('currentUser', Meteor.user().username);
      return page;
    } else {
      var path = window.location.pathname;
      path = path.substr(1, path.length);
      var currentUser = path.substr(0, path.indexOf('/')); 
      if(Meteor.users.findOne({username: currentUser})) {
        Session.set('currentUser', currentUser);
        return page; 
      } else {
        return '404Page';
      }
    }  
  },

  'verfiyDeck': function(page) {
    if(Session.get('currentDeck') !== undefined) {
      if(Decks.findOne({username: Session.get('currentUser'), _id: Session.get('currentDeck')._id}) !== undefined) {
        return page;
      } else {
        return '404Page';
      }
    }
  }

});

Meteor.Router.filter('requireLogin', {only: 'searchPage'});
Meteor.Router.filter('detectDevice', {only: 'landingPage'});
Meteor.Router.filter('forwardUser', {only: ['landingPage']});
Meteor.Router.filter('verfiyUser', {only: ['userDecks', 'userProfile', 'deckPatents']});
Meteor.Router.filter('verfiyDeck', {only: ['deckPatents']});
