define(['jquery', 'underscore', 'backbone', 'router'],function
($, _, Backbone, Router) { 
	'use strict';
	
	var router;
	
	var onBackButton = function () {
		console.debug('onBackButton');
        if($.mobile.activePage.is('#home')){
            e.preventDefault();
            //navigator.app.exitApp();
        } else {
        	console.debug('AVANT this.router.reverse = true');
        	this.router.reverse = true;
        	console.debug('this.router.reverse = true');
        	navigator.app.backHistory();
        }
	};
	
	var onDeviceReady = function () {
		console.debug('onDeviceReady');
		document.addEventListener("backbutton", this.onBackButton, false);
	};
	
	var init=function(){
		
		//create backbone router 
		this.router=new Router(); 
		Backbone.history.start(); 
		
		document.addEventListener("deviceready", this.onDeviceReady, false);

	}; 
	
    return{ 
	    initialize:init 
    } 
});