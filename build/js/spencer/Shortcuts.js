/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define */

define(function(require) {
    var selectors = require('js/data/selectors.js');

    $(document).bind('keydown', 'ctrl+shift+return', function(e) {
        $(document).trigger('globalOpen');
    });
    
    $(document).bind('keydown', 'alt+ctrl+return', function(e) {
        window.open($(selectors.main.url).val());
    });
    

});
