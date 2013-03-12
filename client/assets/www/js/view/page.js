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
	 
	  path:undefined,
	  
    //render the content into div of view 
    render: function(){ 
      console.debug("render page, path:" + this.path);
	  
      this.$el.append(this.pageHeaderTpl({path:this.path}));
     
      var content = this.pageContentTpl();
      content = $("<div data-role='content' data-theme='c'><div class='content-primary'>" + content + "</div></div>");
      this.$el.append(content);
      
      this.$el.append(this.pageFooterTpl());
      
      this.trigger('renderCompleted', this);
      
      //return to enable chained calls 
      return this; 
    },
    
    show : function(path) {
    	console.debug("show path:" + path);
    	var self = this;
    	self.path = path;
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