
resetSearchSession = function(e) {

  Session.set('viewFullBiblio', false);

  Session.set('resultStatus', false);
  Session.set('currentPatents', "");
  Session.set('currentPatent', "");
  Session.set('loadingStatus', false);

};


/////////////////////////////////////////////////////////////////////////////////


Template.searchHeader.events({

  'click #cancel-search, tap #cancel-search' : function(e) {
    if(ignoreClick(e)) return;
    resetSearchSession();
    Meteor.Router.to("decks", Meteor.user());
  },

  'click #search-submit, tap #search-submit' : function(e) {
    if(ignoreClick(e)) return;
    submitSearch(e);
  },

  'submit #search-form' : function(e) {
    submitSearch(e);
  }

});

Template.searchHeader.helpers({

  loadingStatus: function(e){
    return Session.get('loadingStatus');
  }

});


/////////////////////////////////////////////////////////////////////////////////


addPatent = function(newPatent) {

  Patents.insert(newPatent);

};

processPatent = function(patent, number, tag, callback) {

  // check if the patent already exists in the database and if not then process the page data

  var newPatent = Patents.findOne({"number":number});

  if (!newPatent)  {

    // create initial varibales

    var patentNumber = number;
    var patentTitle = "";
    var patentPublication = "";
    var patentPriority = "";
    var patentInventors = [];
    var patentApplicants = [];
    var patentClassifications = [];
    var patentLink = "";
    var patentPDF = "";
    var patentAbstract = "";
    var patentSource = "Google Patents";

    if($(patent).find(".patent-title").text() !== "") {

      // process patent type 1: 'new type'

      patentTitle = $(patent).find(".patent-title").text().trim();
      patentPublication = $(patent).find('td:contains("Publication date")').next().text().trim();
      patentPriority = $(patent).find('td:contains("Priority date")').next().text().trim();

      var inventorsHTML = $(patent).find('td:contains("Inventors")').next().html();
      var inventorsDATA = $(inventorsHTML).find('.patent-bibdata-value > a').each(function() {
        patentInventors.push(this.text);
      });

      var applicantsHTML = $(patent).find('td:contains("Original Assignee")').next().html();
      var applicantsDATA = $(applicantsHTML).find('.patent-bibdata-value > a').each(function() {
        patentApplicants.push(this.text);
      });

      var classificationsHTML = $(patent).find('td:contains("U.S. Classification")').next().html();
      var classificationsDATA = $(classificationsHTML).find('.patent-bibdata-value > a').each(function() {
        patentClassifications.push(this.text);
      });

      patentAbstract = $(patent).find(".abstract").text().trim();  
      if(patentAbstract === "") {
        patentAbstract = "No abstract provided for this document. Check PDF if available.";
      }
    

    } else {

      // process patent type 2: 'old type'

      patentTitle = $(patent).find(".gb-volume-title").text().trim();

      patentPriority = $(patent).find('b:contains("Issue date")');
      if(patentPriority.length > 0) {
        if(patentPriority[0].nextSibling !== null) {
          var temp = patentPriority[0].nextSibling.nodeValue;
          patentPriority = temp.replace(/[^a-z^A-Z\d]/, "").trim();
        } else {
          patentPriority = false;
        }
      } else {
        patentPriority = false;
      }  

      patentPublication = $(patent).find('b:contains("Filing date")');
      if(patentPublication.length > 0) {
        if(patentPublication[0].nextSibling !== null) {
          var temp = patentPublication[0].nextSibling.nodeValue;
          patentPublication = temp.replace(/[^a-z^A-Z\d]/, "").trim();
        } else {
          patentPublication = false;
        }
      } else {
        patentPublication = false;
      }

      $(patent).find('b:contains("Inventor")').filter(function() {

        if($(this).text() === "Inventor") {
          patentInventors.push($(this).next().html());
        } else {
          $(this).nextUntil("br").each(function(){
            patentInventors.push(this.text);
          });
        }

      });    

      $(patent).find('b:contains("Current U.S. Classification")').nextUntil("br").each(function() {
        patentClassifications.push(this.text);
      });   

      patentAbstract = "No abstract provided for this document. Check PDF if available.";

    }

    patentLink = "http://www.google.com/patents/" + number;
    patentPDF = "patentimages.storage.googleapis.com/pdfs/" + number + ".pdf";

    // popualte new patent object with data collected from the page

    newPatent = {
      number: patentNumber,
      title: patentTitle,
      publication: patentPublication,
      priority: patentPriority,
      inventors: patentInventors,
      applicants: patentApplicants,
      classifications: patentClassifications,
      link: patentLink,
      PDF: patentPDF,
      abstract: patentAbstract,
      source: patentSource
    };

    // add patent to the database

    addPatent(newPatent);
  }

  // function callback

  if(callback) {
    callback(newPatent, tag);
  }

};

grabPatent = function(number, tag, callback) {

    // send off patent number to the server and process the results

    Meteor.call("grab_patent", number, function(err,patent) {

      if(err) {
        return console.log("Unable to find patent");
      } else {
        processPatent(patent, number, tag, callback);
      }

    });
    
};


/////////////////////////////////////////////////////////////////////////////////


processSearchResults = function(searchResults) {

  var resultsList = [];

  // for each result add its URL to the resultsList array

    $(searchResults).find("cite.kv").each(function(e){

      // clean up each string before adding to array (if required)

        var str = $(this).text().toString();

        if(str.indexOf('?') !== -1) { 
          str = str.substring(0, str.indexOf('?'));
        }

        str = str.slice(23);

      resultsList.push(str);

    });

  // if resultsList is empty it means no results were found

    if(resultsList.length === 0) {
      Session.set('resultStatus', false);
      Session.set('loadingStatus', false);
      $("#status-message").html("Sorry, we couldn't find any <br> patents matching that query.");
      return;
    }

  // process each patent and update the view when complete

    var currentPatents = [];

    for(i=0; i<resultsList.length; i++) {
      grabPatent(resultsList[i], i, function(newPatent, tag){
        currentPatents.push(newPatent);
        if (tag == resultsList.length - 1) {
          Session.set('currentPatents', currentPatents);
          Session.set('resultStatus', true);
          Session.set('loadingStatus', false);
        }
      });
    }

};

searchGoogle = function(query) {

  // send off query to server and process the results

  Meteor.call("search_google", query, function(err,resultsPage) {

    if(err) {
      return console.log("HTTP error!");
    } else {
      processSearchResults(resultsPage);
    }

  });
    
};

submitSearch = function(e) {

  // prevent default submit behaviour and reset session variables

  e.preventDefault();
  resetSearchSession();

  // grab the search query value and its not empty then perform the search

  var searchInput = $('#search-field').val();
  if(searchInput !== "") {
    $("#search-field").blur();
    Session.set('loadingStatus', true);
    searchGoogle(searchInput);
  }

};

