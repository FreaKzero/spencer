/*jslint plusplus: true, vars: true, nomen: true, browser: true */
/*global requirejs, require, define */

// TODO http://stackoverflow.com/questions/11458403/firefox-like-inspecting-element

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
        'spencerCSS' : 'spencer/liveCSS',
        'easterEgg': 'spencer/EasterEgg'
    },

    shim: {
        'jquery.hotkeys': ['jquery'],
        'jquery.uikit': ['jquery'],
        'jquery.spencerframe': ['jquery'],
        'jquery.storage': ['jquery'],
        'jquery.growl': ['jquery']
    }
});

define(['jquery', 'jquery.hotkeys', 'jquery.uikit', 'jquery.spencerframe', 'jquery.storage', 'jquery.growl'], function($) {
    require(['spencerDevices', 'spencerFrames', 'spencerErrors', 'spencerMain', 'spencerShortcuts', 'spencerSettings', 'spencerCSS', 'easterEgg'],
        function(spencerDevices, spencerFrames, spencerErrors, spencerMain) {

            // I dont bother about IE users - not even for IE11 (no CSS Gradients in 2013 - rly ?)
            if (navigator.userAgent.match(/msie/i) || navigator.userAgent.match(/trident/i)) {
                $('#antiIE').slideDown();
                $('#antiIE > .close-antiie').on('click', function() {
                    var $self = $(this).parent();
                    $self.slideUp(function() {
                        $self.remove();
                    });
                });
            } else {
                $('#antiIE').remove();
            }

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