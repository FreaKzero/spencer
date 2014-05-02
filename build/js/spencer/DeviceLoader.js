/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define */

/*
    uk-icon-mobile
    uk-icon-tablet
    uk-icon-laptop
    uk-icon-desktop
*/


define(function (require) {

    var devices = require('js/data/devices.js'),
        selectors = require('js/data/selectors.js');

    $.each(devices, function (key, obj) {
        $(selectors.main.dropdown).append(buildOption(key, obj.width, obj.height, obj.icon));
    });


    function buildOption(name, width, height, icon) {
        return '<li><a href="#" data-spencer-w="' + width + '" data-spencer-h="' + height + '"><i class="' + icon + '"></i> ' + name + '</a></li>';
    }
});