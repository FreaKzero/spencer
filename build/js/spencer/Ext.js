/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define, module */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {

    var methods = {
        refresh: function () {
            $(this).prop('src', $(this).prop('src'));
        },

        redirect: function (url) {
            $(this).prop('src', url);
        },

        fakeUserAgent: function(url) {
            var url = url + "?spencerUA=" + $(this).data('spencer-ua');
            $(this).prop('src', url);
        }
    };

    $.fn.spencerFrame = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.refresh.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' dont exist');
        }

    }
}));
