/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global requirejs, require */

requirejs.config({
    paths: {
        'jquery': 'vendor/jquery-1.10.2.min',        
        'uikit': 'uikit',
        'hotkeys': 'jquery.hotkeys',        
        'jqUtils': 'spencer/Ext',
        'spencerMain': 'spencer/Main',
        'spencerFrames': 'spencer/Frames',
        'spencerDevices': 'spencer/DeviceLoader',
        'spencerErrors': 'spencer/ErrorMessenger',
        'utils': 'spencer/Utils'
    }, shim: {
        'uikit': ['jquery'],
        'hotkeys' : ['jquery']        
    }
});

define(['jquery'], function ($) {
    require(['spencerDevices', 'spencerFrames', 'spencerErrors', 'spencerMain', 'jqUtils', 'uikit', 'hotkeys'],
        function (spencerDevices, spencerFrames, spencerErrors, spencerMain, ext) {

            var url = window.location + "",
                src = url.substring(0, url.lastIndexOf('/')) + "/spencer.js";

            $('#spencerjsLink').val('<script type="text/javascript" src="' + src + '"></script>');

            // Register the Errorchecker
            spencerErrors.register();
                                                            
            // Kill the Preloader
            setTimeout(function () {
                $('#loader').fadeOut('slow', function() {
                    $(this).remove();
                })                
	        }, 600);
        });
});
