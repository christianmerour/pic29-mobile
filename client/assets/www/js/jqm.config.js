define(['jquery'], function($){ 
  'use strict'; 
  	$(document).bind('mobileinit', function () { 
  		
  		console.log("mobileinit");
  		
		$.mobile.ajaxEnabled = false; 
		$.mobile.linkBindingEnabled = false; 
		$.mobile.hashListeningEnabled = false; 
		$.mobile.pushStateEnabled = false;
		$.mobile.page.prototype.options.domCache = false;
		
		// Remove page from DOM when it's being replaced 
		/*
		$('div[data-role="page"]').on('pagehide', function (event, ui) { 
			$(event.currentTarget).remove(); 
		});
		*/
		/*
		var onDeviceReady = function () {
			console.log("onDeviceReady");
		    $(document).delegate('div[data-role="page"]', 'pagehide', function() {
		        console.log("pagehide");
		        $(event.currentTarget).remove(); 
		    });
		};
		
		$(document).bind('deviceready', onDeviceReady, false);
		*/
		
		
	}); 
});