
const {Cu} = require("chrome");
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/FileUtils.jsm");

  var pub={};
  pub.LOCALRECORDFILE = "input_changer.sqlite";
  pub.RECORDTABLENAME = "replace_pattern_0_1";

  // get profile directory
  pub.profilePath = FileUtils.getFile("ProfD", [pub.LOCALRECORDFILE]);
  
  pub.localRecord = function(){
    var file = pub.profilePath;
   
    var storageService = Services.storage;
    return storageService.openDatabase(file);
  }();
  
  pub.queryAll = function(){
		//console.log("queryAll with file:"+pub.profilePath.path);
    var statement = pub.localRecord.createStatement("SELECT rowid,* from " + pub.RECORDTABLENAME);
    var items = [];
    try {
      while (statement.executeStep()) {
        var item = {};
        item.id = statement.getInt64(0);
        item.url_pattern = statement.getString(1);
        item.input = statement.getString(2);
        item.replacement = statement.getString(3);
        items.push(item);
      }
      statement.reset();
      return items;  
    } 
    catch (e) {
      statement.reset();
			return items;
    }
  };
  
  //built-in rowid, can't guarantee same order as savedate, if renaming is allowed
  pub.init = function(){
    //alert("local manager inited");
    //TODO: add pre-processing to check table from former version if format changes
    var statement = pub.localRecord.createStatement("CREATE TABLE IF NOT EXISTS " + pub.RECORDTABLENAME + "(url_pattern STRING, input STRING, replacement STRING)");
    try {
      if (statement.executeStep()) {
        //alert("table opened");
      }
      statement.reset();
    } 
    catch (e) {
      alert(e);
      statement.reset();
    }
  };
  
  pub.destroy = function(){
		//console.log("to remove:"+pub.profilePath.path);
  	pub.profilePath.remove(false);
  };
  
  pub.init();
	
	
	exports.queryAll = pub.queryAll;
	exports.destroy = pub.destroy;
