
var tabs = require("sdk/tabs");
var self = require("sdk/self");

var localmanager = require("./localmanager.js");

/*const {Cc,Ci} = require("chrome");
const alert = Cc['@mozilla.org/alerts-service;1']
                  .getService(Ci.nsIAlertsService)
                  .showAlertNotification;
                  */
        
exports.main = function (options, callbacks) {
  require("sdk/tabs").on("ready", function(tab){
  	var url=tab.url;
  	var allpat = localmanager.queryAll();
  	//alert(null, "", "all pat:"+allpat.length);
    var patterns = allpat.filter(function(e){
    	if(!("url_pattern" in e)||e.url_pattern=="")
    		return true;
    	var matches = url.match(e.url_pattern);
    	return (matches!=null);
    });
    //alert(null, "", "pattern num:"+patterns.length);
    if(patterns.length==0)
        return;
        
  	worker = tab.attach({
      contentScriptFile: self.data.url("my-script.js")
    });
    worker.port.emit("addListener", patterns);
});
};

exports.onUnload = function (reason) {
	//console.log("onload reason:"+reason);
  if(reason=="disable" || reason=="uninstall"){
    localmanager.destroy();
  }
};
