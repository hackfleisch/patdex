
Patents = new Meteor.Collection('patents');

Patents.allow({

  insert: function(userId, doc) {
    return !! userId;
  },

  remove: function(userId, doc) {
    return !! userId;
  }
  
});