/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define */

define(function(require) {
    var selectors = require('js/config/selectors.js');

    $('input#url').bind('keyup', 'return', function() {
        $(document).trigger('globalOpen');
    });

    $(document).bind('keyup', 'return', function() {
        $('#url').focus();
    });
});