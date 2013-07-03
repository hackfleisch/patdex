
Template.landingPage.rendered = function(e) {

	if(Session.get('showDrawer')) {
    $(".drawer").removeClass('s-hidden');
		setTimeout(function(){
			$(".page").addClass('slideUp');
			$(".beta-banner-wrapper").addClass('slideUp');
			$(".drawer").addClass('slideUp');	
		}, 1000);
	}

  $(".drawer").click(function(e){
      $(".page").removeClass('slideUp');
      $(".beta-banner-wrapper").removeClass('slideUp');
      $(".drawer").removeClass('slideUp');  
      setTimeout(function(){
        $(".drawer").addClass('s-hidden');
      }, 1000);
    });

};


Template.landingPage.events({

	'keyup #login-username-input' : function(e) {

		clearLoginAnimations();
    var usernameValue = $('#login-username-input').val();
    usernameValue = $('#login-username-input').val().replace(/[^a-z^A-Z\d]/, "");
    $('#login-username-input').val(usernameValue);

    var usernameInput = $('#login-username-input').val();

    if(usernameInput === "") {
      $('#status-message').text("You have to fill both fields");
      $('#login-username-input').addClass("error");
      $('#login-password-input').addClass("error");
      
    } else {
      if(Meteor.users.findOne({username:usernameInput})) {
        $('#status-message').html("Welcome back! <br> Please enter your password");
      } else {
        $('#status-message').html("Create new account? <br> Choose a username and password");
      }
    }

	},

	'submit #login-form' : function(e) {
	  submitLogin(e);
	}

});

Template.landingPage.helpers({


});

clearLoginAnimations = function(e) {

  $('#login-username-input').removeClass("error");
  $('#login-password-input').removeClass("error");

};

submitLogin = function(e) {

  e.preventDefault();
  clearLoginAnimations();

  var usernameInput = $('#login-username-input').val();
  var passwordInput = $('#login-password-input').val();

  if(usernameInput !== "" && passwordInput !== "") {

    // Session.set('loadingStatus', true);
    $('#login-username-input').blur();
    $('#login-password-input').blur();

    if(Meteor.users.findOne({username:usernameInput})) {

      Meteor.loginWithPassword(usernameInput, passwordInput, function(error) {
        if (error) {
          // Session.set('loadingStatus', false);
          $('#login-password-input').val("");
          $('#status-message').text("Are you sure you're " + usernameInput + "?");
		      $('#login-password-input').addClass("error");
        } else {
          Meteor.Router.to("decks", Meteor.user());
        }
      });

    } else {

      Accounts.createUser({username: usernameInput, password: passwordInput}, function(error){
        if (error) {
          // the username already taken error is impossible (see keyup event on #username-field)
        } else {
          Meteor.Router.to("decks", Meteor.user());
        }
      });

    }

  } else {

    $('#status-message').text("You have to fill both fields");
    $('#login-username-input').addClass("error");
    $('#login-password-input').addClass("error");

  }

};

