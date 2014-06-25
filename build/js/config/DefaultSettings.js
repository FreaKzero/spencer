/**
* Created with spencer.
* User: FreaKzero
* Date: 2014-06-25
* Time: 06:48 AM
* To change this template use Tools | Templates.
*/
define(function() {
    var utils = require('js/lib/Utils.js'),
        settings = {                        
            home: utils.hostFromUrl(window.location + ""),
            growl: 3200,
            scriptcheck: 1000,
            notifysuccess : true
        };
    
    return settings;
});