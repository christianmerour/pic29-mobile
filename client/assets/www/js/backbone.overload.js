
define(['backbone', 'underscore'],function (Backbone, _) { 

     // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
	History.prototype.checkUrl =  function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
	  
	  var self=this;
	  setTimeout(function() {
		if (self.iframe) self.navigate(current);
	    self.loadUrl() || self.loadUrl(self.getHash());
	  }, 0);
	};

});