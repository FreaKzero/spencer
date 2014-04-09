/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define, module */

/*
    uk-icon-mobile
    uk-icon-tablet
    uk-icon-laptop
    uk-icon-desktop
*/


define(function (require, exports, module) {

    var deviceFile = 'js/data/devices.json',
        utils = require('js/spencer/Utils.js');


    function buildOption(name, width, height, icon) {
        return '<li><a href="#" data-spencer-w="' + width + '" data-spencer-h="' + height + '"><i class="' + icon + '"></i> ' + name + '</a></li>';
    }

    function fill(elem) {
        $.getJSON(deviceFile, function (JSON) {
            $.each(JSON, function (key, obj) {
                $(elem).append(buildOption(key, obj.width, obj.height, obj.icon));
            });
        });
    }

    function registerEvents(selectors) {
        var devicelink = selectors.main.dropdown + " a",
            stencilIframe = selectors.main.stencil + " iframe";

        $(document).on('click', devicelink, function (event) {
            event.preventDefault();

            var HTMLID = 'frame_' + $(selectors.frames.frame).size(),
                width = $(this).data('spencer-w'),
                height = $(this).data('spencer-h'),
                nav = $(selectors.main.stencil).children(),
                url = $(selectors.main.url).val();

            nav.find(selectors.frames.width).val(width);
            nav.find(selectors.frames.height).val(height);

            var clone = $(selectors.main.stencil)
                .clone()
                .removeClass(selectors.main.stencil.substr(1))
                .css({
                    'height': height,
                    'width': width
                });

            clone.find('iframe')
                .prop('id', HTMLID)
                .bind('load', function () {
                    $(document).trigger("checkErrors", [HTMLID]);
                    $(this).parent('.frame').find('.uk-icon-spin').removeClass('uk-icon-spin');
                }).css({
                    'height': height,
                    'width': width
                });

            if (utils.validateUrl(url)) {
                clone.find('iframe').prop('src', url);
            } else {
                clone.find('iframe').prop('src', 'start.html');
            }


            clone.appendTo(selectors.main.container).hide().fadeIn("slow");
        });
    }

    function register(selectors) {
        fill(selectors.main.dropdown);
        registerEvents(selectors);
    }

    exports.register = register;

});
