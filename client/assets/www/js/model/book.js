define(['jquery', 'underscore', 'backbone'], 
	function ($, _, Backbone){ 

	var Book=Backbone.Model.extend({ 
    //default attributes 
		defaults:{ 
			id:'', 
			name:'', 
			category:'' 
		} 
	}); 
 
	return Book; 
});