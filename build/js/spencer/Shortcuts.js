/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define */

define(function (require) {
    var selectors = require('js/data/selectors.js');
    
    $(selectors.main.url).on('keyup', null, 'return', function(){
      $(document).trigger('globalOpen');        
    });   
    
    $(selectors.main.url).on('keyup', null, 'shift+return', function(){
      window.open($(selectors.main.url).val());
    }); 
});
