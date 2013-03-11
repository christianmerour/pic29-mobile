define(['jquery', 'underscore', 'backbone', 'router'],function
($, _, Backbone, Router) { 
	'use strict';
	
	var router;
	
	var init=function(){
		 $(document).ready(function() { 
		        console.log('DOM IS READY');// Handler for .ready() called. 
		 });
		//create backbone router 
		this.router=new Router(); 
		Backbone.history.start(); 
	}; 
 
    return{ 
	    initialize:init 
    } 
});