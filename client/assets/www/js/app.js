define(['jquery', 'underscore', 'backbone', 'router'],function
($, _, Backbone, Router) { 
	'use strict';
	
	var router;
	
	var init=function(){
		
		//create backbone router 
		this.router=new Router(); 
		Backbone.history.start(); 
	}; 
 
    return{ 
	    initialize:init 
    } 
});