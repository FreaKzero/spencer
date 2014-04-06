/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define, module */

define(function (require, exports, module) {
    
    function register(selectors) {
        $(document).on("checkErrors", function (event, frameID) {
            var host = hostFromUrl($(selectors.main.url).val());
            if (host !== null) {
                var ifr = document.getElementById(frameID).contentWindow;
                ifr.postMessage('SPENCER;' + frameID, host);
            }
        });
    }

    function hostFromUrl(url) {
        var matches = url.match(/^(https?\:\/\/([^\/?#]+)(?:[\/?#]|$))/i);
        return matches && matches[1];
    }
    
    function getBounds(e) {
        var d = e.data.split(';'),
            frame = $('#' + d[1]).parent('.frame'),
            deviceWidth = frame.width();

        $('#url').val(d[2]);

        if (d[0] > deviceWidth) {
            frame.addClass('frameerror');
        } else {
            frame.removeClass('frameerror');
        }

        $('.uk-icon-spin').removeClass('uk-icon-spin');

    }

    window.addEventListener('message', getBounds);

    exports.register = register;
});