define(['jquery', 
        'underscore', 
        'backbone',
            
        'view/home',
        'view/books',
            
        'model/bookCollection', 
        'jqm'], 
	function($, _, Backbone,
			HomeView,BookListView,
			BookCollection) { 
 
    'use strict'; 
    var Router = Backbone.Router.extend({ 
    //define routes and mapping route to the function
    	init:true, 
    	
        routes: { 
        	'':    'showHome',           //home view 
        	'home': 'showHome',         //home view as well 
            'list/:categoryId' : 'showBooks', 
            '*actions': 'defaultAction' //default action
        },
        
	    defaultAction: function(actions) { 
	    	this.showHome(); 
	    }, 
 
	    showHome:function(actions){ 
	    	// will render home view and navigate to homeView 
	    	var homeView=new HomeView(); 
	    	homeView.render(); 
	    	this.changePage(homeView); 
	    }, 
        
        showBooks:function(categoryId){ 
            //create a collection 
            var bookList=new BookCollection(); 
            //create book list view and pass bookList as the collection 
            var bookListView=new BookListView({collection:bookList}); 
            //need to pass this as context 
            bookListView.bind('renderCompleted:Books',this.changePage,this); 
            //update view 
            bookListView.update(categoryId); 
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
            	this.showHome();
            }            
    	}       
    });
 
    return Router; 
});