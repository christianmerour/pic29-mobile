define(['jquery', 'underscore', 'backbone','model/book'], 
       function ($, _, Backbone,Book){ 
 
        var Books=Backbone.Collection.extend({
 
          // Book is the model of the collection 
          model:Book, 
 
          //fetch data from books.json using Ajax 
          //and then dispatch customized event 'fetchCompleted:Books' 
          fetch:function(categoryId){ 
            var self=this; 
            var tmpItem; 
            //fetch the data using ajax 
            var jqxhr = $.getJSON('data/category' + categoryId+'.json');
            jqxhr.success(function(data, status, xhr) { 
            	$.each(data, function(i, item){ 
            		 console.log(item);
	                 //create book for each item and then insert into the collection 
	                 tmpItem=new Book({id:item.id,category:categoryId,name:item.name}); 
	                 self.add(tmpItem); 
                 }); 
                  //dispatch customized event 
                  self.trigger('fetchCompleted:Books'); 
             });
            
            jqxhr.error(function(event, jqxhr, settings, exception) { 
            	console.log('jqxhr.error');
            	console.log(event);
            	console.log(jqxhr);
            	console.log(settings);
            	console.log(exception);
          	  alert('error');
        	  
            });
            
            jqxhr.complete(function() { 
                console.log('fetch complete + ' + this); 
            });
            
            /**
              .success(function(data, status, xhr) { 
                $.each(data, function(i,item){ 
           //create book for each item and then insert into the collection 
           tmpItem=new Book({id:item.id,category:categoryId,name:item.name}); 
                  self.add(tmpItem); 
                }); 
                //dispatch customized event 
                self.trigger('fetchCompleted:Books'); 
              })
               .error(function(data, status, xhr) { 
                   $.each(data, function(i,item){ 
                       //create book for each item and then insert into the collection 
                       tmpItem=new Book({id:item.id,category:categoryId,name:item.name}); 
                              self.add(tmpItem); 
                            }); 
                            //dispatch customized event 
                            self.trigger('fetchCompleted:Books'); 
                          })
                          */
              /*
              .error(function(e) { 
            	  alert('error');
            	  console.log(e);
              })
              
              .complete(function() { 
                    console.log('fetch complete + ' + this); 
              }); 
              */
          } 
  }); 
 
  return Books; 
});