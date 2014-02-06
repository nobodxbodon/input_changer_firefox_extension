           
var onInputFocus = function(aEvent, patterns) {
		//alert(null, "", "input focus:"+aEvent.target.id+" patterns:"+patterns.length);
		var targetValue = aEvent.target.value;
    for(var i in patterns){
    	//alert(null, "", targetValue+".replace:"+patterns[i].input+" by "+ patterns[i].replacement);
        targetValue=targetValue.replace(patterns[i].input, patterns[i].replacement);
        }
    aEvent.target.value = targetValue;
};

self.port.on("addListener", function(patterns) {
  console.log("dom loaded");
  
      // Add evt listener for HTML input fields of type 'text' or 'password'
       this.inputfields = document.getElementsByTagName("input");
       for(this.i = 0; this.i < this.inputfields.length; this.i++) {
         if((this.inputfields[this.i].type == 'password') || (this.inputfields[this.i].type == 'text')) {
         	console.log("add listener for:"+this.inputfields[this.i].id);
           this.inputfields[this.i].addEventListener('keyup', function(e) { onInputFocus(e, patterns); }, false);
         }  
       } // end of FOR loop

       // Add event listener for HTML 'textarea' elements
       this.inputfields = document.getElementsByTagName("textarea");
       for(this.i = 0; this.i < this.inputfields.length; this.i++) {      
         	console.log("add listener for:"+this.inputfields[this.i].id);
         this.inputfields[this.i].addEventListener('keyup', function(e) { onInputFocus(e, patterns); }, false);     
       } // end of FOR loop
});