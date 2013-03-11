define(['jquery', 
        'underscore', 
        'backbone'
        ], 
	function($, _, Backbone,
			HomeView,BookListView,
			BookCollection) { 
 
    'use strict'; 
    var Router = Backbone.Router.extend({ 
    //define routes and mapping route to the function
    	init:true, 
    	
        routes: {
        	'page/*path' : 'showPage',
        	
        	':viewName/:action/*path' : 'showView',
        	':viewName/:action' :       'showView',
        	':viewName' :               'showView',
        	'':                         'showView',           //home view

            '*actions': 'defaultAction' //default action
        },
        
        defaultAction: function(actions) { 
	    	this.showView(); 
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
    			
        		view.bind('renderCompleted', self.changePage, self);
        		method.apply(view, actionArguments);
        		
        	})
	    }, 
        
	    showPage: function(path) {
	    	//TODO
	    },
	    
        changePage:function (view) { 
        	//add the attribute 'data-role=”page” ' for each view's div
        	var oldPage=$('div[data-role="page"]');
        	var newPage=view.$el;
        	newPage.attr('data-role', 'page'); 
        	$('body').append(newPage);
        	
            if(!this.init){   
               $.mobile.changePage(newPage, {transition: 'slideup'});
            }else{
            	this.init = false;
            	$('body').append('<div data-role="page"></div>');
            	this.defaultAction();
            }            
    	}       
    });
 
    return Router; 
});