

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
  
  '/:username/decks/': { 
    as: 'decks',
    to: 'decksPage', 
    and: function(username) {
      Session.set('currentUser', username);
    } 
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
      //return 'genericLanding';
      return 'loginPage';
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
  }

});

Meteor.Router.filter('forwardUser', {only: ['loginPage']});

Meteor.Router.filter('requireLogin', {except: ['loginPage','patentsPage']});

Meteor.Router.filter('detectDevice', {only: 'loginPage'});
