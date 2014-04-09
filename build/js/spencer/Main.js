/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define, module */

define(function (require, exports) {
    var utils = require('js/spencer/Utils.js');

    function register(selectors) {
        $('#newWindow').on('click', function() {            
            window.open($('#url').val());  
        });
        
        $('#go').on('click', function () {
            var url = $('#url').val();
            $('.refreshFrame').children().addClass('uk-icon-spin');
            
            if (!utils.validateUrl(url)) {
                $('#url').addClass('uk-form-danger');
                return false;
            }

            $('#url').removeClass('uk-form-danger');
//            $('.uk-icon-spin').removeClass('uk-icon-spin');

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