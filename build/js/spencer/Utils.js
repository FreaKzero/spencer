/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global $, define, module */

define(function (require, exports, module) {
    function validateUrl(s) {
        var regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return regexp.test(s);
    }

    exports.validateUrl = validateUrl;

});
