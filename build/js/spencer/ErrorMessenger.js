/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define */

define(function (require, exports) {
    var utils = require('js/spencer/Utils.js'),
        selectors = require('js/data/selectors.js');

    function register() {
        $(document).on("checkErrors", function (event, frameID) {
            var host = utils.hostFromUrl($(selectors.main.url).val());

            if (host !== null) {
                var frameWidth = $('#' + frameID).width(),
                    ifr = document.getElementById(frameID).contentWindow;

                $('#' + frameID).parent('.frame').removeClass('frameerror');
                ifr.postMessage('SPENCER|' + frameWidth + '|' + frameID, host);
            }
        });
    }
// TODO Confusing Function Name
    function getBounds(e) {
        var d = e.data.split('|'),
            frame = $('#' + d[1]).parent('.frame'),
            deviceWidth = frame.width();

        $('#url').val(d[2]);

        if (d[0] > deviceWidth) {
            frame.addClass('frameerror');
            $.growl.error({
                message : 'Found CSS Bounding Errors'
            });
        }
    }

    window.addEventListener('message', getBounds);

    exports.register = register;
});
