
Template.loginPage.events({

    'keyup #username-field' : function(e) {

        clearLoginAnimations();
        var usernameValue = $('#username-field').val();
        usernameValue = $('#username-field').val().replace(/[^a-z^A-Z\d]/, "");
        $('#username-field').val(usernameValue);

        var usernameInput = $('#username-field').val();

        if(usernameInput === "") {
          $('#status-message').text("You have to fill both fields");
          $('#login-status .ss-icon').text("Warning");
          $('#login-status').addClass("error");
          $('#username-field').addClass("animated shake");
          $('#password-field').addClass("animated shake");
          $('#login-status').addClass("animated pulse");
          
        } else {
          if(Meteor.users.findOne({username:usernameInput})) {
            $('#status-message').text("Welcome back!");
            $('#login-status .ss-icon').text("Key");
            $('#login-status').removeClass("error");
            $('#login-status').removeClass("thinking");
            $('#login-status').addClass("animated pulse");
          } else {
            $('#status-message').text("Create new account?");
            $('#login-status .ss-icon').text("User");
            $('#login-status').removeClass("error");
            $('#login-status').removeClass("thinking");
          }
        }

    },

    'click #login-status, tap #login-status' : function(e) {
      if(ignoreClick(e)) return;
      submitLogin(e);
    },

    'submit #login-form' : function(e) {
      submitLogin(e);
    }

});

clearLoginAnimations = function(e) {

  $('#username-field').removeClass("animated shake");
  $('#password-field').removeClass("animated shake");
  $('#login-status').removeClass("animated pulse");

};

submitLogin = function(e) {

  e.preventDefault();
  clearLoginAnimations();
  $('#login-status .ss-icon').text("Clock");
  $('#login-status').addClass("thinking");

  var usernameInput = $('#username-field').val();
  var passwordInput = $('#password-field').val();

  if(usernameInput !== "" && passwordInput !== "") {

    if(Meteor.users.findOne({username:usernameInput})) {

      Meteor.loginWithPassword(usernameInput, passwordInput, function(error) {
        if (error) {
          $('#password-field').val("");
          $('#status-message').text("Are you sure you're " + usernameInput + "?");
          $('#login-status .ss-icon').text("Warning");
          $('#login-status').removeClass("thinking");
          $('#login-status').addClass("error");
          $('#password-field').addClass("animated shake");
          $('#login-status').addClass("animated pulse");
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
    $('#login-status .ss-icon').text("Warning");
    $('#login-status').removeClass("thinking");
    $('#login-status').addClass("error");
  }

};
