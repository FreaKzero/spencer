/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define */

define(function(require) {
    var utils = require('js/spencer/Utils.js'),
        selectors = require('js/data/selectors.js'),
        qrcode = require('js/vendor/qrcode.js');

    qrcode.init(document.getElementById('qrcode'), $(selectors.main.url).val());

    $(document).on("globalOpen", function() {
        var url = $(selectors.main.url).val();

        $(selectors.frames.refresh).children().addClass('uk-icon-spin');

        if (!utils.validateUrl(url)) {
            $(selectors.main.url).addClass('uk-form-danger');
            return false;
        }
                
        qrcode.makeQR(url);
        $(selectors.main.url).removeClass('uk-form-danger');        

        $(selectors.frames.iframes).each(function() {
            var id = $(this).prop('id');

            if (id !== "") {
                $(this).spencerFrame('redirect', url);
            }
        });
        
        $(selectors.main.url).blur();
    });
    
    $(selectors.main.submit).on('click', function() {
        $(document).trigger('globalOpen');
    });
});
