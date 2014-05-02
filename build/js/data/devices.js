/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global define */

define(function () {
    var devices = {
        "iPhone": {
            "height": 480,
            "width": 320,
            "icon": "uk-icon-mobile"
        },
        "iPhone 4": {
            "height": 960,
            "width": 640,
            "icon": "uk-icon-mobile"
        },

        "iPhone 5": {
            "height": 1136,
            "width": 640,
            "icon": "uk-icon-mobile"
        },


        "iPad": {
            "height": 990,
            "width": 768,
            "icon": "uk-icon-tablet"
        }
    };

    return devices;

});