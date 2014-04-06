/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define, module */

define(function (require, exports, module) {


    function writeSpencerLink() {

        var url = window.location + "",
            src = url.substring(0, url.lastIndexOf('/')) + "/spencer.js";

        $('#spencerjsLink').val('<script type="text/javascript" src="' + src + '"></script>');

    }

    function register(selectors) {
        writeSpencerLink();

        $(document).on("checkErrors", function (event, frameID) {
            var host = hostFromUrl($(selectors.main.url).val());

            if (host !== null) {
                var frameWidth = $('#' + frameID).width(),
                    ifr = document.getElementById(frameID).contentWindow;

                ifr.postMessage('SPENCER;' + frameWidth + ';' + frameID, host);
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