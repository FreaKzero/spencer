/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define */

// TODO Rename Frames for Error Reporting
// TODO scriptAvailable false Glitch with multiple frames
// TODO actual a Tokenerror

define(function(require) {
    var utils = require('js/lib/Utils.js'),
        selectors = require('js/config/selectors.js'),
        Settings = require('js/lib/SettingsManager.js'),
        scriptAvailable = false;
    
    $(selectors.main.liveCSS).hide();

    function noScript() {
        $(selectors.main.liveCSS).hide();

        $.growl.warning({
            title: 'Cant find spencer.js on Testsite',
            message: 'Debugging/Error Reporting not available'
        });
    }

    function onSuccess(frame) {
        frame.removeClass('frameerror');
        $(selectors.main.liveCSS).show();

        if (Settings.get('notifysuccess')) {
            $.growl.success({
                title: 'No Viewport Errors',
                message: 'Good Job :)'
            });
        }
    }

    function onError(frame, count, frameID) {
        frame.addClass('frameerror');        
        $(selectors.main.liveCSS).show();

        $.growl.error({
            title: 'Found Viewport Errors',
            message: count + ' Errors Found on ' + frameID
        });
    }

    $(document).on("checkErrors", function(event, frameID) {
        var host = utils.hostFromUrl($(selectors.main.url).val()),
            $frame = $('#' + frameID);

        scriptAvailable = false;

        if (host !== null) {
            var frameWidth = $frame.width(),
                ifr = document.getElementById(frameID).contentWindow;

            $frame.parent('.frame').removeClass('frameerror');

            ifr.postMessage(JSON.stringify({
                source: 'SPENCER',
                viewPort: frameWidth,
                frameID: frameID,
                action: 'initCheck'
            }), host);

            if (Settings.get('notifynoscript')) {
                setTimeout(function() {
                    if (!scriptAvailable) {
                        noScript();
                    }
                }, Settings.get('scriptcheck'));
            }

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
            onError($frame, message.errorCount, message.frameID);            

        } else {            
            onSuccess($frame);
        }
    }
    window.addEventListener('message', receiveErrors);
});