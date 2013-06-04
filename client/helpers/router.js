

Meteor.Router.add({

  '/': 'loginPage',
  
  '/:username/': { 
    as: 'decks',
    to: 'decksPage', 
    and: function(username) {
      Session.set('currentUser', username);
    } 
  },

  '/decks/:_id' : { 
    as: 'patents',
    to: 'patentsPage',
    and: function(id) {
      var deck = Decks.findOne(id);
      Session.set('currentDeck', deck);
    }
  },

  '/patents/search/' : {
    as: 'search',
    to: 'searchPage'
  },

  '/patents/search/add/' : {
    as: 'add',
    to: 'addPage'
  },

  // '/patents/pdf/' : 'pdfViewer',

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
      // return 'loginPage';
    }
  }

});

Meteor.Router.filter('requireLogin', {except: ['loginPage']});

Meteor.Router.filter('detectDevice', {only: 'loginPage'});
