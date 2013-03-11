define(['jquery', 'underscore', 'backbone', 
'model/bookCollection',
'text!view/books.html'], 
       function ($, _, Backbone, BookCollection, bookViewTemplate) { 
  'use strict'; 
 
  var BookListView = Backbone.View.extend({ 
 
    template: _.template(bookViewTemplate), 
    collection: new BookCollection(),
 
    render: function(){ 
      this.$el.empty(); 
      //compile template using the data fetched by collection 
      this.$el.append(this.template({data:this.collection.toJSON()})); 
      this.trigger('renderCompleted',this); 
      return this; 
    },
    
    show : function(categoryId){ 
        this.collection.once('fetchCompleted:Books', this.render, this); 
        this.collection.fetch(categoryId); 
        return this;
    }
  }); 
 
  return BookListView; 
});