define(['jquery', 
        'underscore', 
        'backbone'
        ], 
	function($, _, Backbone) { 
 
    'use strict'; 
    var Router = Backbone.Router.extend({ 
    //define routes and mapping route to the function
    	init:true, 
    	reverse:false,
    	transition:'slide',
        routes: {
        	'page/*path' : 'showPage',
        	
        	':viewName/:action/*path' : 'showView',
        	':viewName/:action' :       'showView',
        	':viewName' :               'showView',
        	'':                         'showView'
        },
	    
        showView: function(viewName, action, path) {
        	
        	console.debug('showView');
        	console.debug(arguments);

        	if (typeof viewName === "undefined" || viewName === null ) {
        		viewName = 'home';
        	}
        	if (typeof action === "undefined" || action === null ) {
    			action = 'render';
    		}
        	var self=this;
        	require(['view/' + viewName], function (ViewClass) {
        		var view = new ViewClass();
        		var method = view[action];
        		var actionArguments = [];
        		
    			if (typeof path !== "undefined" && path !== null ) {
            		actionArguments = path.split('/'); 
        		}
    			
        		view.once('renderCompleted', self.changePage, self);
        		method.apply(view, actionArguments);
        	})
	    }, 
        
	    showPage: function(path) {
	    	console.debug('showPage');
	    	//TODO
	    },
  
        changePage:function (view) {
        	
        	console.debug('changePage');
        	//add the attribute 'data-role=”page” ' for each view's div
        	var self = this;
        	var oldPage=$('div[data-role="page"]');
        	var newPage=view.$el;
        	newPage.attr('data-role', 'page'); 
        	$('body').append(newPage);
        	
        	if(this.init) {
        		console.debug('init');
        	    this.init = false;
        	    this.onDeviceReady();
        	}
           
        	//change page an init vars
            var options = {transition:self.transition, reverse:self.reverse};
        	console.debug('changePage');
        	console.debug(options);
        	$.mobile.changePage(newPage, options);
            self.reverse = false;
            //self.transition = 'slide';
            
            //button reverse direction management
            newPage.find('[data-direction]').on('click', function (event) {
            	var $this=$(this);
        		var direction = $this.attr('data-direction');
        		if (direction == 'reverse') {
        			self.reverse = true;
        		}
        	});
            
            //button transition management
            newPage.find('[data-transition]').on('click', function (event) {
            	var $this=$(this);
        		var transition = $this.attr('data-transition');
        		self.transition = transition;
        	});
            
            //remove old page
            $('div[data-role="page"]').on('pagehide', function (event, ui) {
   	    	   console.log("pagehide->remove");
   			   $(event.currentTarget).remove(); 
   		    });
        },
        
        
       onBackButton :function(e) {
    		console.debug('onBackButton');
            if($.mobile.activePage.is('#home')){
                e.preventDefault();
                navigator.app.exitApp();
            } else {
            	e.preventDefault();
            	console.debug('AVANT this.router.reverse = true');
            	this.reverse = true;
            	console.debug('this.router.reverse = true');
            	navigator.app.backHistory();
            }
    	},
    	
    	onDeviceReady:function () {
    		console.debug('onDeviceReady');
    		document.addEventListener("backbutton", this.onBackButton, false);
    	}
        
    });
 
    return Router; 
});