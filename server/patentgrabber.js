

Meteor.methods({

  grab_patent: function(number) {

    // assemble the search query

    var url = "http://www.google.com/patents/" + number;
    var result = Meteor.http.get(url).content;
    $ = cheerio.load(result);

    // return the resulting page contents

    return $('body').html();

  },

  check_pdf: function(url, number) {

    checkURL = url + number + ".pdf";

    var result = Meteor.http.get(checkURL).content;

    return result;

  },

  search_google: function(query) {

    // assemble the search query

    var url = "https://www.google.com/search?safe=off&output=search&tbm=pts&q=" + query; 
    var result = Meteor.http.get(url).content;
    $ = cheerio.load(result);

    // return the resulting page contents

    return $('#search').html();

  }

});