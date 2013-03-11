define(['jquery'], function($){ 
  'use strict'; 
  
  console.log("jqm.config");
  $(document).ready(function() { 
	     console.log('DOM IS READY');// Handler for .ready() called.
	     $('body').append('<div data-role="page"></div>');
  });
  
   $(document).bind('mobileinit', function () { 
  		
  		console.log("mobileinit");
  		
		$.mobile.ajaxEnabled = false; 
		$.mobile.linkBindingEnabled = false; 
		$.mobile.hashListeningEnabled = false; 
		$.mobile.pushStateEnabled = false;
		$.mobile.page.prototype.options.domCache = false;
		
	}); 
});