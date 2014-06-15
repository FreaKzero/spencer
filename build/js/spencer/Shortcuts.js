/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define */

define(function(require) {
    var selectors = require('js/data/selectors.js');

    $(document).bind('keyup', 'ctrl+shift+r', function() {
        $(document).trigger('globalOpen');
    });
    
    $('input#url').bind('keyup', 'return', function() {
        $(document).trigger('globalOpen');
    });
    
    $(document).bind('keyup', 'return', function() {
        $('#url').focus();
    });
});
