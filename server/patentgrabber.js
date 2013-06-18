

Meteor.methods({

  grab_patent: function(number) {

    var url = "http://www.google.com/patents/" + number;

    var result = Meteor.http.get(url).content;

    $ = cheerio.load(result);

    return $('body').html();

  },

  check_pdf: function(url, number) {

    checkURL = url + number + ".pdf";

    var result = Meteor.http.get(checkURL).content;

    return result;

  },

  search_google: function(query) {

    var url = "https://www.google.com/search?safe=off&output=search&tbm=pts&q=" + query; 

    var result = Meteor.http.get(url).content;

    $ = cheerio.load(result);

    return $('#search').html();

  }

});