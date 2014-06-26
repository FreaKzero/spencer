/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, browser: true */
/*global define, $ */

define(function(require) {
    var utils = require('js/lib/Utils.js'),
        settings = {
            home: utils.hostFromUrl(window.location + ""),
            growl: 3200,
            scriptcheck: 1000,
            notifysuccess: true
        };

    return settings;
});
