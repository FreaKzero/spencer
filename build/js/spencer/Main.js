/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define */

define(function (require) {
    var utils = require('js/spencer/Utils.js'),
        selectors = require('js/data/selectors.js'),
        shiftmod = false;

    $(document).on("globalOpen", function () {
        var url = $(selectors.main.url).val();
        $(selectors.frames.refresh).children().addClass('uk-icon-spin');

        if (!utils.validateUrl(url)) {
            $(selectors.main.url).addClass('uk-form-danger');
            return false;
        }

        $(selectors.main.url).removeClass('uk-form-danger');
        //            $('.uk-icon-spin').removeClass('uk-icon-spin');

        $(selectors.frames.iframes).each(function () {
            var id = $(this).prop('id');

            if (id !== "") {
                $(this).spencerFrame('redirect', url);
            }
        });
    });

    $('#newWindow').on('click', function () {
        window.open($(selectors.main.url).val());
    });
    
    $(selectors.main.submit).on('click', function () {
        $(document).trigger('globalOpen');
    });
});
