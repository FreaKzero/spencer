/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global define */

define(function (require, exports) {
    
    function _rand() {
		return Math.random().toString(36).substr(2);
	};
    
    function genToken() {
    	return _rand() + _rand();
	};
    
    function validateUrl(s) {
        var regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return regexp.test(s);
    }

    function hostFromUrl(url) {
        var matches = url.match(/^(https?\:\/\/([^\/?#]+)(?:[\/?#]|$))/i);
        return matches && matches[1];
    }

    exports.validateUrl = validateUrl;
    exports.hostFromUrl = hostFromUrl;
    exports.genToken = genToken;

});
