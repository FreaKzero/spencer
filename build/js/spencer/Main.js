/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define, module */

define(function (require, exports) {
    var utils = require('js/spencer/Utils.js');

    function register(selectors) {
        $('#go').on('click', function () {
            var url = $('#url').val();

            if (!utils.validateUrl(url)) {
                $('#url').addClass('uk-form-danger');
                return false;
            }

            $('#url').removeClass('uk-form-danger');
            $('.uk-icon-spin').removeClass('uk-icon-spin');

            $('.frame iframe').each(function (i, obj) {
                var id = $(this).prop('id');
                if (id !== "") {
                    $(this).prop('src', url);
                }
            });
        });
    }


    exports.register = register;

});
