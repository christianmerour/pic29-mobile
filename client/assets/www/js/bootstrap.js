require.config({ 
    //path mappings for module names not found directly under baseUrl 
    paths: { 
        jquery:  'vendor/jquery-1.9.1', 
        jqm:     'vendor/jquery.mobile-1.3.0', 
        underscore: 'vendor/underscore', 
        backbone:   'vendor/backbone', 
        text:       'vendor/require.text',
        cs  :       'vendor/require.cs',
        coffeescript: 'vendor/coffee-script', 
        
        view:       'view', 
        model:      'model'
    }
});

require(['jquery', 'jquery.overload', 'jqm.config', 'jqm', 'app'], function(js1, js2, js3, js4, app) { 
    app.initialize(); 
});