require.config({ 
    //path mappings for module names not found directly under baseUrl 
    paths: { 
        jquery:  'vendor/jquery-1.9.1', 
        jqm:     'vendor/jquery.mobile-1.3.0', 
        underscore: 'vendor/underscore', 
        backbone:   'vendor/backbone', 
        text:       'vendor/require.text',
        cs  :       'vendor/require.cs',
        coffeescript: 'vendor/coffee-script', 
        
        view:       'view', 
        model:      'model' 
    },

    
	shim: {
		'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery']
		}
	}
	
    
}); 
 
//1. load app.js, 
//2. configure jquery mobile to prevent default JQM ajax navigation 
//3. bootstrapping application 
require(['jquery', 'jquery.overload', 'app','jqm.config'], function($, $overload, app) { 
    $(document).ready(function() { 
      console.log('DOM IS READY');// Handler for .ready() called. 
    });    
    app.initialize(); 
});