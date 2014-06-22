/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define */

// TODO Make Tokenizer system
// TODO fucking use Selectors.js
// TODO "Hai Script, are you there ?"


define(function(require) {
    var utils = require('js/spencer/Utils.js'),
        selectors = require('js/data/selectors.js'),        
        scriptAvailable = false,
        storage = $.localStorage;        

    $(document).on("checkErrors", function(event, frameID) {
        var host = utils.hostFromUrl($(selectors.main.url).val()),
            $frame = $('#' + frameID);

        if (host !== null) {
            var frameWidth = $frame.width(),
                ifr = document.getElementById(frameID).contentWindow;

            $frame.parent('.frame').removeClass('frameerror');

            var data = JSON.stringify({
                source: 'SPENCER',
                viewPort: frameWidth,
                frameID: frameID,
                action: 'initCheck'
            });

            ifr.postMessage(data, host);

            setTimeout(function() {
                if (scriptAvailable === false) {
                    $.growl.warning({
                        title: 'Cant find spencer.js on Testsite',
                        message: 'Debugging/Error Reporting not available'
                    });
                }
            }, storage.get('settings.scriptCheck'));
        } else {
            $.growl.warning({
                title: 'Host Error',
                message: 'Cant extract Hostname from URI'
            });
        }
    });

    $(document).on('errorReCheck', function(event, frameID) {
        var ifr = document.getElementById(frameID).contentWindow,
            host = utils.hostFromUrl($(selectors.main.url).val());

        if (host !== null) {
            ifr.postMessage(JSON.stringify({
                source: 'SPENCER',
                action: 'reCheck'
            }), host);
        }
    });

    function receiveErrors(e) {
        var message = JSON.parse(e.data),
            $frame = $('#' + message.frameID).parent('.frame');

        scriptAvailable = true;

        $('#url').val(message.currentLocation);

        if (message.errorCount > 0) {
            $frame.addClass('frameerror');

            $.growl.error({
                title: 'Found CSS Bounding Errors',
                message: message.errorCount + ' Errors Found on ' + message.frameID
            });
        }
    }

    window.addEventListener('message', receiveErrors);
});