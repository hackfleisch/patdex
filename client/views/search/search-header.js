

Template.searchHeader.events({

  'keyup #search-field' : function(e) {
      var searchValue = $('#search-field').val();
      searchValue = $('#search-field').val().replace(/[^a-z^A-Z\d]/, "");
      $('#search-field').val(searchValue);
  },

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

  var searchInput = $('#search-field').val().toUpperCase();
  $('#search-field').val(searchInput);

  if(searchInput !== "") {

    var existingPatent = Patents.findOne({number: searchInput});

    if(existingPatent) {
      Session.set('resultStatus', true);
      Session.set('currentPatent', existingPatent._id);
    } else {
      grabPatent(searchInput);
    }

  }

};

toTitleCase = function(str) {

  return str.replace(/\w\S*/g, function(txt) { 
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

};

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

  // Meteor.call("check_pdf", "https://patentimages.storage.googleapis.com/pdfs/", number, function(err,result) {

  //   if(err) {
  //     patentPDF = false;
  //   } else {
  //     patentPDF = "patentimages.storage.googleapis.com/pdfs/" + number + ".pdf";
  //   }

  //   var newPatent = {
  //     number: patentNumber,
  //     title: patentTitle,
  //     publication: patentPublication,
  //     priority: patentPriority,
  //     inventors: patentInventors,
  //     applicants: patentApplicants,
  //     classifications: patentClassifications,
  //     link: patentLink,
  //     PDF: patentPDF,
  //     abstract: patentAbstract,
  //     source: patentSource
  //   };

  //   addPatent(newPatent, patentNumber);

  // });

};

addPatent = function(newPatent, patentNumber) {

  Patents.insert(newPatent);

  var existingPatent = Patents.findOne({number: patentNumber});

  Session.set('resultStatus', true);
  Session.set('currentPatent', existingPatent._id);

};

