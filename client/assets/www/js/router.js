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
        	'back'       : 'goBack',
        	':viewName/:action/*path' : 'showView',
        	':viewName/:action' :       'showView',
        	':viewName' :               'showView',
        	'':                         'showView'
        },
	     
        onBackButton :function(e) {
     	    e.preventDefault();
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
	    	console.debug('showPage path:' + path);
	    	var self=this;
	    	
	    	require(['view/page'], function (ViewClass) {
        		var view = new ViewClass();
        		var method = view['show'];
        		var actionArguments = [path];
        		
    			view.once('renderCompleted', self.changePage, self);
    			method.apply(view, actionArguments);
    		})
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
        	    document.addEventListener("backbutton", this.onBackButton, false);
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
            
            $('[href="#back"]').on('click', function (e) {
    	    	   console.log("click->back");
    	    	   self.reverse = true;
    	    	   e.preventDefault();
    	    	   $.mobile.back();
    	    });
            
            $('.ui-btn').on('click', function (e) {
               $(this).addClass('ui-btn-active');
            });
            
        }
     });
 
    return Router; 
});