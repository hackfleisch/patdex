

if (Meteor.is_client) {
    Meteor.startup(function () {

    	// banner feedback submission email

      $(".beta-banner").click(function(e){
				var user = "Me";
				if(Session.get('currentUser')) {
					user = Session.get('currentUser');
				}
				document.location.href = "mailto:brentriddell@me.com?subject=RE%3A%20PatDex%20Support/Feedback&body=%0D%0A%0D%0AThanks%2C%0D%0A" + user;
			});

    });
}

Meteor.subscribe('decks');

Meteor.subscribe('users');

Meteor.subscribe('patents');