define(function(require) {
    var utils = require('js/lib/Utils.js'),
        selectors = require('js/config/selectors.js'),
        Settings = require('js/lib/SettingsManager.js'),
        Dialog = require('js/spencer/Dialog.js');

    $('#autorefresh input').on('change', function() {

        var $iframes = $('.frame:not(.stencil) > iframe');

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


    });

});