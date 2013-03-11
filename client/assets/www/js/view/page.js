define(['jquery', 'underscore', 'backbone', 
        'text!view/pageHeader.html',
        'text!view/pageFooter.html'
        ], 
function($, _, Backbone, pageHeaderHtml, pageFooterHtml){ 
 
  var PageView = Backbone.View.extend({ 
 
    //initialize template 
	  pageHeaderTpl:_.template(pageHeaderHtml), 
	  pageFooterTpl:_.template(pageFooterHtml), 
	  pageContentTpl:undefined, 
	  
    //render the content into div of view 
    render: function(){ 
      console.debug("render page");
	  
      this.$el.append(this.pageHeaderTpl()); 
      this.$el.append(this.pageContentTpl()); 
      this.$el.append(this.pageFooterTpl());
      
      this.trigger('renderCompleted', this);
      
      //return to enable chained calls 
      return this; 
    },
    
    show : function(path) {
    	console.debug("show path:" + path);
    	var self = this;
    	var path = 'page/' + path;
    	var textPath = 'text!' + path;
    	console.debug('show textPath:' + textPath);
    	
    	//Attention l'appel est asynchrone
    	require(['underscore', textPath], function(_, textContent) {
    		console.debug('textContent:' + textContent);
    	    self.pageContentTpl=_.template(textContent);
    	    self.render();
        });

    	return this;
    }
   
  }); 
  
  return PageView; 
});