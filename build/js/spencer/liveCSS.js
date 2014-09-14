define(function(require) {
    var utils = require('js/lib/Utils.js'),
        selectors = require('js/config/selectors.js'),
        Settings = require('js/lib/SettingsManager.js'),
        Dialog = require('js/spencer/Dialog.js');
    
    $('#autorefresh input').on('change', function() {

        var $iframes = $('.frame:not(.stencil) > iframe');

        if ($iframes.size() > 0) {

            if ($(this).is(':checked')) {

                $('.frame:not(.stencil) > iframe').each(function() {
                    var frameID = $(this).prop("id"),
                        host = utils.hostFromUrl($(selectors.main.url).val()),
                        ifr = document.getElementById(frameID).contentWindow;

                    ifr.postMessage(JSON.stringify({
                        source: 'SPENCER',
                        action: 'livePreview',
                        csspoll: Settings.get('csspoll')
                    }), host);
                });

            } else {

                $('.frame:not(.stencil) > iframe').each(function() {
                    var src = $(selectors.main.url).val();
                    $(this).prop('src', src);
                });
            }
        
        // No Frames
        } else {
            $(this).prop('checked', false);
            Dialog.info({
                title: 'Sorry',
                message: 'There are no Frames available for Live-CSS'
            });
            //alert("No open Devices for CSS Live Refresh")
        }

    });

});