

Meteor.Router.add({

  '/': { 
    as: 'home',
    to: 'loginPage'
  },

  '/search/' : {
    as: 'search',
    to: 'searchPage'
  },

  '/search/add/:patentNumber' : {
    as: 'add',
    to: 'addPage',
    and: function(patentNumber) {
      var currentPatent = Patents.findOne({number: patentNumber});
      Session.set('currentPatent', currentPatent);
    }
  },

  '/:username/': { 
    as: 'profile',
    to: 'profilePage'
  }, 
  
  '/:username/decks/': { 
    as: 'decks',
    to: 'decksPage'
  },

  '/:username/decks/:id' : { 
    as: 'patents',
    to: 'patentsPage',
    and: function(username, id) {
      var deck = Decks.findOne({_id: id});
      if(deck !== undefined) { 
        Session.set('currentDeck', deck);
      }
    }
  },

  '/*': '404' // not a true 404 HTTP response

});

Meteor.Router.filters({

  'requireLogin': function(page) {
    if (Meteor.user())
      return page;
		else if (Meteor.loggingIn())
      return 'loadingPage';
    else
      return '404';
  }, 

  'detectDevice': function() {

    // detect device
    //var isiDevice = /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());
    var isiDevice = /iphone|ipod/i.test(navigator.userAgent.toLowerCase());

    if (isiDevice) {
      if (navigator.standalone == true) {
        // iOS login page
        return 'loginPage';
      } else {
        // iOS add to homepage message
        return 'idevicePage';
      }
    } else { 
      // marketing page
      return 'genericLanding';
      //return 'loginPage';
    }
  },

  'forwardUser': function(page) {

    if (Meteor.loggingIn()) {
      return 'loadingPage';
    } else if (Meteor.user()) {
      Meteor.Router.to("decks", Meteor.user());
      return 'decksPage';
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
        return '404';
      }
    }  
  },

  'verfiyDeck': function(page) {
    if(Decks.findOne({username: Session.get('currentUser'), name: Session.get('currentDeck').name}) !== undefined) {
      return page;
    } else {
      return '404';
    }
  }

});

Meteor.Router.filter('detectDevice', {only: 'loginPage'});
Meteor.Router.filter('requireLogin', {except: ['loginPage', 'decksPage', 'patentsPage', 'profilePage', 'genericLanding', 'idevicePage']});
Meteor.Router.filter('forwardUser', {only: ['loginPage']});
Meteor.Router.filter('verfiyUser', {only: ['profilePage', 'decksPage', 'patentsPage']});
Meteor.Router.filter('verfiyDeck', {only: ['patentsPage']});



