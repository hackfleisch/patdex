 
ignoreClick = function(e) {

	if(e.type == "tap") { 
		Session.set("ignoreClick", true);
	} else {
		if(Session.get("ignoreClick")) return true;
	}
	
	return false;

};