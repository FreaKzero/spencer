/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define */

/*
    uk-icon-mobile
    uk-icon-tablet
    uk-icon-laptop
    uk-icon-desktop
*/

define(function(require) {

    var devices = require('js/config/devices.js'),
        selectors = require('js/config/selectors.js');

    $.each(devices, function(key, obj) {
        $(selectors.main.dropdown).append(buildOption(key, obj.width, obj.height, obj.icon, obj.shortcut));

        $(document).bind('keyup', 'CTRL+' + obj.shortcut, function(e) {
            e.preventDefault();
            $(document).trigger('spawnFrame', [obj.width, obj.height]);
        });

        $(document).bind('keyup', 'ALT+' + obj.shortcut, function(e) {
            e.preventDefault();
            $(document).trigger('spawnFrame', [obj.height, obj.width]);
        });
    });


    function buildOption(name, width, height, icon, shortcut) {
        return '<li><a href="#" data-spencer-w="' + width + '" data-spencer-h="' + height + '"><i class="' + icon + '"></i> ' + name + '<br /><span class="meta">[CTRL/ALT]+' + shortcut.toUpperCase() + '</span></a></li>';
    }
});