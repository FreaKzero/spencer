/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define */

// TODO Make Tokenizer system
// TODO Rename Frames for Error Reporting

define(function(require) {
    var utils = require('js/spencer/Utils.js'),
        selectors = require('js/data/selectors.js'),        
        storage = $.localStorage,        
        TOKEN;        

    $(document).on("checkErrors", function(event, frameID) {        
        var host = utils.hostFromUrl($(selectors.main.url).val()),
            $frame = $('#' + frameID);            
        
        	TOKEN = utils.genToken();
        
        if (host !== null) {
            var frameWidth = $frame.width(),
                ifr = document.getElementById(frameID).contentWindow;

            $frame.parent('.frame').removeClass('frameerror');
            
            ifr.postMessage(JSON.stringify({
                source: 'SPENCER',
                viewPort: frameWidth,
                frameID: frameID,
                action: 'initCheck',
                token: TOKEN
            }), host);

            setTimeout(function() {
                if (scriptAvailable) {
                    scriptAvailable = false;                    
                } else {
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

        if (message.token === TOKEN) {
            scriptAvailable = true;

            $('#url').val(message.currentLocation);

            if (message.errorCount > 0) {
                $frame.addClass('frameerror');

                $.growl.error({
                    title: 'Found Viewport Errors',
                    message: message.errorCount + ' Errors Found on ' + message.frameID
                });
            } else {
                $frame.removeClass('frameerror');

                $.growl.success({
                    title: 'No Viewport Errors',
                    message: 'Good Job :)'
                });
            }
        }        
    }

    window.addEventListener('message', receiveErrors);
});