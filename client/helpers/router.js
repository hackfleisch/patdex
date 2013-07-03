

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
      Meteor.Router.to("decks", Meteor.user().username);
      return 'userDecks';
    } else {
      return page;
    }
  },

  'verifyUser': function(page) {

    // determine who is logged in as opposed to what they are requesting

    if (Meteor.loggingIn()) {

      // return loading page while logging in user (if required)

      return 'loadingPage';

    } else {

      // if the user is already logged in then setup the current user 

      if(Meteor.user()){
        Session.set('currentUser', Meteor.user().username);
      }

      // grab the URL

      var path = window.location.pathname;

      // trim the URL down the the username (first part of the path)

      path = path.substr(1, path.length);
      var requestedUser = path.substr(0, path.indexOf('/')); 

      // set the requested user from the URL

      if(requestedUser === "" || requestedUser === "search") {
        // if the URL turns up blank it means the user is logging in or coming from the search page
        Session.set('requestedUser', Meteor.user().username);
      } else {
        Session.set('requestedUser', requestedUser);
      }

      // check and see if the requested user exists

      if(Meteor.users.findOne({username: Session.get('requestedUser')})) {

        return page;

      } else {

        // if they don't then show not found

        return '404Page';
      }

    }

  },

  'verifyDeck': function(page) {
    if(Session.get('currentDeck') === undefined) {
      return '404Page';
    } else {
      if(Decks.findOne({username: Session.get('requestedUser'), _id: Session.get('currentDeck')._id}) !== undefined) {
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
Meteor.Router.filter('verifyUser', {only: ['userDecks', 'userProfile', 'deckPatents']});
Meteor.Router.filter('verifyDeck', {only: ['deckPatents']});
