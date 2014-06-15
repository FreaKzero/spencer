/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global requirejs, require, define */

requirejs.config({
    paths: {
        'jquery': 'vendor/jquery-1.10.2.min',
        'jquery.uikit': 'jquery/uikit',
        'jquery.hotkeys': 'jquery/jquery.hotkeys',
        'jquery.spencerframe': 'jquery/jquery.spencerframe',
        'jquery.storage': 'jquery/jquery.storage',
        'jquery.growl': 'jquery/jquery.growl',

        'spencerMain': 'spencer/Main',
        'spencerFrames': 'spencer/Frames',
        'spencerDevices': 'spencer/DeviceLoader',
        'spencerErrors': 'spencer/ErrorMessenger',
        'spencerShortcuts': 'spencer/Shortcuts',
        'spencerSettings': 'spencer/Settings',
        'utils': 'spencer/Utils'

    },
    "shim": {
        'jquery.hotkeys': ['jquery'],
        'jquery.uikit': ['jquery'],
        'jquery.spencerframe': ['jquery'],
        'jquery.storage': ['jquery'],
        'jquery.growl': ['jquery']
    }
});

define(['jquery', 'jquery.hotkeys', 'jquery.uikit', 'jquery.spencerframe', 'jquery.storage', 'jquery.growl'], function($) {
    require(['spencerDevices', 'spencerFrames', 'spencerErrors', 'spencerMain', 'spencerShortcuts', 'spencerSettings'],
        function(spencerDevices, spencerFrames, spencerErrors, spencerMain) {
            
            $.UIkit.tooltip.defaults.delay = 600;
            $.UIkit.tooltip.defaults.animation = true;
        
            // Register the Errorchecker
            spencerErrors.register();

            // Kill the Preloader            
            setTimeout(function() {

                $("#loadermsg").animate({
                    opacity: 0,
                    top: "+=50",
                }, 666, function() {
                    $(this).remove();

                    $("#loader").animate({
                        height: "0",
                    }, 666, function() {
                        $(this).remove();
                    });
                });
            }, 100);
        });
});