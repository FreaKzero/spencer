/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define */

define(function (require) {
    var selectors = require('js/data/selectors.js'),
        utils = require('js/spencer/Utils.js');

    var devicelink = selectors.main.dropdown + " a";

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

    $(document).on('click', selectors.frames.refresh, function () {
        $(this).children().addClass('uk-icon-spin');

        var frame = $(this).parent().parent().parent(),
            iframe = frame.find('iframe'),
            src = $(selectors.main.url).val();

        iframe.prop('src', src);

    });

    $(document).on('click', selectors.frames.close, function (event) {
        event.preventDefault();

        $(this).parent().parent().parent().fadeOut('slow', function () {
            $(this).remove();
        });
    });

    $(document).on('resizeFrame', function (event, elem, rotate) {
        var settings = elem.parent().parent('.uk-form'),
            width = settings.find(selectors.frames.width).val(),
            height = settings.find(selectors.frames.height).val(),
            frame = elem.parent().parent().parent().parent(),
            iframe = frame.find('iframe');

        if (rotate) {
            var oh = height;
            height = width;
            width = oh;

            settings.find(selectors.frames.height).val(height);
            settings.find(selectors.frames.width).val(width);
        }

        frame.animate({
            'height': height,
            'width': width
        }, 500, function () {
            iframe.css({
                'height': height,
                'width': width
            });
        });

    });

    $(document).on('click', selectors.frames.resize, function () {
        $(document).trigger('resizeFrame', [$(this), false]);
    });

    $(document).on('click', selectors.frames.rotate, function () {
        $(document).trigger('resizeFrame', [$(this), true]);
    });



});
