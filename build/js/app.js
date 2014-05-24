/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global requirejs, require */

requirejs.config({
    paths: {
        'jquery': 'vendor/jquery-1.10.2.min',        
        'uikit': 'uikit',
        'jquery.hotkeys': 'jquery.hotkeys',
        'jqUtils': 'spencer/Ext',
        'spencerMain': 'spencer/Main',
        'spencerFrames': 'spencer/Frames',
        'spencerDevices': 'spencer/DeviceLoader',
        'spencerErrors': 'spencer/ErrorMessenger',
        'spencerShortcuts': 'spencer/Shortcuts',
        'utils': 'spencer/Utils'
    }, shim: {
        'uikit': ['jquery'],
        'jquery.hotkeys' : ['jquery']
    }
});

define(['jquery'], function ($) {
    require(['spencerDevices', 'spencerFrames', 'spencerErrors', 'spencerMain',  'jqUtils', 'spencerShortcuts', 'uikit', 'jquery.hotkeys'],
        function (spencerDevices, spencerFrames, spencerErrors, spencerMain, ext) {

            var url = window.location + "",
                src = url.substring(0, url.lastIndexOf('/')) + "/spencer.js";

            $('#url').focus();
            $('#spencerjsLink').val('<script type="text/javascript" src="' + src + '"></script>');

            // Register the Errorchecker
            spencerErrors.register();
                                                            
            // Kill the Preloader
            setTimeout(function () {                 
                $('#loader').addClass('loaded');                                                                                                      
	        }, 666);
        });
});
