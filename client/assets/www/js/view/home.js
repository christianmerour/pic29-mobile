define(['jquery', 'underscore', 'backbone',
'text!view/home.html'], 
function($, _, Backbone, templateHtml){ 
 
  var HomeView = Backbone.View.extend({ 
 
    //initialize template 
    template:_.template(templateHtml), 
 
    //render the content into div of view 
    render: function(){ 
	  //this.el is the root element of Backbone.View. By default, it is a div.    
      //$el is cached jQuery object for the view's element. 
      //append the compiled template into view div container 
      this.$el.append(this.template()); 
      this.trigger('renderCompleted',this);
      //return to enable chained calls 
      return this; 
    },
    
    test1 : function(para1) {
    	console.debug("test1 para1:" + para1);
    	this.render();
    	return this;
    },
    test2 : function() {
    	console.debug("test2");
    	this.render();
    	return this;
    }
    
  }); 
  return HomeView; 
});