

Template.searchHeader.events({

  'click #cancel-search, tap #cancel-search' : function(e) {
    if(ignoreClick(e)) return;
    Session.set('resultStatus', false);
    Session.set('currentPatent', "");
    Session.set('viewFullBiblio', false);
    Session.set('showDeckInput', false);
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

submitSearch = function(e) {

  e.preventDefault();

  Session.set('viewFullBiblio', false);
  Session.set('resultStatus', false);
  Session.set('currentPatent', "");

  var searchInput = $('#search-field').val();

  if(searchInput !== "") {

    searchGoogle(searchInput);

  }

};


searchGoogle = function(query) {

  var existingPatents = [];
  var newPatents = [];
  var patentResults = [];

  // make HTTP call to google URL with query

  Meteor.call("search_google", query, function(err,resultsPage) {

    console.log(resultsPage);

    // // initialise arrays and variables

    // existingPatents = [];
    // newPatents = [];
    // var resultsList = [];
    // var currentPatent = "";

    // if(err) {

    //   // if there is an error then cancel

    //   console.log("HTTP error!");

    //   return;

    // } else {

    //   // for each result push their URL to the resultsList array

    //   $(resultsPage).find("cite").each(function(e){
    //     resultsList.push($(this).text());
    //   });

    //   // for each URL check if we already have them in the system

    //   for(i=0;i<resultsList.length;i++) {

    //     // convert the URL to a string and clean off ending if necessary

    //     var string = resultsList[i].toString();
    //     if(string.indexOf('?') !== -1) {
    //       var cleanString = string.substring(0, string.indexOf('?'));
    //     } else {
    //       cleanString = string;
    //     }

    //     // look for the patent in the patents collection

    //     currentPatent = Patents.findOne({link: cleanString});

    //     if(currentPatent) {

    //       // if found add the patent object into the existingPatents array

    //       existingPatents.push(currentPatent);

    //     } else {

    //       // if not then add the patent number to the newPatents array

    //       var patentNumber = cleanString.slice(23);

    //       newPatents.push(patentNumber);

    //     }
    //   }

    // }

    // // check for patents in the existingPatents array

    // if(existingPatents.length !== 0) {

    //   // add each patent object to the patentResults array

    //   for(i=0;i<existingPatents.length;i++) {
    //     patentResults.push(existingPatents[i]);
    //   }

    // }

    // // check for patents in the newPatents array

    // if(newPatents.length !== 0) {

    //   // harvest each new patent

    //   for(i=0;i<newPatents.length;i++) {
    //     grabPatent(newPatents[i]);
    //   }

    //   // add each patent object to the patentResults array

    //   for(i=0;i<newPatents.length;i++) {
    //     var newPatent = Patents.findOne({number: newPatents[i]});
    //     patentResults.push(newPatent);
    //   }

    // }

    // // Display the results!

    // Session.set('currentPatents', patentResults);
    // Session.set('resultStatus', true);

  });
    
};


/////////////////////////////////////////////////////////////////////////////////


grabPatent = function(number) {

    Meteor.call("grab_patent", number, function(err,patent) {

      if(err) {

        $("#status-message").text("We can't find that patent!");

      } else {

        processPatent(patent, number);

      }

    });
    
};

processPatent = function(patent, number) {

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

    patentTitle = toTitleCase($(patent).find(".gb-volume-title").text().trim());

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

  var newPatent = {
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

  addPatent(newPatent, patentNumber);

};

addPatent = function(newPatent, patentNumber) {

  Patents.insert(newPatent);

};

