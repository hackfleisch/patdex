
Template.miniBiblio.helpers({

  inventorTotal: function() {
    var counter = this.inventors.length - 1;
    if(counter<1) return "";
    return "(" + counter + " more)";
  }

});