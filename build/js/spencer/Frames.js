/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define, module */

define(function (require, exports, module) {
    var selectors = require('js/data/selectors.js');

    $(document).on('click', selectors.frames.refresh, function () {
        $(this).children().addClass('uk-icon-spin');

        var frame = $(this).parent().parent().parent(),
            id = frame.find('iframe').prop('id'),
            iframe = frame.find('iframe'),
            src = $(selectors.main.url).val();

        iframe.prop('src', src);

    });

    $(document).on('click', selectors.frames.close, function (event) {
        event.preventDefault();

        $(this).parent().parent().parent().fadeOut('slow', function () {
            $(this).remove()
        })
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
