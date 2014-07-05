/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, browser: true */
/*global define, $ */

define(function(require) {
    var utils = require('js/lib/Utils.js'),
        settings = {
            home: utils.hostFromUrl(window.location + ""),
            growl: 3000,
            scriptcheck: 2500,
            notifysuccess: true,
            notifynoscript: true
        };

    return settings;
});